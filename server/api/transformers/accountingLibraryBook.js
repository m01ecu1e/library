export const accountingLibraryBookTransformer = (book) => {

  return {
    bookId: book.book.id,
    title: book.book.title,
    author: book.book.author.name,
    publisher: book.book.publisher.name,
    library: book.library.name,
    bookedBooks: book.bookedBook.map(booked => ({
      user: {
        firstName: booked.user.firstName,
        lastName: booked.user.lastName,
        email: booked.user.email,
      },
      received: booked.received,
      dueDate: booked.due_date,
      bookedDueDate: booked.booked_due_date,
    })),
    amount: book.amount,
    amountAvailable: book.amountAvailable,
  }
}
