import { z } from "zod"

// https://github.com/colinhacks/zod/discussions/330#discussioncomment-1625947
const stringToNumber = () => z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number())
const stringToBool = () => z.preprocess((a) => (a === "true" || a === "True" ? true : false), z.boolean())

export const ValidatedEnv = z.object({
  WORKER_COUNT: stringToNumber(),
  WORKER_CONCURRENCY: stringToNumber(),
  ENVIRONMENT: z.union([z.literal("development"), z.literal("production")]),
  API_PORT: stringToNumber(),
  REDIS_HOST: z.string().min(1),
  REDIS_PORT: stringToNumber(),
  IAM_USER_KEY: z.string().min(1),
  IAM_USER_SECRET: z.string().min(1),
  DUTCHIE_GRAPHQL_URL: z.string().default("https://dutchie.com/graphql"),
  OBJECT_STORAGE_BUCKET: z.string().default("dutchiedata"),
  MINIO_ENDPOINT: z.string().default("127.0.0.1"),
  MINIO_PORT: stringToNumber().default(9000),
  MINIO_ACCESS_KEY: z.string().default("minio"),
  MINIO_SECRET_KEY: z.string().default("minio123"),
  UPLOAD_MINIO: stringToBool().default(true),
  UPLOAD_S3: stringToBool().default(false),
})
export type ValidatedEnv = z.TypeOf<typeof ValidatedEnv>
