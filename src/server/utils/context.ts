import type IORedis from "ioredis"
import { connectToRedisBullmq } from "../../utils/redis"
import { ValidatedEnv } from "../../utils/validated-env"

export type Context = {
  env: ValidatedEnv
  mqConnection: IORedis.Redis
}

export const getContext = async (rawEnv: Record<string, string | undefined>): Promise<Context> => {
  const env = ValidatedEnv.parse(rawEnv)
  const mqConnection = await connectToRedisBullmq(env)
  return {
    env,
    mqConnection,
  }
}
