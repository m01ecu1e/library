export const userTransformer = (user) => {
  console.log('userTransformer')
  return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      admin: user.admin
  }
}