import {prisma} from ".";

export const createAuthor = (authorData) => {
    return prisma.authors.create({
        data: authorData,
    })
}
