export default () => {
  const loading = ref(false)
  const error = ref(null)

  const fetchBooks = async (params = {}) => {
    if (loading.value) return

    loading.value = true
    error.value = null

    try {
      const response = await useFetchApi('/api/books', {
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

  const fetchLibraryBooks = async () => {
    if (loading.value) return

    loading.value = true
    error.value = null

    try {
      const response = await $fetch('/api/libraryBook/getLibBooks', {
        method: 'GET',
        // params
      })
      return {
        books: response.books
      }
    }
    catch (err) {
      error.value = err.message
    }
    finally {
      loading.value = false
    }
  }

  const searchLibraryBooks = async (params = {}) => {
    if (loading.value) return

    loading.value = true
    error.value = null

    try {
      const response = await useFetchApi('/api/libraryBook/searchLibBooks', {
        method: 'GET',
        params
      })
      return {
        libraryBooks: response
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
      const response = await useFetchApi('/api/bookedBooks', {
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

  const getOrderById = (orderId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi(`/api/bookedBooks/${orderId}`)

        resolve(response)

      } catch (error) {
        reject(error.data)
      }
    })
  }


  const getBookById = (bookId) => {
    loading.value = true
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi(`/api/books/${bookId}`)

        resolve(response)

      } catch (error) {
        reject(error.data)
      } finally {
        loading.value = false
      }
    })
  }

  const postBook = ({ publisherId, authorId, title, year, info, ISBN, coverImage }) => {
    return new Promise(async (resolve, reject) => {
      try {
        await $fetch('/api/books', {
          method: 'POST',
          body: {
            publisherId,
            authorId,
            title,
            year,
            info,
            ISBN,
            coverImage
          }
        })
        resolve(true)
      } catch (error) {
        reject(error.data)
      }
    })
  }

  const postLibraryBook = ({ bookId, libraryId, amount, amountAvailable }) => {
    return new Promise(async (resolve, reject) => {
      try {
        await $fetch('/api/libraryBook/postLibBook', {
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
        reject(error.data)
      }
    })
  }

  const postBookedBook = ({ libraryBookId, userId }) => {
    return new Promise(async (resolve, reject) => {
      try {
        await useFetchApi('/api/bookedBooks', {
          method: 'POST',
          body: {
            libraryBookId,
            userId
          }
        })
        resolve(true)
      } catch (error) {
        reject(error.data)
      }
    })
  }

  const giveOrder = ({ orderId }) => {
    return new Promise(async (resolve, reject) => {
      try {
        await useFetchApi('/api/bookedBooks', {
          method: 'PUT',
          body: {
            orderId
          }
        })

        resolve(true)
      } catch (error) {
        reject(error.data)
      }
    })
  }

  const takeOrder = ({ orderId }) => {
    return new Promise(async (resolve, reject) => {
      try {
        await useFetchApi('/api/bookedBooks', {
          method: 'DELETE',
          body: {
            orderId
          }
        })

        resolve(true)
      } catch (error) {
        reject(error.data)
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
        reject(error.data)
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
    takeOrder,
    getOrderById,
    searchLibraryBooks
  }
}