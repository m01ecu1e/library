import { getLibraryBooks } from "~/server/db/book"
import { accountingLibraryBookTransformer } from "../transformers/accountingLibraryBook"

export default defineEventHandler(async (event) => {

    const {query, libraryId, skip, take, } = getQuery(event);

    let prismaQuery = {
        // skip:0,
        // take:8,
        include: {
            book: {
                include: {
                    author: true,
                    publisher: true
                }
            },
            library: true,
            bookedBook: {
                include: {
                    user: true,
                }
            },
        },
        where: {
          library: {
            id: libraryId
          }
        },
        orderBy: [
            {
                created_at: 'desc'
            }
        ]
    }

    
    const books = await getLibraryBooks(prismaQuery)

    return {
        //prismaQuery
        libraryBooks: books.map(accountingLibraryBookTransformer),
        // libraryBooks: books,
        length: books.length
    }

})