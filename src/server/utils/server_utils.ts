import { z } from "zod"
import { Context } from "../utils/context"
import { ApiError, ApiResponse } from "./models"
import { Logger } from "tslog"
import { integratedFunctions } from "./executeFunction"

const logger = new Logger()

export const respondError = (code: number, message: string): ApiResponse => {
  logger.info(`[${code}] ${message}`)
  return {
    code: code,
    message: message || "no message specified",
    data: undefined,
  }
}

export const respondWithError = (error: ApiError) => {
  return respondWith(error.code, error.message ?? "", error.data)
}

export const respondWith = (code: number, message: string, data?: Record<string, unknown>): ApiResponse => {
  logger.info(`[${code}] ${message}`)
  return {
    code: code,
    message: message,
    data: data,
  }
}

export const getScheduleableFunctions = (): IntegratedFunction[] => {
  return integratedFunctions.filter((fn) => fn.scheduleable)
}

export type IntegratedCalls = {
  name: string
  description: string
  schema: z.Schema
  fn: (context: Context, body: unknown) => Promise<ApiResponse>
  queueName: string
  scheduleable?: boolean
  calls?: Record<string, IntegratedCalls>
  callArgs?: boolean
}

export type IntegratedFunction = {
  name: string
  description: string
  schema: z.Schema
  fn: (context: Context, body: unknown) => Promise<ApiResponse>
  queueName: string
  scheduleable?: boolean
  calls?: Record<string, IntegratedCalls>
}

export const createIntegratedFunction = <A>(
  name: string,
  description: string,
  schema: z.Schema<A>,
  fn: (context: Context, args: A) => Promise<ApiResponse>,
  queueName?: string,
  scheduleable?: boolean,
  calls?: Record<string, IntegratedCalls>
): IntegratedFunction => ({
  name,
  description,
  schema,
  fn: (context: Context, body: unknown) => {
    const bodyParse = schema.safeParse(body)
    if (!bodyParse.success) return Promise.resolve(respondError(401, "invalid POST body input" + bodyParse.error))
    return fn(context, bodyParse.data)
  },
  queueName: queueName ?? name,
  scheduleable: scheduleable ?? true,
  calls,
})
