import { TextEncoder } from "util"

export const getSizeInBytes = (obj: any) => {
  let str = null
  if (typeof obj === "string") {
    str = obj
  } else {
    str = JSON.stringify(obj)
  }
  const bytes = new TextEncoder().encode(str).length
  return bytes
}

export const getPrettyDate = () => {
  const m = new Date()
  return (
    m.getUTCFullYear() +
    "/" +
    (m.getUTCMonth() + 1) +
    "/" +
    m.getUTCDate() +
    " " +
    m.getUTCHours() +
    ":" +
    m.getUTCMinutes() +
    ":" +
    m.getUTCSeconds()
  )
}
