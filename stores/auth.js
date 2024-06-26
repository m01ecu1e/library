import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore('auth', () => {
  const authToken = ref(null)
  const authUser = ref(null)
  const authLoading = ref(true)

  function setToken(newToken) {
    authToken.value = newToken
  }

  function setUser(newUser) {
    authUser.value = newUser
  }

  function setIsAuthLoading(value) {
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
        await initAuth()
        //console.log(data)

        resolve(data)
      } catch (error) {
        console.log("err:",error)
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
        console.log("storeGetUser")
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const reRefreshAccessToken = () => {
    console.log("reRefreshAccessToken")
    if (!authToken.value) {
      console.log("returned reRefreshAccessToken")
      return
    }

    const jwt = jwtDecode(authToken.value)
    const newRefreshTime = (jwt.exp * 1000) - Date.now() - 60000
    console.log("jwt:", jwt)
    console.log("newRefreshTime:", newRefreshTime)
    console.log("reRefreshAccessToken")
    setTimeout(async () => {
      await refreshToken()
      reRefreshAccessToken()
      console.log("reRefreshAccessToken!!!!!!!!!!!!!")
    }, newRefreshTime);
  }

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setIsAuthLoading(true)
      try {
        console.log("initAuth")
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
    authToken,
    authUser,
    authLoading,
    setToken,
    setUser,
    setIsAuthLoading,
    login,
    register,
    refreshToken,
    getUser,
    reRefreshAccessToken,
    initAuth,
    logout
  }
},
{
  persist: 
  {
    storage: persistedState.cookiesWithOptions({
      sameSite: 'strict',
      secure: true,
      encode: true,
    }),
  },
}
)