import { gql } from "graphql-request" // this worker will use gql and..
import { GraphQLClient } from "graphql-request" //..graphql-request to query an API
import fs from "fs"
import { createIntegratedWorker } from "../utils/worker" // function to create your worker

// just defining a query our Worker will use to grab data when invoked
const query = gql`
  query exampleFunc($miles: Number!) {
    filteredDispensaries(filter: { nearLat: 42.3, nearLng: -71.2, distance: $miles }) {
      name
      distance
      address
    }
  }
`

export const exampleFunc = async () => {
  await createIntegratedWorker(
    "exampleFunc", // name of integratedWorker (used for info like `queueName`)

    // core function that defines this worker:
    // all integratedWorkers get called with { reqBody, calls }
    async ({ reqBody, _calls }) => {
      const miles = reqBody?.milesAway
      try {
        const client = new GraphQLClient("https://dutchie.com/graphql")
        client.request(query, { miles: `${miles}` }).then((data: any) => {
          fs.writeFileSync("exampleFunc.json", JSON.stringify(data))
          console.log(`succesfully wrote to exampleFunc.json!`)
        })
      } catch (e) {
        console.log(`ERROR while trying to request (miles=${miles})`)
      }
    }
  )
}
