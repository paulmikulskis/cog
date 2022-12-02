import { z } from "zod"
import { createIntegratedFunction, IntegratedFunction, respondWith } from "../utils/server_utils"
import { getQueue } from "../../workers/utils/queues"
import { ScanEntireChannelConfig } from "../utils/scan_config_template"

type ScanEntireChannelBodyType = z.TypeOf<typeof ScanEntireChannelConfig>

export const exampleFunc: IntegratedFunction = createIntegratedFunction(
  "scanEntireChannel",
  `scan entire channel`,
  ScanEntireChannelConfig,
  async (context, body) => {
    const scamEntireChannelQueue = getQueue<ScanEntireChannelBodyType>(context.mqConnection, "scanEntireChannel")

    await scamEntireChannelQueue.add(`${body.userId}.scanEntireChannel`, {
      reqBody: {
        // userId will correspond to the Firebase User Auth ID
        userId: body.userId,
        maxComments: body.maxComments || 10000,
        filterMode: body.filterMode || "sensitivesmart",
        filterSubMode: body.filterSubMode || "regex",
        removalType: body.removalType || "deletespam",
        skipDeletion: body.skipDeletion || false,
      },
      calls: null,
    })
    return respondWith(200, `added job to queue 'scanEntireChannel for user "${body.userId}"'`)
  }
)
