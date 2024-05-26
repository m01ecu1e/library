import { getLibraryBookById, putLibraryBook } from "~/server/db/book"
import { sendError } from "h3"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { libraryBookId, value } = body

  const libraryBook = await getLibraryBookById(libraryBookId)

  if (libraryBook.amountAvailable == 0 && value == -1) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Book is not available'
    }))
  }

  const newAmountAvailable = libraryBook.amountAvailable + value

  const prismaQuery = {
    where: {
      id: libraryBookId,
    },
    data: {
      amountAvailable: newAmountAvailable
    }
  }

  const newLibraryBook = await putLibraryBook(prismaQuery)

  return {
    libraryBook: newLibraryBook
  }

})
