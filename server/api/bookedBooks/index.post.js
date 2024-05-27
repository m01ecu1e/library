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
  // console.log(libraryBookId)

  if (!bookData.libraryBookId) {
    throw createError({
      statusCode:400,
      statusMessage:'No available books',
      message:'Сначала выберите библиотеку',
    })
  }
  
  const libraryBook = await getLibraryBookById(bookData.libraryBookId)

  if (!await getLibraryBookById(bookData.libraryBookId)) {
    throw createError({
      statusCode:400,
      statusMessage:'No available books',
      message:'Что-то пошло не так :/'
    })
  }

  if(libraryBook.amountAvailable == 0) {
    // return sendError(event, createError({
    //   statusCode: 400,
    //   statusMessage: 'No available books'
    // }))
    throw createError({
      statusCode:400,
      statusMessage:'No available books',
      message:'Книги нет в наличии'
    })
  }

  const query = {
    where: {
      AND: [
        {libraryBookId: bookData.libraryBookId},
        {userId: bookData.userId}
      ]
    }
  }

  if(await getBookedBooks(query) != 0) {
    // return sendError(event, createError({
    //   statusCode: 400,
    //   statusMessage: 'You cant order the same book twice'
    // }))
    throw createError({
      statusCode:400,
      statusMessage:'You cant order the same book twice',
      message:'Вы не можете забронировать одну книгу дважды'
    })
  } else {
    bookData.orderCode = generateOrderCode(userId, libraryBookId)
    const bookedBook = await createBookedBook(bookData)
    return {
      book: bookedBook
    }
  }

  // Создание orderCode


  


  // return await getBookedBooks(query) != 0

})