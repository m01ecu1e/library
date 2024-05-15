import { getBooks } from "~/server/db/book"
import { bookTransformer } from "../transformers/book"

import Prisma from "@prisma/client"

const { PrismaClient } = Prisma

const prisma = new PrismaClient()

export { prisma }


export default defineEventHandler(async (event) => {

    const { query, skip, take } = getQuery(event)

    // let prismaQuery = {
    //     include: {
    //         author: true,
    //         publisher: true,

    //         _count: {
    //             select: {
    //                 LibraryBook: true
    //             }
    //         }
    //     },
    //     orderBy: [
    //         {
    //             created_at: 'desc'
    //         }
    //     ],

    // }

    // if (query) {

    //     prismaQuery = {
    //         ...prismaQuery,
    //         // skip: +skip,
    //         // take: +take,
    //         where: {
    //             OR: [
    //                 {
    //                     author: {
    //                         name: {
    //                             search: query.trim().split(" ").join(" & "),
    //                         }
    //                     }
    //                 },
    //                 {
    //                     title: {
    //                         search: query.trim().split(" ").join(" & "),
    //                         //search: query.split(" ").join("*")
    //                         //search: query
    //                     }
    //                 }
    //             ]
    //         }
    //     }
    // }

    const books = await prisma.$transaction([
        prisma.books.findMany({
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
                            //search: query.split(" ").join("*")
                            //search: query
                        }
                    }
                ]
            }
        }),
        prisma.books.count({
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
        })
    ])


    //const books = await getBooks(prismaQuery)

    return {
        //books: books[0].map(bookTransformer),
        //prismaQuery,
        //books: books[0].map(bookTransformer),
        //total: books[1]
        books: books[0].map(bookTransformer),
        total: books[1]
        //books: books.map(bookTransformer)
    }
})