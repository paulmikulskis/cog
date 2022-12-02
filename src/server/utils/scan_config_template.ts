import { z } from "zod"
import { filterModes } from "./enums"
import { removalTypes } from "./enums"

export const ScanEntireChannelConfig = z.object({
  userId: z.string(),
  maxComments: z.number().default(10000),
  filterMode: z.enum(filterModes).default("sensitivesmart"),
  filterSubMode: z.string().default("regex"),
  removalType: z.enum(removalTypes).default("deletespam"),
  skipDeletion: z.boolean().default(false),
})
