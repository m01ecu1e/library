
export const libraryBookTransformer = (book) => {
    console.log('bookTransformer')
    //const author = await getAuthorById(book.authorId)

    return {
        title: book.book.title,
        author: book.book.author.name,
        publisher: book.book.publisher.name,
        library: book.library.name
    }
}