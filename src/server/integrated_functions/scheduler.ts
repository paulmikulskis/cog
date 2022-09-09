import { createIntegratedFunction, IntegratedFunction, respondWith } from "../utils/server_utils"
import { getQueue } from "../../workers/utils/queues"
import { SchedulerBody } from "../../utils/bodies.model"
import { z } from "zod"
import { integratedFunctions } from "../utils/executeFunction"
import { isValidCron } from "cron-validator"

const _functionName = "scheduler"
type SchedulerBody = z.TypeOf<typeof SchedulerBody>
export const jobId = (reqBody: SchedulerBody) =>
  `${reqBody.user ?? "defaultUser"}.${reqBody.workflowName}.${reqBody.functionName}.'${reqBody.cron}'`

export const scheduler: IntegratedFunction = createIntegratedFunction(
  _functionName,
  `schedules a function with the API.  Usage: {cron: '* 12 * * *'}`,
  SchedulerBody,
  async (context, reqBody) => {
    const { functionName, body, cron, user, workflowName, calls } = reqBody
    if (!isValidCron(cron)) {
      return respondWith(
        400,
        `cannot schedule function '${functionName}' for workflow '${workflowName}', cron is invalid: '${cron}'`
      )
    }
    const scheduleableFunctions = integratedFunctions.filter((f) => f.scheduleable)
    const fn = scheduleableFunctions.find((f: IntegratedFunction) => f.name === functionName)
    if (!fn) {
      return respondWith(
        404,
        `cannot schedule workflow '${workflowName}', function '${reqBody.functionName}' not found!  See the ${scheduleableFunctions.length} scheduleable functions:`,
        Object.fromEntries(
          scheduleableFunctions.map((f) => {
            return [f.name, f.description]
          })
        )
      )
    }
    type ReqBodyType = z.TypeOf<typeof fn.schema>
    const foundQueue = getQueue<ReqBodyType>(context.mqConnection, fn.queueName)

    await foundQueue.add(jobId(reqBody), { reqBody: body, calls: calls ?? null }, { repeat: { cron } })
    return respondWith(200, `user '${user}' added workflow '${workflowName}'`, {
      workflowName,
      cron,
      user,
      reqBody: body,
    })
  },
  _functionName,
  false
)
