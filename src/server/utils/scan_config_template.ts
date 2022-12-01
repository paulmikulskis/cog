import { z } from "zod";
import { filterModes } from "./enums";
import { removalTypes } from "./enums";

export const ScanConfig = z.object({
  max_comments: z.number(),
  filter_mode: z.enum(filterModes),
  filter_subMode: z.string().optional(),
  removal_type: z.enum(removalTypes),
});
