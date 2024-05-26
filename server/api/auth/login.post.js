import { getUserByEmail } from "~/server/db/users"
import bcrypt from "bcrypt"
import { generateTokens, sendRefreshToken } from "~/server/utils/jwt.js"
import { createRefreshToken } from "~/server/db/refreshTokens"
import { userTransformer } from "~/server/api/transformers/user"
import { sendError } from "h3"

export default defineEventHandler(async (event) => {
  
  const body = await readBody(event)

  const {email, password} = body

  if (!email || !password) {
    return sendError(event, createError({
      statusCode:400,
      statusMessage: 'Invalid params'
    }))
  }

  //Is the user registered

  const user = await getUserByEmail(email)

  if(!user) {
    // return sendError(event, createError({
    //   statusCode:400,
    //   statusMessage: 'There is no user with this email'
    // }))
    throw createError({
      statusCode:400,
      statusMessage:'Username or password is invalid',
      message:'Пользователь не зарегистрирован'
    })
  }

  // Compare password

  const doesThePasswordMatch = await bcrypt.compare(password, user.password)
    
  if(!doesThePasswordMatch) {
      // return sendError(event, createError({
      //     statusCode: 400,
      //     message: 'Username or password is invalid',
      // }))
      throw createError({
        statusCode:400,
        statusMessage:'Username or password is invalid',
        message:'Неверный пароль или email'
      })
  }

  //Generate tokens
  //Access token
  //Refresh token
  const {accessToken, refreshToken} = generateTokens(user)

  // Save it inside db
  await createRefreshToken({
    token: refreshToken,
    userId: user.id
  })

  // Add HTTP only cookies
  sendRefreshToken(event, refreshToken)

  return {
    accessToken: accessToken,
    user: userTransformer(user)
  }

})
