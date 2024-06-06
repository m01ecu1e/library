import {getPublishers} from "~/server/db/publisher"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  if (!query.query) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Query string should not be empty',
    })
  }

  let prismaQuery = {
    where: {
      name: {
        contains: query.query
      }
    }
  }

  try {
    const publishers = await getPublishers(prismaQuery)

    return publishers
  }

  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error finding publishers',
    })
  }
})