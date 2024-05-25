import {prisma} from ".";

export const createAuthor = (authorData) => {
    return prisma.authors.create({
        data: authorData,
    })
}

export const getAuthors = (params = {}) => {
    return prisma.authors.findMany({
        ...params
    })
}