import { createBookedBook, getBookedBooks, generateOrderCode } from "~/server/db/booking"
import { getLibraryBookById } from "~/server/db/book"

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const { libraryBookId, userId } = body

  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + 5)

  const bookData = {
    libraryBookId,
    userId,
    received: false,
    orderCode: '',
    booked_due_date: dueDate
  }

  if (!bookData.libraryBookId) {
    throw createError({
      statusCode:400,
      statusMessage:'No available books',
      message:'Сначала выберите библиотеку',
    })
  }
  
  
  const libraryBook = await getLibraryBookById(bookData.libraryBookId)

  if(libraryBook.amountAvailable == 0) {
    throw createError({
      statusCode:400,
      statusMessage:'No available books',
      message:'Книги нет в наличии'
    })
  }

  // const newAmountAvailable = libraryBook.amountAvailable + value

  // const prismaQuery = {
  //   where: {
  //     id: libraryBookId,
  //   },
  //   data: {
  //     amountAvailable: newAmountAvailable
  //   }
  // }

  const query = {
    where: {
      AND: [
        {libraryBookId: bookData.libraryBookId},
        {userId: bookData.userId}
      ]
    }
  }

  if(await getBookedBooks(query) != 0) {
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

})