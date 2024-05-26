import { createBook, getBookByInfo } from "~/server/db/book"

export default defineEventHandler(async (event) => {
   
    const body = await readBody(event)

    const{ publisherId, authorId, title, coverImage  } = body

    const bookData = {
        publisherId,
        authorId,
        title,
        coverImage
    }

    if (!publisherId || !authorId || !title) {
        return sendError(event, createError({
          statusCode:400,
          statusMessage: 'Invalid params'
        }))
      }

    const checkBook = await getBookByInfo(bookData)

    if(checkBook) {
        return sendError(event, createError({
            statusCode:400,
            statusMessage: 'Book already exists'
          }))
    }

    const book = await createBook(bookData)

    return {
        book: book
    }

})