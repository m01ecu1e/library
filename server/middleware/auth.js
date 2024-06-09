import UrlPattern from "url-pattern"
import { decodeAccessToken } from "../utils/jwt.js"
import { sendError } from "h3"
import { getUserById } from "../db/users.js"

export default defineEventHandler(async (event) => {
    const endpoints = [
        '/api/auth/user',
        '/api/bookedBooks'
    ]
    console.log('auth New request: ' + getRequestURL(event))
    
    const isHandledByThisMiddleware = endpoints.some(endopoint => {
        const pattern = new UrlPattern(endopoint)

        return pattern.match(event.path)
    })

    if (!isHandledByThisMiddleware) {
        console.log("not handled by this middleware")
        return
    }

    const token = event.node.req.headers['authorization']?.split(' ')[1]

    const decoded = decodeAccessToken(token)

    console.log("token:",token)

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

        console.log("middleware auth success")

    } catch (error) {
        return
    }

})