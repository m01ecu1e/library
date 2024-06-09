import { prisma } from ".";

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



export const getBooks = (params = {}) => {
    return prisma.books.findMany({
        ...params
    })
}

export const getBooksCount = (params = {}) => {
    return prisma.books.count({
        ...params
    });
};

export const getLibraryBooks = (params = {}) => {
    return prisma.libraryBook.findMany({
        ...params
    })
}

export const getBookByInfo = (bookData) => {
    return prisma.books.findFirst({
        // include: {
        //     author: true,
        //     publisher: true
        // },
        where: {
            AND: [
                {
                    title: bookData.title
                },
                {
                    author: {
                        id: bookData.authorId
                    }
                },
                {
                    publisher: {
                        id: bookData.publisherId
                    }
                }
            ]
        }
    })
}

export const getLibraryBookByInfo = (bookData) => {
    return prisma.libraryBook.findFirst({
        // include: {
        //     author: true,
        //     publisher: true
        // },
        where: {
            AND: [
                {
                    bookId: bookData.bookId
                },
                {
                    libraryId: bookData.libraryId
                },
            ]
        }
    })
}

export const getBookById = (bookId) => {
    return prisma.books.findUnique({
        where: {
            id: bookId
        },
        include: {
            author: true,
            publisher: true,
            _count: {
                select: {
                    LibraryBook: true
                }
            }
        },
    })
}

export const getLibraryBookById = (bookId) => {
    try {
        return prisma.libraryBook.findUnique({
            where: {
                id: bookId
            }
        })
    } catch(err) {
        // return err
    }
}

export const putLibraryBook = (params) => {
    return prisma.libraryBook.update({
        ...params
    })
}

export const getTotalAvailableBooks = async (where) => {
    const result = await prisma.libraryBook.aggregate({
        _sum: {
            amountAvailable: true
        },
        where: {
            book: where
        }
    });

    return result._sum.amountAvailable || 0;
};

export const getBooksWithAvailability = async (params = {}) => {
    const books = await prisma.books.findMany({
        ...params,
        include: {
            author: true,
            publisher: true,
            LibraryBook: {
                select: {
                    amountAvailable: true
                }
            },
            _count: {
                select: {
                    LibraryBook: true
                }
            }
        }
    });

    // Подсчет доступного количества книг
    let totalAvailable = 0;
    books.forEach(book => {
        book.LibraryBook.forEach(libraryBook => {
            totalAvailable += libraryBook.amountAvailable;
        });
    });

    return {
        books,
        totalAvailable
    };
};