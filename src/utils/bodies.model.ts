/* eslint-disable prettier/prettier */
import { z } from "zod"

export const DispoDumpBody = z.object({
  nearLat: z.number(),
  nearLng: z.number(),
  distance: z.number(),
  justIds: z.boolean().optional(),
})

export const MenuDumpBody = z.object({
  dispensaryId: z.string(),
})

export const DispensaryInfoDumpBody = z.object({
  dispensaryId: z.string(),
})

export const scheduleableFunctions = z.union([
    MenuDumpBody,
    DispensaryInfoDumpBody,
    DispoDumpBody
  ])

export const SchedulerBody = z.object({
  workflowName: z.string().min(3),
  user: z.string().optional(),
  cron: z.string(),
  functionName: z.string(),
  body: scheduleableFunctions,
  calls: z.record(z.string(), z.any()).optional()
})