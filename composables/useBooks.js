export default () => {
  const loading = ref(false)
  const error = ref(null)

  const fetchBooks = async (params = {}) => {
    if (loading.value) return

    loading.value = true
    error.value = null

    try {
      const response = await useFetchApi('/api/books/', {
        method: 'GET',
        params
      })
      return {
        books: response.books,
        total: response.total
      }
    }
    catch (err) {
      error.value = err.message
    }
    finally {
      loading.value = false
    }
  }

  const fetchLibraryBooks = async (params = {}) => {
    if (loading.value) return

    loading.value = true
    error.value = null

    try {
      const response = await useFetchApi('/api/libraryBook/', {
        method: 'GET',
        params
      })
      return {
        books: response.books,
        total: response.total
      }
    }
    catch (err) {
      error.value = err.message
    }
    finally {
      loading.value = false
    }
  }

  const fetchBookedBooks = async (params = {}) => {
    if (loading.value) return

    loading.value = true
    error.value = null

    try {
      const response = await useFetchApi('/api/bookedBooks/', {
        method: 'GET',
        params
      })
      return {
        bookedBooks: response
      }
    }
    catch (err) {
      error.value = err.message
    }
    finally {
      loading.value = false
    }
  }


  const getBookById = (bookId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi(`/api/books/${bookId}`)

        resolve(response)

      } catch (error) {
        reject(error)
      }
    })
  }

  const postBook = ({ publisherId, authorId, title }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/books', {
          method: 'POST',
          body: {
            publisherId,
            authorId,
            title
          }
        })

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const postLibraryBook = ({ bookId, libraryId, amount, amountAvailable }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/libraryBook', {
          method: 'POST',
          body: {
            bookId,
            libraryId,
            amount,
            amountAvailable
          }
        })
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const postBookedBook = ({ libraryBookId, userId }) => {
    return new Promise(async (resolve, reject) => {
      try {
        await $fetch('/api/bookedBooks', {
          method: 'POST',
          body: {
            libraryBookId,
            userId
          }
        })
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const giveOrder = ({ orderId }) => {
    return new Promise(async (resolve, reject) => {
      try {
        await $fetch('/api/bookedBooks', {
          method: 'PUT',
          body: {
            orderId
          }
        })

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const takeOrder = ({ orderId }) => {
    return new Promise(async (resolve, reject) => {
      try {
        await $fetch('/api/bookedBooks', {
          method: 'DELETE',
          body: {
            orderId
          }
        })

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const putLibraryBook = ({ libraryBookId, value }) => {
    return new Promise(async (resolve, reject) => {
      try {
        await $fetch('/api/libraryBook', {
          method: 'PUT',
          body: {
            libraryBookId,
            value
          }
        })

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
  

  return {
    fetchBooks,
    loading,
    error,
    getBookById,
    fetchLibraryBooks,
    postBook,
    postLibraryBook,
    postBookedBook,
    fetchBookedBooks,
    giveOrder,
    putLibraryBook,
    takeOrder
  }
}