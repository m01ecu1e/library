import { putBookedBook } from "~/server/db/booking"
import { sendError } from "h3"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { orderId } = body

  // const libraryBook = await getLibraryBookById(libraryBookId)

  // if (libraryBook.amountAvailable < 1 && value < 0) {
  //   return sendError(event, createError({
  //     statusCode: 400,
  //     statusMessage: 'Book is not available'
  //   }))
  // }

  const prismaQuery = {
    where: {
      id: orderId,
    },
    data: {
      received: true
    }
  }

  const newBookedBook = await putBookedBook(prismaQuery)

  return {
    bookedBook: newBookedBook
  }
})
