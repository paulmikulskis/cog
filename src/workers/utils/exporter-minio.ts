/**
 * Helper functions for writing data to MinIO
 */
import { BucketItemFromList, Client } from "minio"
import { Logger } from "tslog"
import { getSizeInBytes } from "../../utils/helper-funcs"
import { env } from "../utils/configure"

const logger = new Logger()

const MINIO_ENDPOINT = env.MINIO_ENDPOINT
const MINIO_PORT = env.MINIO_PORT
const MINIO_ACCESS_KEY = env.MINIO_ACCESS_KEY
const MINIO_SECRET_KEY = env.MINIO_SECRET_KEY

const DUTCHIE_BUCKET_NAME = "dutchiedata"

const minioClient = new Client({
  endPoint: MINIO_ENDPOINT,
  port: MINIO_PORT,
  useSSL: false,
  accessKey: MINIO_ACCESS_KEY,
  secretKey: MINIO_SECRET_KEY,
})

// ensure there is a Bucket on the MinIO server:
minioClient.listBuckets().then(
  (buckets: BucketItemFromList[]) => {
    const bucketNames = buckets.map((bucket) => bucket.name)
    if (bucketNames.indexOf(DUTCHIE_BUCKET_NAME) < 0) {
      minioClient.makeBucket(DUTCHIE_BUCKET_NAME, "us-east-1", (err) => {
        if (err) {
          logger.error(
            `the bucket '${DUTCHIE_BUCKET_NAME}' did not exist, and the MinIO Client was unable to create it!`
          )
          logger.error(`no information will be saved at the MinIO destination...`)
        }
        logger.info(`Bucket created successfully in 'us-east-1' on host '${MINIO_ENDPOINT}:${MINIO_PORT}'`)
      })
    }
  },
  (err) => {
    logger.error(`ERROR: minio Client cannot listBuckets on '${MINIO_ENDPOINT}:${MINIO_PORT}'`)
    if (err) {
      logger.error(err)
    }
    logger.error(`no information will be saved at the MinIO destination...`)
  }
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadToMinIO = (data: any, key: string, bucketName = "dutchiedata"): Promise<any> => {
  let parsedData: string
  try {
    parsedData = JSON.stringify(data)
  } catch (e) {
    logger.error(`ERROR: cannot upload file '${key}' to MinIO, data passed is not JSON-serializable!`)
    return new Promise((_resolve, reject) => reject())
  }
  logger.info(
    `attempting to upload ${getSizeInBytes(parsedData)} bytes as filename '${key}' to MinIO bucket '${bucketName}'`
  )

  return new Promise((resolve, reject) => {
    minioClient.putObject(bucketName, key, parsedData, (err: Error, etag: string) => {
      if (err) {
        logger.warn(`error uploading to S3 bucket '${bucketName}', ${err.message}`)
        return reject(err)
      }
      logger.info(
        `successfully uploaded file '${JSON.stringify(
          etag
        )}' to MinIO bucket '${bucketName}' on '${MINIO_ENDPOINT}:${MINIO_PORT}'`
      )
      return resolve(data)
    })
  })
}
