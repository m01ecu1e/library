import { deleteBookedBook } from "~/server/db/booking"
import { sendError } from "h3"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { orderId } = body

  // const libraryBook = await getLibraryBookById(libraryBookId)

  const prismaQuery = {
    where: {
      id: orderId,
    },
  }

  const newBookedBook = await deleteBookedBook(prismaQuery)

  return {
    bookedBook: newBookedBook
  }
})
