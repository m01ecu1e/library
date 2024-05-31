import { getLibraryBooks } from "~/server/db/book"
import { libraryBookTransformer } from "../transformers/libraryBook"

export default defineEventHandler(async () => {

    //const {query} = getQuery(event)

    let prismaQuery = {
        skip:0,
        take:6,
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

    
    const books = await getLibraryBooks(prismaQuery)

    return {
        //prismaQuery
        books: books.map(libraryBookTransformer)
        //books: books
        
    }

})