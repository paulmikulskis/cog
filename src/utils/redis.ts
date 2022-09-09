import IORedis from "ioredis"

// https://github.com/OptimalBits/bull/issues/503
import EventEmitter from "events"
import { ValidatedEnv } from "./validated-env"
import { Logger } from "tslog"
const logger = new Logger()

EventEmitter.defaultMaxListeners = 20

export const connectToRedis = (env: ValidatedEnv, options: IORedis.RedisOptions): Promise<IORedis.Redis> => {
  const redis = new IORedis({
    port: env.REDIS_PORT,
    host: env.REDIS_HOST,
    ...options,
  })
  return new Promise((resolve, reject) => {
    redis.on("connect", () => {
      logger.info("redis successfully connected")
      resolve(redis)
    })
    redis.on("error", (err: Error) => {
      logger.error("redis connection failed: ", err.message)
      reject(err)
    })
  })
}

export const connectToRedisBullmq = (env: ValidatedEnv): Promise<IORedis.Redis> =>
  connectToRedis(env, { maxRetriesPerRequest: null, enableReadyCheck: false })
