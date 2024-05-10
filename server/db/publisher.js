import {prisma} from ".";

export const createPublisher = (publisherData) => {
    return prisma.publishers.create({
        data: publisherData,
    })
}