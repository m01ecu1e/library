
export const bookTransformer = (book) => {
    // console.log('bookTransformer')

    return {
        id: book.id,
        title: book.title,
        //author: book.author.name,
        //publisher: book.publisher.name,
        //libraryBookCount: book.book._count.LibraryBook,
    }
}