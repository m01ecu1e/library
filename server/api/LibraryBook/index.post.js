import { getBookById, getLibraryById, createLibraryBook } from "~/server/db/book"

export default defineEventHandler(async (event) => {
   
    const body = await readBody(event)

    const{ bookId, libraryId } = body

    const bookData = {
        bookId,
        libraryId
    }

    if (!await getBookById(bookData.bookId)) {
        return {
            book: "Book does not exist"
        }
    }
        
    if (!await getLibraryById(bookData.libraryId)) {
        return {
            book: "Library does not exist"
        }
    }

    const book = await createLibraryBook(bookData)

    return {
        book: book
    }

})