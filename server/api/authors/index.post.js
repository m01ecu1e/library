import { createAuthor } from "~/server/db/author"

export default defineEventHandler(async (event) => {
   
    const body = await readBody(event)

    const{ name, info } = body

    const authorData = {
        name,
        info
    }
    console.log("author add")
    const author = await createAuthor(authorData)

    return {
        author: author
    }

})