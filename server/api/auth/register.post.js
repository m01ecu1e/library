import { sendError, createError } from "h3"
import { createUser, getUserByEmail } from "~/server/db/users"
import { userTransformer } from "../transformers/user"

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const { firstName, lastName, email, password, repeatPassword, admin } = body

    if (!email || !password || !repeatPassword || !firstName || !lastName) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }

    if (password !== repeatPassword) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Passwords do not match' }))
    }

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'User already exists' }))
    }

    const userData = {
        firstName,
        lastName,
        email,
        password,
        admin
    }
    const user = await createUser(userData)
    return {
        body: userTransformer(user)
    }
})