import { putBookedBook } from "~/server/db/booking"
import { sendError } from "h3"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { orderId } = body

  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + 14)

  const prismaQuery = {
    where: {
      id: orderId,
    },
    data: {
      received: true,
      received_at: new Date(),
      due_date: dueDate
    }
  }

  const newBookedBook = await putBookedBook(prismaQuery)

  return {
    bookedBook: newBookedBook
  }
})
