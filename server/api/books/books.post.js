import { createBook } from "~/server/db/book"

export default defineEventHandler(async (event) => {
   
    const body = await readBody(event)

    const{ author, title } = body

    const bookData = {
        author,
        title
    }

    const book = await createBook(bookData)

    return {
        book: book
    }

})