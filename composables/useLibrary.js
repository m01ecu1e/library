export default () => {
  const loading = ref(false)
  const error = ref(null)

  const fetchLibs = async (params = {}) => {
    if (loading.value) return

    loading.value = true
    error.value = null

    try {
      const response = await useFetchApi('/api/library/', {
        method: 'GET',
        params
      })
      return {
        libraries: response
      }
    }
    catch (err) {
      error.value = err.message
    }
    finally {
      loading.value = false
    }
  }

  return {
    fetchLibs,
    loading,
    error
  }
}