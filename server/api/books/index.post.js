import { createBook, getBookByInfo } from "~/server/db/book"

export default defineEventHandler(async (event) => {
   
    const body = await readBody(event)

    const{ publisherId, authorId, title, year, info, ISBN, coverImage  } = body

    const bookData = {
        publisherId,
        authorId,
        title,
        year,
        info,
        ISBN,
        coverImage
    }

    if (!publisherId || !authorId || !title || !year || !info || !ISBN || !coverImage) {
      throw createError({
        statusCode:400,
        statusMessage: 'Invalid params',
        message: 'Неполная информация :('
      })
      }

    const checkBook = await getBookByInfo(bookData)

    if(checkBook) {
        // return sendError(event, createError({
        //     statusCode:400,
        //     statusMessage: 'Book already exists'
        //   }))
        throw createError({
          statusCode:400,
          statusMessage: 'Book already exists',
          message: 'Книга уже существует'
        })
    }

    const book = await createBook(bookData)

    return {
        book: book
    }

})