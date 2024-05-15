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
      console.log("fetchBooks", response.books, response.total)
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

  return {
    fetchBooks,
    loading,
    error,
    getBookById,
  }
}