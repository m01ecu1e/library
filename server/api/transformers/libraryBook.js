
export const libraryBookTransformer = (book) => {
    // console.log('libraryBookTransformer')
    //const author = await getAuthorById(book.authorId)

    return {
        bookId:book.book.id,
        title: book.book.title,
        author: book.book.author.name,
        publisher: book.book.publisher.name,
        library: book.library.name,
        coverImage: book.book.coverImage
    }
}