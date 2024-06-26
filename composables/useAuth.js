import { jwtDecode } from "jwt-decode";

export default () => {
  const useAuthToken = () => useState('auth_token')
  const useAuthUser = () => useState('auth_user')
  const useAuthLoading = () => useState('auth_loading', () => true)

  const setToken = (newToken) => {
    const authToken = useAuthToken()
    authToken.value = newToken
  }
  const setUser = (newUser) => {
    const authUser = useAuthUser()
    authUser.value = newUser
  }

  const setIsAuthLoading = (value) => {
    const authLoading = useAuthLoading()
    authLoading.value = value
  }

  const login = ({ email, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/login', {
          method: 'POST',
          body: {
            email,
            password
          }
        })
        setToken(data.access_token)
        setUser(data.user)

        //console.log(data)

        resolve(true)
      } catch (error) {
        // console.log("err:", error.data)
        reject(error.data)
      }
    })
  }

  const register = ({ firstName, lastName, email, password, repeatPassword, admin }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/register', {
          method: 'POST',
          body: {
            firstName,
            lastName,
            email,
            password,
            repeatPassword,
            admin
          }
        })
        resolve(data)
      } catch (error) {
        reject(error.data)
      }
    })
  }

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/refresh')

        setToken(data.access_token)

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi('/api/auth/user')

        setUser(data.user)

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const reRefreshAccessToken = () => {
    const authToken = useAuthToken()

    if (!authToken.value) {
      return
    }

    const jwt = jwtDecode(authToken.value)

    console.log(jwt)
    const newRefreshTime = jwt.exp - 60000
    setTimeout(async () => {
      await refreshToken()
      reRefreshAccessToken()
    }, newRefreshTime);
  }

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setIsAuthLoading(true)
      try {
        await refreshToken()
        await getUser()

        reRefreshAccessToken()

        resolve(true)
      } catch (error) {
        reject(error)
      } finally {
        setIsAuthLoading(false)
      }
    })
  }

  const logout = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await useFetchApi('api/auth/logout', {
          method: 'POST'
        })

        setToken(null)
        setUser(null)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  return {

  }
}