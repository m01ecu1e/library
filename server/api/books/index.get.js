import { getBooks, getBooksCount, getTotalAvailableBooks } from "~/server/db/book";
import { bookTransformer } from "../transformers/book";

export default defineEventHandler(async (event) => {
    const { query, skip, take, publisherId, inStock, libraryId, minYear, maxYear } = getQuery(event);

    const searchConditions = [];

    if (query) {
        const searchTerms = query.trim().split(" ");

        // Функция для проверки наличия результатов по термину
        const checkTermResults = async (term) => {
            const condition = {
                OR: [
                    {
                        author: {
                            name: {
                                search: term,
                                mode: 'insensitive'
                            }
                        }
                    },
                    {
                        title: {
                            search: term,
                            mode: 'insensitive'
                        }
                    },
                    {
                        publisher: {
                            name: {
                                search: term,
                                mode: 'insensitive'
                            }
                        }
                    }
                ]
            };

            const count = await getBooksCount({ where: condition });
            return count > 0;
        };

        // Проверяем каждый термин и оставляем только те, которые дают результаты
        const validTerms = [];
        for (const term of searchTerms) {
            if (await checkTermResults(term)) {
                validTerms.push(term);
            }
        }

        if (validTerms.length === 0) {
            return {
                books: [],
                total: 0
            };
        }

        // Создаем условия для валидных терминов
        if (validTerms.length > 0) {
            searchConditions.push({
                AND: validTerms.map((term) => ({
                    OR: [
                        {
                            author: {
                                name: {
                                    search: term,
                                    mode: 'insensitive'
                                }
                            }
                        },
                        {
                            title: {
                                search: term,
                                mode: 'insensitive'
                            }
                        },
                        {
                            publisher: {
                                name: {
                                    search: term,
                                    mode: 'insensitive'
                                }
                            }
                        }
                    ]
                }))
            });
        }
    }


    console.log("Backend inStock:", inStock)
    console.log("Backend libraryId:", libraryId)
    console.log("ALL:", query, skip, take, publisherId, inStock, libraryId, minYear, maxYear)

    // Добавляем фильтр по наличию книг
    if (inStock === 'true') {
        searchConditions.push({
            LibraryBook: {
                some: {
                    amountAvailable: {
                        gt: 0
                    }
                }
            }
        });
    }

    // Добавляем фильтр по библиотеке
    if (libraryId) {
        searchConditions.push({
            LibraryBook: {
                some: {
                    libraryId: libraryId
                }
            }
        });
    }
    // Добавляем фильтр по издателю
    if (publisherId) {
        searchConditions.push({
            publisher: {
                id: publisherId,
            }
        });
    }

    if (minYear || maxYear) {
        const yearCondition = {};
        if (minYear) {
            yearCondition.gte = minYear;
        }
        if (maxYear) {
            yearCondition.lte = maxYear;
        }
        searchConditions.push({
            year: yearCondition
        });
    }

    let prismaQuery = {
        include: {
            author: true,
            publisher: true,
            LibraryBook: true, // Для фильтрации по количеству доступных книг
            _count: {
                select: {
                    LibraryBook: true
                }
            }
        },
        skip: +skip,
        take: +take,
        where: searchConditions.length > 0 ? { AND: searchConditions } : {}
    };

    const books = await getBooks(prismaQuery);
    const total = await getBooksCount({
        where: prismaQuery.where
    });

const totalAvailable = await getTotalAvailableBooks(prismaQuery.where);

    return {
        books: books.map(bookTransformer),
        total: total,
        totalAvailable: totalAvailable
    };
});