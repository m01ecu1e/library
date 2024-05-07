import { readBooks } from "~/server/db/book"

export default defineEventHandler(async (event) => {

    const books = await readBooks()

    return {
        books
    }

})