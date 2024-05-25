import {prisma} from ".";

export const createPublisher = (publisherData) => {
    return prisma.publishers.create({
        data: publisherData,
    })
}

export const getPublishers = (params = {}) => {
    return prisma.publishers.findMany({
        ...params
    })
}