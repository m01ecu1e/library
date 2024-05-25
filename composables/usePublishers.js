export default () => {
  const postPublisher = ({ name, info }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/publishers', {
          method: 'POST',
          body: {
            name,
            info
          }
        })

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
}
return {
  postPublisher
}
}
