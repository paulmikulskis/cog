import { z } from "zod"
import { createIntegratedFunction, IntegratedFunction, respondWith } from "../utils/server_utils"
import { getQueue } from "../../workers/utils/queues"

// Every IntegratedFunction (POSTs) will look for a specific structure in the HTTP body.
// We define that structure with Zod.  If this IntegratedFunction is the interface for
// a callable Worker (as we just wrote above), this also defines the reqBody form
// for routing/type-checking/control-flow within the Worker stack:
const StoreInfoDumpBody = z.object({
  miles: z.number(),
})

// we need to convert that 👆 model into a Type so we can grab the Queue functionality
type StoreInfoDumpBodyType = z.TypeOf<typeof StoreInfoDumpBody>

// call the createIntegratedFunction() method to bootstrap your API route:
export const exampleFunc: IntegratedFunction = createIntegratedFunction(
  "exampleFunc", // Name of the IntegratedFunction (route for API)
  `finds stores within a certain distance from a given location`, // Help string
  StoreInfoDumpBody, // Body type we defined above
  async (context, body) => {
    // Actual functionality to perform if called upon
    // The context and body get auto-exposed, to provide connection and global vars
    const dispoDumpQueue = getQueue<StoreInfoDumpBodyType>(context.mqConnection, "exampleFunc")
    const { miles } = body // we can expect a field 'miles'
    // queue a job in this queue for our new Worker to pick up:
    await dispoDumpQueue.add(`customId.${miles}`, { reqBody: { miles }, calls: null })
    // since an IntegratedFunction is ultimately a route, make sure to respond HTTP:
    return respondWith(200, `added job to queue 'exampleFunc' for shops within '${miles}' miles`)
  }
)
