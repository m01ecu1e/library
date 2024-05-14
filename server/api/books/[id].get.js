import { getBookById, getLibraryBooks } from "~/server/db/book"
import { bookTransformer } from "../transformers/book"
import { libTransformer } from "../transformers/library"

export default defineEventHandler(async (event) => {

    const { id } = event.context.params

    const book = await getBookById(id)

    const query = {
        where: {
            book: {
                id: {
                    search: id
                }
            }
        },
        select: {
            library: true,
            amountAvailable: true
        }
    }

    const LB = await getLibraryBooks(query)

    return {
         book: bookTransformer(book),
        // book: book,
        //libs: LB
        libs: LB.map(libTransformer)
    }
})