import { getBooks } from "~/server/db/book"
import { bookTransformer } from "../transformers/book"

export default defineEventHandler(async (event) => {

    const { query, skip, take } = getQuery(event)

    let prismaQuery = {
        skip: +skip,
        take: +take,
        include: {
            author: true,
            publisher: true,
            //LibraryBook: true,
            _count: {
                select: {
                    LibraryBook: true
                }
            }
        },
        orderBy: [
            {
                created_at: 'desc'
            }
        ]
    }

    if (!!query) {
        prismaQuery = {
            ...prismaQuery,
            where: {
                OR: [
                    {
                        author: {
                            name: {
                                search: query.trim().split(" ").join(" & "),
                            }
                        }
                    },
                    {
                        title: {
                            search: query.trim().split(" ").join(" & "),
                            //search: query.split(" ").join("*")
                            //search: query
                        }
                    }
                ]
            }
        }
    }

    const books = await getBooks(prismaQuery)

    // const books = await prisma.books.findMany({
    //     where: {
    //         title: {
    //             search: query.trim().split(" ").join(" & ")
    //         }
    //     }
    // })

    return {
        //prismaQuery,
        books: books.map(bookTransformer)
        //books: books

    }
})