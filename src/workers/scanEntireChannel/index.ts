/* eslint-disable unused-imports/no-unused-vars */
import { createIntegratedWorker } from "../utils/worker"
import ytpurge from "../../utils/ytpurgeapi"
import { ScanEntireChannelConfig } from "../../server/utils/scan_config_template"
import { z } from "zod"

// you can optionally import the config template used for the integrated function,
// convert it to a type as you see below, then use that type to autofill fields:
type ScanEntireChannelBodyType = z.TypeOf<typeof ScanEntireChannelConfig>

export const scanEntireChannel = async () => {
  await createIntegratedWorker("scanEntireChannel", async ({ reqBody, _calls }) => {
    const config: ScanEntireChannelBodyType = reqBody
    try {
      const response = await ytpurge.post(
        `/scan/${config.userId}`,
        { settings: config },
        {
          auth: { username: "test", password: "testPassword" },
        }
      )
      if (response.status !== 200) {
        const msg = `Core API returned [${response.status}] "${response.statusText || response.data}",`
        console.log(msg)
      } else {
        const msg = `successfully scanned entire channel for user "${config.userId}"`
        console.log(msg)
      }
    } catch (e) {
      console.log(`ERROR while trying to request for the api`)
    }
  })
}
