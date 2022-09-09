import { createHash } from "crypto"

export const jobIdToWorkflowName = (jobId: unknown): string => {
  if (typeof jobId !== "string") return "UNKNOWN_WORKFLOW"
  return jobId.split(".")[1] || "UNKNOWN_WORKFLOW"
}

export const jobIdToUserName = (jobId: unknown): string => {
  if (typeof jobId !== "string") return "UNKNOWN_USER"
  return jobId.split(".")[0] || "UNKNOWN_USER"
}

export const jobIdToFunctionName = (jobId: unknown): string => {
  if (typeof jobId !== "string") return "UNKNOWN_FUNCTION"
  return jobId.split(".")[2] || "UNKNOWN_FUNCTION"
}

export const jobIdToCron = (jobId: unknown): string => {
  if (typeof jobId !== "string") return "UNKNOWN_CRON"
  return jobId.split(".")[3] || "UNKNOWN_CRON"
}

export const repeatJobId = (name: string, nextMillis: number, key: string, jobId?: string): string => {
  return getRepeatJobId(name, nextMillis, md5(key), jobId)
}

const md5 = (str: string): string => {
  return createHash("md5").update(str).digest("hex")
}

//from BullJS library
const getRepeatJobId = (name: string, nextMillis: number, namespace: string, jobId?: string) => {
  const checksum = md5(`${name}${jobId || ""}${namespace}`)
  return `repeat:${checksum}:${nextMillis}`
}
