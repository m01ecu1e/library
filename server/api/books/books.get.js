import { getBooks } from "~/server/db/book"
import { bookTransformer } from "../transformers/book"

export default defineEventHandler(async (event) => {

    const books = await getBooks({
        include: {
            author: true,
            publisher: true
        },
        orderBy: [
            {
                created_at: 'desc'
            }
        ]
    })

    return {
        //books: books.map(bookTransformer)
        books: books
    }

})