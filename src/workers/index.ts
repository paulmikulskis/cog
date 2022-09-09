import { exampleFunc } from "./example-func"

import { Logger } from "tslog"
import { exit } from "process"
import { config } from "dotenv"
import { ValidatedEnv } from "../utils/validated-env"

export const env = ValidatedEnv.parse(process.env)
;(async function () {
  const logger = new Logger()
  logger.info(`starting worker stack...`)
  config({ path: "base.env" })
  config({ path: ".env", override: true })
  const integratedWorkers = [exampleFunc]

  const workers = await Promise.all(integratedWorkers)
  const workerNames = workers.map((w) => w && w.name)
  logger.debug(`registered ${workers.length} workers`)
  logger.debug(`worker names: ${workerNames.toString().replace("[", "").replace("]", "")}`)

  const args = process.argv.slice(2)
  // will be the name of the service to run via command line argument
  const arg = args[0]
  if (!arg || arg === "all") {
    logger.warn(`no worker name specifed to the worker stack!  will attempt to run all workers...`)
    Promise.all(workers.map((w) => w()))
  } else if (workerNames.indexOf(arg) >= 0) {
    const i = workerNames.indexOf(arg)
    const worker = workers[i]
    if (!worker) {
      logger.error(`started against worker '${arg}' but no matching worker integration found`)
      exit(20)
    }
    logger.info(`starting service: '${worker.name}'`)
    worker()
  } else {
    logger.error(`started against worker '${arg}' but no matching worker integration found`)
    exit(20)
  }
})()
