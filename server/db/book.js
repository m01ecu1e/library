import {prisma} from ".";

export const createBook = (bookData) => {
    return prisma.books.create({
        data: bookData,
    })
}

export const readBooks = () => {
    return prisma.books.findMany()
}