import {getAuthors} from "~/server/db/author"

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
        contains: query.query,
        mode:'insensitive'
      }
    }
  }

  try {
    const authors = await getAuthors(prismaQuery)

    return authors
  }

  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error finding authors',
    })
  }


})
