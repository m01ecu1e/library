export default () => {
  const loading = ref(false)
  const error = ref(null)

  const fetchBooks = async (params = {}) => {
    if (loading.value) return

    loading.value = true
    error.value = null

    try {
      const response = await useFetchApi('/api/LibraryBook/', {
        method: 'GET',
        params
      })
      return response.books
    }
    catch (err) {
      error.value = err.message
    }
    finally {
      loading.value = false
    }
  }

  return {
    fetchBooks,
    loading,
    error
  }
}