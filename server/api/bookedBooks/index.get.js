import {getBookedBooks} from "~/server/db/booking"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  if (!query.query) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Query string should not be empty',
    })
  }

  let prismaQuery = {
    include: {
      libraryBook: {
        include: {
          book: {
            include: {
              author:true,
              publisher:true
            }
          }
        }
      }
    },
    where: { 
      OR: [
        {
          orderCode: {
            search: query.query
          }
        },
        {
          userId: {
            search: query.query
          }
        }
      ]
      
    }
  }

  try {
    const orders = await getBookedBooks(prismaQuery)

    return orders
  }

  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error finding orders',
    })
  }
})