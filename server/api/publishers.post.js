import { createPublisher } from "~/server/db/publisher"

export default defineEventHandler(async (event) => {
   
    const body = await readBody(event)

    const{ name, info } = body

    const publisherData = {
        name,
        info
    }

    const publisher = await createPublisher(publisherData)

    return {
        publisher: publisher
    }

})