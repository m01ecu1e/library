import { createAuthor } from "~/server/db/author"

export default defineEventHandler(async (event) => {
   
    const body = await readBody(event)

    const{ name, info } = body

    const authorData = {
        name,
        info
    }

    const author = await createAuthor(authorData)

    return {
        author: author
    }

})