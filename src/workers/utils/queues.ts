import { QueueScheduler, Queue, BaseJobOptions } from "bullmq"
import type { Redis } from "ioredis"
import { ValidatedEnv } from "../../utils/validated-env"
import { integratedFunctions } from "../../server/utils/executeFunction"
import { Logger } from "tslog"
import { IntegratedFunction } from "../../server/utils/server_utils"
const logger = new Logger()

const connection = (env: ValidatedEnv) => ({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
})

export type QueueType<B> = {
  reqBody: B
  calls: Record<string, any> | null
}

export type QueueTypeInput = {
  reqBody: Record<string, any> | null
  calls: Record<string, any> | null
}

export const getQueue = <A>(
  redis: Redis,
  queueName: string,
  defaultJobOptions?: BaseJobOptions
): Queue<QueueType<A>, unknown, string> => {
  const attempts = 1
  logger.info(`connecting to queue ${queueName}, QueueConfig: attempts=${attempts}`)
  return new Queue<QueueType<A>>(queueName, {
    connection: redis,
    defaultJobOptions: defaultJobOptions ?? {
      attempts: attempts,
      backoff: { type: "exponential", delay: 3000 },
      removeOnComplete: 1000,
      removeOnFail: 1000,
    },
  })
}

export const initCogCoreQueues = (env: ValidatedEnv): QueueScheduler[] => {
  return integratedFunctions.map((fun: IntegratedFunction) => {
    return new QueueScheduler(fun.queueName, { connection: connection(env) })
  })
}
