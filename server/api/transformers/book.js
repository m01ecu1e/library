
export const bookTransformer = (book) => {
    // console.log('bookTransformer')

    return {
        id: book.id,
        title: book.title,
        author: book.author.name,
        publisher: book.publisher.name,
        year: book.year,
        info: book.info,
        isbn: book.ISBN,
        coverImage: book.coverImage,
        libraryBook: book.libraryBook,
        libraryBookCount: book._count.LibraryBook,
    }
}