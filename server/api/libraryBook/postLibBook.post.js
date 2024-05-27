import { getBookById,  createLibraryBook, getLibraryBookByInfo } from "~/server/db/book"
import { getLibraryById } from "~/server/db/library"

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const { bookId, libraryId, amount, amountAvailable } = body

    const bookData = {
        bookId,
        libraryId,
        amount,
        amountAvailable
    }

    // if (!await getBookById(bookData.bookId)) {
    //     return {
    //         book: "Book does not exist"
    //     }
    // }

    // if (!await getLibraryById(bookData.libraryId)) {
    //     return {
    //         book: "Library does not exist"
    //     }
    // }

    const checkBook = await getLibraryBookByInfo(bookData)

    if(checkBook) {
        // return sendError(event, createError({
        //     statusCode:400,
        //     statusMessage: 'Book already exists'
        //   }))
        throw createError({
          statusCode:400,
          statusMessage: 'Book already exists',
          message: 'Книга уже существует в этой библиотеке'
        })
    }

    const book = await createLibraryBook(bookData)

    return {
        book: book
    }

})