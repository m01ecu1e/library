import {sendError} from "h3"
import { createUser } from "~/server/db/users"
import { userTransformer } from "../transformers/user"

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const{ firstName, lastName, email, password, repeatPassword } = body

    if( !email || !password || !repeatPassword || !firstName || !lastName) {
        return sendError(event, createError({statusCode: 400, 
        statusMessage: 'Invalid params'}))
    }

    if(password !== repeatPassword) {
        return sendError(event, createError({statusCode: 400, 
        statusMessage: 'Password do not match'}))
    }

    const userData = {
        firstName,
        lastName,
        email,
        password
    }

    const user = await createUser(userData)

    return {
        body: userTransformer(user)
    }
  })
