import { z } from "zod"
import { filterModes } from "./enums"
import { removalTypes } from "./enums"

export const ScanEntireChannelConfig = z.object({
  max_comments: z.number().default(10000),
  filter_mode: z.enum(filterModes).default("sensitivesmart"),
  filter_subMode: z.string().default("regex"),
  removal_type: z.enum(removalTypes).default("deletespam"),
  skip_deletion: z.boolean().default(false),
})
