import { userTransformer } from "../transformers/user"
import { decodeAccessToken } from "../utils/jwt.js"
import { sendError } from "h3"
import { getUserById } from "../db/users.js"

export default defineEventHandler(async (event) => {
   
    const token = event.node.req.headers['authorization']?.split(' ')[1]
    // const token = auth

    const decoded = decodeAccessToken(token)

    if (!decoded) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        }))
    }


    try {
        const userId = decoded.userId

        const user = await getUserById(userId)

        event.context.auth = { user }

    } catch (error) {
        return
    }

    console.log('user get')
    return {
        user: userTransformer(event.context.auth?.user)
    }

})