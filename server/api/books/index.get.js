import { getBooks, getBooksCount } from "~/server/db/book"
import { bookTransformer } from "../transformers/book"

export default defineEventHandler(async (event) => {

    const { query, skip, take } = getQuery(event)

    if (!query) {
        let prismaQuery = {
            skip: 0,
            take: 5,
            include: {
                author: true,
                publisher: true,

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
            ],

        }
        const books = []
        books[0] = await getBooks(prismaQuery)
        return {
            books: books[0].map(bookTransformer)
        }
    }

    if (query) {
        let prismaQuery = {
            include: {
                author: true,
                publisher: true,

                _count: {
                    select: {
                        LibraryBook: true
                    }
                }
            },
            skip: +skip,
            take: +take,
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
                        }
                    }
                ]
            }
        }
        const books = []
        books[0] = await getBooks(prismaQuery)
        books[1] = await getBooksCount({
            where: prismaQuery.where
        });
        return {
            books: books[0].map(bookTransformer),
            total: books[1]
        }
    }
})