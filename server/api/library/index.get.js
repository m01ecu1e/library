import {getLibraries} from "~/server/db/library"

export default defineEventHandler(async (event) => {

  try {
    const libraries = await getLibraries()

    return libraries
  }

  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error finding publishers',
    })
  }

})