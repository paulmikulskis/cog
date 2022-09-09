import { GraphQLClient } from "graphql-request"

export const makeGraphQlRequest = (
  endpoint: string,
  query: string,
  args: Record<string, any>
): Promise<Record<string, any> | undefined> => {
  try {
    // https://github.com/prisma-labs/graphql-request
    const client = new GraphQLClient(endpoint)
    return client.request(query, args).then((data) => {
      if (!data) return undefined
      if (Array.isArray(data)) return { requestTime: new Date(), data }
      return { requestTime: new Date(), ...data }
    })
  } catch (e) {
    return Promise.resolve(undefined)
  }
}
