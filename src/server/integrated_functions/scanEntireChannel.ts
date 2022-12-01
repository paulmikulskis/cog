import { z } from "zod";
import {
  createIntegratedFunction,
  IntegratedFunction,
  respondWith,
} from "../utils/server_utils";
import { getQueue } from "../../workers/utils/queues";
import { ScanConfig } from "../utils/scan_config_template";

const ScanEntireChannelBody = ScanConfig;

type ScanEntireChannelBodyType = z.TypeOf<typeof ScanEntireChannelBody>;

export const exampleFunc: IntegratedFunction = createIntegratedFunction(
  "scanEntireChannel",
  `scan entire channel`,
  ScanConfig,
  async (context, body) => {
    const dispoDumpQueue = getQueue<ScanEntireChannelBodyType>(
      context.mqConnection,
      "scanEntireChannel"
    );
    const { ...ScanConfig } = body;

    await dispoDumpQueue.add(`customId.scanEntireChannel`, {
      reqBody: ScanConfig,
      calls: null,
    });
    return respondWith(200, `added job to queue 'scanEntireChannel'`);
  }
);
