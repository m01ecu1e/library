import { getRefreshTokenByToken } from "~/server/db/refreshTokens";
import { getUserById } from "~/server/db/users";
import { decodeRefreshToken, generateTokens } from "../../utils/jwt";

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event)

  const refreshToken = cookies?.refresh_token

  if (!refreshToken) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Refresh token is invalid"

    }))
  }

  const rToken = await getRefreshTokenByToken(refreshToken)

  if (!refreshToken) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Refresh token is invalid"

    }))
  }

  const token = decodeRefreshToken(refreshToken)

  try {
    const user = await getUserById(token.userId)

    const { accessToken } = generateTokens(user)
    return {
      access_token: accessToken
    }
  } catch (error) {
      return sendError(event, createError({
        statusCode: 500,
        statusMessage: "Something went wrong"
  
      }))
    }
  

})
