export default (url, options = {}) => {

    // const { useAuthToken } = useAuth()
    const { authToken } = useAuthStore()

    // console.log(useAuthToken())
    console.log("authToken:",authToken)

    return $fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${authToken}`
        }
    })
}