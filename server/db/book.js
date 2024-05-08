import {prisma} from ".";

export const createBook = (bookData) => {
    return prisma.books.create({
        data: bookData,
    })
}

export const getBooks = (params = {}) => {
    return prisma.books.findMany({
        ...params
    })
}