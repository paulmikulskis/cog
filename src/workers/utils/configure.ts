import { config } from "dotenv"
import { ValidatedEnv } from "../../utils/validated-env"
import { Logger } from "tslog"
const logger = new Logger()

config({ path: "base.env" })
config({ path: ".env", override: true })

export const env = ValidatedEnv.parse(process.env)

if (env.ENVIRONMENT !== "development") {
  logger.debug(`environment is NOT "development", '${env.ENVIRONMENT}'`)
} else {
  logger.debug(`environment: '${env.ENVIRONMENT}'`)
}
