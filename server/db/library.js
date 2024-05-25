import { prisma } from ".";

export const getLibraries = () => {
    return prisma.libraries.findMany()
}

export const createLibrary = (libData) => {
    return prisma.libraries.create({
        data: libData
    })
}

export const getLibraryById = (libData) => {
    return prisma.libraries.findUnique({
        where: {
            id: libData
        }
    })
}