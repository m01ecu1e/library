import { prisma } from ".";
import crypto from 'crypto'

export const createBookedBook = (bookData) => {
    return prisma.$transaction([
        prisma.bookedBooks.create({
            data: bookData,
        }),
        prisma.libraryBook.update({
            where: {
                id: bookData.libraryBookId,
            },
            data: {
                amountAvailable: { decrement: 1 }
            }
        })
    ])
}

export const getBookedBooks = (params = {}) => {
    return prisma.bookedBooks.findMany({
        ...params
    })
}

export const generateOrderCode = (userUuid, bookUuid) => {
    const combined = userUuid + bookUuid
    const hash = crypto.createHash('sha256').update(combined).digest('hex')
    return hash.substring(0, 9) // Первые 8 символов хэша
}

export const putBookedBook = (params) => {
    return prisma.bookedBooks.update({
        ...params
    })
}

export const deleteBookedBook = (params) => {
    return prisma.bookedBooks.delete({
        ...params
    })
}

export const getOrderByUserIdAndBookId = (params) => {
    return prisma.bookedBooks.findUnique({
        ...params
    })
}

export const getOrderById = (orderId) => {
    return prisma.bookedBooks.findUnique({
        where: {
            id: orderId
        },
        include: {
            user: true,
            libraryBook: {
                include: {
                    book: {
                        include: {
                            author: true,
                            publisher: true
                        }
                    },
                    library: true
                }
            },
            // user: {
            //     include: {
            //         firstName: true,
            //         lastName: true,
            //         email: true,
            //     }
            // }

        }
    })
}