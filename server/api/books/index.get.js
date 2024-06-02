// import { getBooks, getBooksCount } from "~/server/db/book"
// import { bookTransformer } from "../transformers/book"

// export default defineEventHandler(async (event) => {

//     const { query, skip, take } = getQuery(event)

//     if (query) {
//         let prismaQuery = {
//             include: {
//                 author: true,
//                 publisher: true,
//                 _count: {
//                     select: {
//                         LibraryBook: true
//                     }
//                 }
//             },
//             skip: +skip,
//             take: +take,
//             where: {
//                 OR: [
//                     {
//                         author: {
//                             name: {
//                                 search: query.trim().split(" ").join(" | ")
//                             }
//                         }
//                     },
//                     {
//                         title: {
//                             search: query.trim().split(" ").join(" | ")
//                         }
//                     },
//                     {
//                         publisher: {
//                             name: {
//                                 search: query.trim().split(" ").join(" | ")
//                             }
//                         }
//                     }
//                 ]
//             }
//         }
//         const books = []


//         books[0] = await getBooks(prismaQuery)
//         books[1] = await getBooksCount({
//             where: prismaQuery.where
//         });

//         return {
//             books: books[0].map(bookTransformer),
//             total: books[1]
//         }
//     }
// })
import { getBooks, getBooksCount } from "~/server/db/book";
import { bookTransformer } from "../transformers/book";

export default defineEventHandler(async (event) => {
    const { query, skip, take } = getQuery(event);

    if (query) {
        const searchTerms = query.trim().split(" ");

        // Функция для проверки наличия результатов по термину
        const checkTermResults = async (term) => {
            const condition = {
                OR: [
                    {
                        author: {
                            name: {
                                contains: term,
                                mode: 'insensitive'
                            }
                        }
                    },
                    {
                        title: {
                            contains: term,
                            mode: 'insensitive'
                        }
                    },
                    {
                        publisher: {
                            name: {
                                contains: term,
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

        // Если нет валидных терминов, возвращаем пустой результат
        if (validTerms.length === 0) {
            return {
                books: [],
                total: 0
            };
        }

        // Создаем условия для валидных терминов
        const searchConditions = validTerms.map((term) => ({
            OR: [
                {
                    author: {
                        name: {
                            contains: term,
                            mode: 'insensitive'
                        }
                    }
                },
                {
                    title: {
                        contains: term,
                        mode: 'insensitive'
                    }
                },
                {
                    publisher: {
                        name: {
                            contains: term,
                            mode: 'insensitive'
                        }
                    }
                }
            ]
        }));

        let prismaQuery = {
            include: {
                author: true,
                publisher: true,
                _count: {
                    select: {
                        LibraryBook: true
                    }
                }
            },
            skip: +skip,
            take: +take,
            where: {
                AND: searchConditions
            }
        };

        const books = [];

        books[0] = await getBooks(prismaQuery);
        books[1] = await getBooksCount({
            where: prismaQuery.where
        });

        return {
            books: books[0].map(bookTransformer),
            total: books[1]
        };
    }
});