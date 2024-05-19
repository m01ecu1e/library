import { prisma } from ".";
import bcrypt from "bcrypt"

export const createUser = (userData) => {

    const finalUserData = {
        ...userData,
        password: bcrypt.hashSync(userData.password, 10)
    }

    return prisma.users.create({
        data: finalUserData
    })
}

export const getUserByEmail = (email) => {
    return prisma.users.findUnique({
        where: {
            email
        }
    })
}

export const getUserById = (userId) => {
    return prisma.users.findUnique({
        where: {
            id: userId
        }
    })
}