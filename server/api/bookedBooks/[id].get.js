import { getBookedBooks } from "~/server/db/booking"
export default defineEventHandler(async (event) => {

  const { orderCode } = event.context.params

  let prismaQuery = {
    include: {
      libraryBook: {
        include: {
          book: {
            include: {
              author: true,
              publisher: true
            }
          }
        }
      }
    },
    where: {
      orderCode: {
        search: orderCode
      }
    }
  }

  try {
    const orders = await getBookedBooks(prismaQuery)

    return {
      orders: orders
    }
  }

  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error finding orders',
    })
  }
})