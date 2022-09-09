import { Worker } from "bullmq"
import { range } from "lodash"
import { integratedFunctions } from "../../server/utils/executeFunction"
import { env } from "../utils/configure"
import { connectToRedisBullmq } from "../../utils/redis"
import { Logger } from "tslog"
import { z } from "zod"
import { getQueue, QueueTypeInput } from "./queues"

export interface ExecutionCall {
  looped: boolean
  custom: boolean
  name: string
  value: any
  index: number
}
export interface ExecutionCallLifecycle {
  looped: boolean
  custom: boolean
  entries: ExecutionCall[]
}

const logger = new Logger()

export const createIntegratedWorker = async (functionName: string, fn: (data: Record<string, any>) => any) => {
  const calledFunc = integratedFunctions.find((f) => f.name === functionName)
  if (!calledFunc) return undefined
  const mqConnection = await connectToRedisBullmq(env)
  const func = async ({ data }: any) => {
    const calls = data.calls
    logger.debug(`calling function '${functionName}'`)
    const result = await fn(data)
    logger.info(`'${functionName}' result: ${JSON.stringify(result)}`)
    if (calls) {
      logger.debug(`found ${Object.keys(calls).length} top-level children of this workflow, starting...`)
      const allCalls = Object.entries(calls)
      for (let i = 0; i < allCalls.length; i++) {
        if (!allCalls[i]) continue
        const workflowName = (allCalls[i] ?? [])[0]
        const details = (allCalls[i] ?? [{}])[1] as Record<string, any>
        logger.debug(`attemping to add a call to '${workflowName}'`)
        if (!details) {
          const msg = `tried to chain workflow '${workflowName}' but functional details are not parsable`
          logger.warn(msg)
          continue
        }
        const nextCalledFunc = integratedFunctions.find((f) => f.name === details.functionName)
        if (!nextCalledFunc) {
          const msg = `tried to chain workflow '${workflowName}' but the specified function '${details.name}' could not be found!`
          logger.warn(msg)
          continue
        }
        const parsedArguments: ExecutionCallLifecycle = {
          looped: false,
          custom: false,
          entries: [],
        }
        const callArgsList = Object.entries(details.reqBody)
        for (let i = 0; i < callArgsList.length; i++) {
          const theArgument = callArgsList[i]
          if (theArgument === undefined) continue
          const argName = theArgument[0]
          const argValue = theArgument[1]
          if (!argValue) continue
          const nextArgPod = parsedArguments.entries.length
          parsedArguments.entries.push({ looped: false, custom: false, name: argName, value: undefined, index: i })
          const nextArgEntry = parsedArguments.entries[nextArgPod]
          if (nextArgEntry === undefined) continue
          if (typeof argValue === "string") {
            if (`${argValue.slice(0, 1)}` + `${argValue[argValue.length - 1]}` === "[]") {
              if (parsedArguments.looped === true) {
                logger.error(
                  `ERROR: argument '${argName}' is templated as a loop, but there is already a loop in this Workflow hook! (value = ${argValue})`
                )
                // ERROR OUT THE WORKER, DO NOT POLLUTE QUEUES WITH BAD WORKFLOW CALLS
                return undefined
              }
              parsedArguments.looped = true
              nextArgEntry.looped = true
              parsedArguments.custom = true
              nextArgEntry.custom = true
              nextArgEntry.value = argValue.slice(2).slice(undefined, -1)
            } else if (`${argValue.slice(0, 1)}` === "$") {
              parsedArguments.custom = true
              nextArgEntry.custom = true
              nextArgEntry.value = argValue.slice(1)
            } else {
              nextArgEntry.value = argValue
            }
          }
        }

        // Assemble the reqBody for passing to the call:
        const assembledBodyStatic = Object.fromEntries(
          parsedArguments.entries
            // start by parsing all the non-looped arguments (which might be all arguments) to the call:
            .filter((e) => !e.looped)
            .map((e) => {
              if (e.custom) {
                if (!result[e.value]) {
                  logger.debug(
                    `argument '${e.name}' is templated as '${
                      (callArgsList[i] ?? ["ARG_MISSING"])[1]
                    }', but there is no matching key in the return value dictionary from function '${
                      nextCalledFunc.name
                    }'! (using ${JSON.stringify(result[e.name])})`
                  )
                } else {
                  logger.debug(
                    `argument '${e.name}' is templated as '${
                      (callArgsList[i] ?? ["ARG_MISSING"])[1]
                    }', and got retrieved as ${JSON.stringify(result[e.value])}`
                  )
                }
                return [e.name, result[e.value]]
              }
              return [e.name, e.value]
            })
        )
        const enqueueJob = async (bod: QueueTypeInput) => {
          logger.debug(`parsed arguments for reqBody: ${JSON.stringify(assembledBodyStatic)}`)
          const queue = getQueue<z.TypeOf<typeof nextCalledFunc.schema>>(mqConnection, nextCalledFunc.queueName)
          await queue.add(`${workflowName}.calls.${i}`, bod)
          logger.info(`added chain workflow call '${workflowName}' to queue '${nextCalledFunc.queueName}'`)
          logger.debug(
            `body added to '${nextCalledFunc.queueName}' queue (callArgs are ${details.callArgs}): ${JSON.stringify(
              bod
            )}`
          )
        }
        // if we know none of the arguments are looped, we can enqueue one job with this static body
        if (!parsedArguments.looped) {
          enqueueJob({ reqBody: assembledBodyStatic, calls: details.calls })
          // return from the Worker here
          return true
        }
        const loopArg = parsedArguments.entries.find((e) => e.looped)
        if (!loopArg) return undefined
        // loopRawVal is the RAW value from the previous Worker's return dictionary
        const loopRawVal = result[loopArg.value]
        if (!Array.isArray(loopRawVal)) {
          logger.error(
            `found looped value '${loopArg.value}' for argument '${loopArg.name}', but the found value is not an array, looping cancelled`
          )
          return undefined
        }
        // loop over each element in the previous Worker return's array of values
        for (let i = 0; i < loopRawVal.length; i++) {
          const loopVal = loopRawVal[i]
          const loopReqBody = { [loopArg.name]: loopVal }
          // combine the static (non-looped) arguments with this new ReqBody via this iteration
          const fullReqBody = { ...assembledBodyStatic, ...loopReqBody }
          // calls for this array are the same for any calls within this worker, they stay the same
          const callReqBody = nextCalledFunc.calls
          const body = { reqBody: fullReqBody, calls: callReqBody ?? null }
          // FOR every iteration on the previous Worker return's array value, enqueue this newly combined body:
          enqueueJob(body)
        }
      }
    }
  }
  logger.debug(`starting worker: '${functionName}'`)
  range(0, env.WORKER_COUNT).forEach(() => {
    new Worker<z.TypeOf<typeof calledFunc.schema>>(calledFunc.queueName, func, {
      connection: mqConnection,
      concurrency: env.WORKER_CONCURRENCY,
      limiter: {
        max: 10,
        duration: 1000,
      },
    })
  })
}
