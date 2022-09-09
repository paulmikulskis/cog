/* eslint-disable prettier/prettier */
import { z } from "zod"

export const exampleFunctionBody = z.object({
  miles: z.number(),
})

export const exampleFunctionBody2 = z.object({
  miles: z.number(),
})

export const scheduleableFunctions = z.union([
  exampleFunctionBody,
  exampleFunctionBody2
  ])

export const SchedulerBody = z.object({
  workflowName: z.string().min(3),
  user: z.string().optional(),
  cron: z.string(),
  functionName: z.string(),
  body: scheduleableFunctions,
  calls: z.record(z.string(), z.any()).optional()
})