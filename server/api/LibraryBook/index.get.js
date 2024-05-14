import { getLibraryBooks } from "~/server/db/book"
import { libraryBookTransformer } from "../transformers/libraryBook"

export default defineEventHandler(async (event) => {

    const {query} = getQuery(event)

    let prismaQuery = {
        include: {
            book: {
                include: {
                    author: true,
                    publisher: true
                }
            },
            library: true
        },
        orderBy: [
            {
                created_at: 'desc'
            }
        ]
    }

    if(query) {
        prismaQuery = {
            ...prismaQuery,
            where: {
                book: {
                    title: {
                        search : query
                    }
                }
            }
        }
    }
    
    const books = await getLibraryBooks(prismaQuery)

    return {
        //prismaQuery
        books: books.map(libraryBookTransformer)
        //books: books
        
    }

})