import { createBook } from "~/server/db/book"

export default defineEventHandler(async (event) => {
   
    const body = await readBody(event)

    const{ publisherId, authorId, title } = body

    const bookData = {
        publisherId,
        authorId,
        title
    }

    const book = await createBook(bookData)

    return {
        book: book
    }

})