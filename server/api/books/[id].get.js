import { getBookById, getLibraryBooks } from "~/server/db/book"
import { bookTransformer } from "../transformers/book"
import { libTransformer } from "../transformers/library"
import { libraryBookTransformer } from "../transformers/libraryBook"

export default defineEventHandler(async (event) => {

    const { id } = event.context.params

    const book = await getBookById(id)

    const query = {
        select: {
            id: true,
            library: true,
            amount: true,
            amountAvailable: true
        },
        where: {
            book: {
                id: {
                    search: id
                }
            }
        },

    }

    const LB = await getLibraryBooks(query)

    return {
        book: bookTransformer(book),
        libs: LB.map(libTransformer)
        //libs: LB
    }
})