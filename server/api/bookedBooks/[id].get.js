import { getBookedBooks, getOrderById } from "~/server/db/booking"


export default defineEventHandler(async (event) => {

  const { id } = event.context.params

  try {
    const order = await getOrderById(id)

    return {
      order: order
    }

  }

  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error finding orders',
    })
  }
})