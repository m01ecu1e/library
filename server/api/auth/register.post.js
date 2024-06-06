import { sendError, createError } from "h3"
import { createUser, getUserByEmail } from "~/server/db/users"
import { userTransformer } from "../transformers/user"
import nodemailer from 'nodemailer'
import crypto from 'crypto'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const { firstName, lastName, email, password, repeatPassword, admin } = body

    if (!email || !password || !repeatPassword || !firstName || !lastName) {
        //return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
        throw createError({
            statusCode:400,
            statusMessage:'Invalid params',
            message:'Введите все данные'
          })
    }

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
        //return sendError(event, createError({ statusCode: 400, statusMessage: 'User already exists' }))
        throw createError({
            statusCode:400,
            statusMessage:'User already exists',
            message:'Пользователь уже зарегистрирован'
          })
    }

    if (password !== repeatPassword) {
        //return sendError(event, createError({ statusCode: 400, statusMessage: 'Passwords do not match' }))
        throw createError({
            statusCode:400,
            statusMessage:'Passwords do not match',
            message:'Пароли не совпадают'
          })
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