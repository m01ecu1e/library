import { createBookedBook, getBookedBooks, generateOrderCode } from "~/server/db/booking"
import { getLibraryBookById } from "~/server/db/book"

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const { libraryBookId, userId } = body

  const bookData = {
    libraryBookId,
    userId,
    received: false,
    orderCode: ''
  }

  if (!libraryBookId || !userId) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid params'
    }))
  }

  if (!await getLibraryBookById(bookData.libraryBookId)) {
    return {
      book: "Book does not exist"
    }
  }

  // Создание orderCode
  bookData.orderCode = generateOrderCode(userId, libraryBookId)

  // Проверка уникальности orderCode
  // const existingBookedBooks = await getBookedBooks()
  // while (existingBookedBooks.some(book => book.orderCode === bookData.orderCode)) {
  //   bookData.orderCode = generateOrderCode(userId, libraryBookId + Math.random())
  // }

  const bookedBook = await createBookedBook(bookData)

  return {
    book: bookedBook
  }

})