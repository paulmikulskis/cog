/* eslint-disable unused-imports/no-unused-vars */
import { createIntegratedWorker } from "../utils/worker"
import ytpurge from "../../utils/ytpurgeapi"

export const scanEntireChannel = async () => {
  await createIntegratedWorker("scanEntireChannel", async ({ reqBody, _calls }) => {
    const config = reqBody
    const response = await ytpurge.post(`/scan/userid`)
    //Logic goes here
    try {
    } catch (e) {
      console.log(`ERROR while trying to request for the api`)
    }
  })
}
