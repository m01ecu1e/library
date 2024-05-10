import {prisma} from ".";

export const createBook = (bookData) => {
    return prisma.books.create({
        data: bookData,
    })
}

export const createLibraryBook = (bookData) => {
    return prisma.libraryBook.create({
        data: bookData
    })
}

export const createLibrary = (libData) => {
    return prisma.libraries.create({
        data: libData
    })
}

export const getBooks = (params = {}) => {
    return prisma.books.findMany({
        ...params
    })
}

export const getLibraryBooks = (params = {}) => {
    return prisma.libraryBook.findMany({
        ...params
    })
}

export const getLibraryBookIdByBookTitle = (title) => {
    return prisma.books.findUnique({
        where: {
            title
        }
    })
} 

export const getBookById = (bookId) => {
    return prisma.books.findUnique({
        where: {
            id: bookId
        }
    })
}

export const getLibraryById = (libData) => {
    return prisma.libraries.findUnique({
        where: {
            id: libData
        }
    })
}