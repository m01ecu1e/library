import { getBookById } from "~/server/db/book"
import { bookTransformer } from "../transformers/book"

export default defineEventHandler(async(event) => {

    const {id} = event.context.params

    const book = await getBookById(id)

    return {
        "book": bookTransformer(book)
        //"book": book
    }
})