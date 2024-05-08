import { getBooks } from "~/server/db/book"

export default defineEventHandler(async (event) => {

    const books = await getBooks({
        orderBy: [
            {
                created_at: 'desc'
            }
        ]
    })

    return {
        books: books
    }

})