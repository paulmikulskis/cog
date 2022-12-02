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

    await scamEntireChannelQueue.add(`customId.scanEntireChannel`, {
      reqBody: {
        max_comments: body.max_comments || 10000,
        filter_mode: body.filter_mode || "sensitivesmart",
        filter_subMode: body.filter_subMode || "regex",
        removal_type: body.removal_type || "deletespam",
        skip_deletion: body.skip_deletion || false,
      },
      calls: null,
    })
    return respondWith(200, `added job to queue 'scanEntireChannel'`)
  }
)
