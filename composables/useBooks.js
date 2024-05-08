export default () => {

    const getHomeBooks = (params = {}) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi('/api/books/books', {
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
        getHomeBooks
    }
}