export default () => {
  const postAuthor = ({ name, info }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/authors', {
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
  postAuthor
}
}
