export default () => {

    const getBooks = (params = {}) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi('/api/LibraryBook/', {
                    method: 'GET',
                    params
                })
                
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    return {
        getBooks
    }
}