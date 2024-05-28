import { prisma } from ".";
import crypto from 'crypto'

export const createBookedBook = (bookData) => {
    return prisma.bookedBooks.create({
        data: bookData,
    })
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
            }
        }
    })
}