# Details

Date : 2024-05-29 16:48:34

Directory e:\\WebProjects\\library

Total : 101 files,  16787 codes, 278 comments, 738 blanks, all 17803 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [README.md](/README.md) | Markdown | 50 | 0 | 26 | 76 |
| [app.config.ts](/app.config.ts) | TypeScript | 6 | 0 | 0 | 6 |
| [app.vue](/app.vue) | vue | 18 | 0 | 7 | 25 |
| [components/AuthForm.vue](/components/AuthForm.vue) | vue | 66 | 0 | 17 | 83 |
| [components/BookCard.vue](/components/BookCard.vue) | vue | 47 | 4 | 6 | 57 |
| [components/CustomMarker.vue](/components/CustomMarker.vue) | vue | 48 | 2 | 8 | 58 |
| [components/Header/Index.vue](/components/Header/Index.vue) | vue | 38 | 0 | 5 | 43 |
| [components/Header/Tab.vue](/components/Header/Tab.vue) | vue | 20 | 0 | 2 | 22 |
| [components/HomePageSearchBar.vue](/components/HomePageSearchBar.vue) | vue | 40 | 0 | 7 | 47 |
| [components/LatestBooks.vue](/components/LatestBooks.vue) | vue | 16 | 0 | 3 | 19 |
| [components/LibraryBookCard.vue](/components/LibraryBookCard.vue) | vue | 33 | 0 | 9 | 42 |
| [components/RegisterForm.vue](/components/RegisterForm.vue) | vue | 104 | 0 | 13 | 117 |
| [components/SearchedBooks.vue](/components/SearchedBooks.vue) | vue | 21 | 2 | 5 | 28 |
| [components/YandexMap.vue](/components/YandexMap.vue) | vue | 8 | 0 | 5 | 13 |
| [components/admin/AddAuthor.vue](/components/admin/AddAuthor.vue) | vue | 62 | 0 | 6 | 68 |
| [components/admin/AddBook.vue](/components/admin/AddBook.vue) | vue | 207 | 8 | 19 | 234 |
| [components/admin/AddLibraryBook.vue](/components/admin/AddLibraryBook.vue) | vue | 151 | 11 | 26 | 188 |
| [components/admin/AddPublisher.vue](/components/admin/AddPublisher.vue) | vue | 59 | 0 | 8 | 67 |
| [components/admin/GiveBook.vue](/components/admin/GiveBook.vue) | vue | 78 | 21 | 15 | 114 |
| [composables/useAuth.js](/composables/useAuth.js) | JavaScript | 129 | 2 | 23 | 154 |
| [composables/useAuthors.js](/composables/useAuthors.js) | JavaScript | 21 | 0 | 2 | 23 |
| [composables/useBooks.js](/composables/useBooks.js) | JavaScript | 200 | 1 | 27 | 228 |
| [composables/useFetchApi.js](/composables/useFetchApi.js) | JavaScript | 10 | 0 | 2 | 12 |
| [composables/useLibrary.js](/composables/useLibrary.js) | JavaScript | 29 | 0 | 4 | 33 |
| [composables/usePublishers.js](/composables/usePublishers.js) | JavaScript | 21 | 0 | 2 | 23 |
| [nuxt.config.ts](/nuxt.config.ts) | TypeScript | 26 | 1 | 0 | 27 |
| [package-lock.json](/package-lock.json) | JSON | 13,335 | 0 | 1 | 13,336 |
| [package.json](/package.json) | JSON | 41 | 0 | 1 | 42 |
| [pages/Account/index.vue](/pages/Account/index.vue) | vue | 163 | 1 | 32 | 196 |
| [pages/AuthPage.vue](/pages/AuthPage.vue) | vue | 9 | 0 | 4 | 13 |
| [pages/Book/[id].vue](/pages/Book/%5Bid%5D.vue) | vue | 161 | 17 | 20 | 198 |
| [pages/Libraries.vue](/pages/Libraries.vue) | vue | 39 | 0 | 12 | 51 |
| [pages/Register.vue](/pages/Register.vue) | vue | 9 | 0 | 3 | 12 |
| [pages/Search.vue](/pages/Search.vue) | vue | 43 | 2 | 15 | 60 |
| [pages/admin/Order/[id].vue](/pages/admin/Order/%5Bid%5D.vue) | vue | 123 | 4 | 18 | 145 |
| [pages/admin/index.vue](/pages/admin/index.vue) | vue | 74 | 0 | 11 | 85 |
| [pages/index.vue](/pages/index.vue) | vue | 21 | 2 | 10 | 33 |
| [prisma/migrations/20240507164100_add_model_users/migration.sql](/prisma/migrations/20240507164100_add_model_users/migration.sql) | SQL | 12 | 2 | 3 | 17 |
| [prisma/migrations/20240507170922_add_books_model/migration.sql](/prisma/migrations/20240507170922_add_books_model/migration.sql) | SQL | 9 | 1 | 2 | 12 |
| [prisma/migrations/20240509091622_new_models/migration.sql](/prisma/migrations/20240509091622_new_models/migration.sql) | SQL | 38 | 21 | 16 | 75 |
| [prisma/migrations/20240509135435_lb_model_update/migration.sql](/prisma/migrations/20240509135435_lb_model_update/migration.sql) | SQL | 8 | 12 | 6 | 26 |
| [prisma/migrations/20240512203909_books_library_books_relation_changed_to_one_to_many/migration.sql](/prisma/migrations/20240512203909_books_library_books_relation_changed_to_one_to_many/migration.sql) | SQL | 1 | 1 | 1 | 3 |
| [prisma/migrations/20240514015152_lb_and_books_new_fields/migration.sql](/prisma/migrations/20240514015152_lb_and_books_new_fields/migration.sql) | SQL | 6 | 2 | 2 | 10 |
| [prisma/migrations/20240519021657_user_model_changed/migration.sql](/prisma/migrations/20240519021657_user_model_changed/migration.sql) | SQL | 3 | 9 | 1 | 13 |
| [prisma/migrations/20240519022653_users_model_changed/migration.sql](/prisma/migrations/20240519022653_users_model_changed/migration.sql) | SQL | 1 | 7 | 1 | 9 |
| [prisma/migrations/20240519023956_refresh_token_model/migration.sql](/prisma/migrations/20240519023956_refresh_token_model/migration.sql) | SQL | 10 | 3 | 4 | 17 |
| [prisma/migrations/20240519223953_users_admin_field_add/migration.sql](/prisma/migrations/20240519223953_users_admin_field_add/migration.sql) | SQL | 1 | 7 | 1 | 9 |
| [prisma/migrations/20240522004008_booked_books/migration.sql](/prisma/migrations/20240522004008_booked_books/migration.sql) | SQL | 14 | 12 | 6 | 32 |
| [prisma/migrations/20240522012818_fix/migration.sql](/prisma/migrations/20240522012818_fix/migration.sql) | SQL | 2 | 8 | 1 | 11 |
| [prisma/migrations/20240522013354_fix2/migration.sql](/prisma/migrations/20240522013354_fix2/migration.sql) | SQL | 10 | 17 | 7 | 34 |
| [prisma/migrations/20240522014033_fix3/migration.sql](/prisma/migrations/20240522014033_fix3/migration.sql) | SQL | 1 | 1 | 1 | 3 |
| [prisma/migrations/20240522033331_order_code/migration.sql](/prisma/migrations/20240522033331_order_code/migration.sql) | SQL | 1 | 7 | 1 | 9 |
| [prisma/migrations/20240523194125_libs_coords/migration.sql](/prisma/migrations/20240523194125_libs_coords/migration.sql) | SQL | 2 | 8 | 1 | 11 |
| [prisma/migrations/20240528004127_timezones/migration.sql](/prisma/migrations/20240528004127_timezones/migration.sql) | SQL | 2 | 1 | 1 | 4 |
| [prisma/migrations/20240528004655_timestamp/migration.sql](/prisma/migrations/20240528004655_timestamp/migration.sql) | SQL | 2 | 1 | 1 | 4 |
| [prisma/migrations/20240528004722_timestamp/migration.sql](/prisma/migrations/20240528004722_timestamp/migration.sql) | SQL | 2 | 1 | 1 | 4 |
| [prisma/migrations/20240528020935_timestamps_receivedat_returnedat_etc/migration.sql](/prisma/migrations/20240528020935_timestamps_receivedat_returnedat_etc/migration.sql) | SQL | 4 | 1 | 1 | 6 |
| [prisma/migrations/20240528040811_booked_due_date/migration.sql](/prisma/migrations/20240528040811_booked_due_date/migration.sql) | SQL | 3 | 8 | 1 | 12 |
| [prisma/schema.prisma](/prisma/schema.prisma) | Prisma | 91 | 4 | 35 | 130 |
| [server/api/auth/login.post.js](/server/api/auth/login.post.js) | JavaScript | 42 | 11 | 16 | 69 |
| [server/api/auth/logout.post.js](/server/api/auth/logout.post.js) | JavaScript | 14 | 0 | 5 | 19 |
| [server/api/auth/refresh.get.js](/server/api/auth/refresh.get.js) | JavaScript | 33 | 0 | 14 | 47 |
| [server/api/auth/register.post.js](/server/api/auth/register.post.js) | JavaScript | 40 | 3 | 9 | 52 |
| [server/api/auth/user.get.js](/server/api/auth/user.get.js) | JavaScript | 7 | 0 | 3 | 10 |
| [server/api/authors/index.get.js](/server/api/authors/index.get.js) | JavaScript | 27 | 0 | 9 | 36 |
| [server/api/authors/index.post.js](/server/api/authors/index.post.js) | JavaScript | 14 | 0 | 6 | 20 |
| [server/api/bookedBooks/[id].get.js](/server/api/bookedBooks/%5Bid%5D.get.js) | JavaScript | 16 | 0 | 7 | 23 |
| [server/api/bookedBooks/index.delete.js](/server/api/bookedBooks/index.delete.js) | JavaScript | 15 | 1 | 7 | 23 |
| [server/api/bookedBooks/index.get.js](/server/api/bookedBooks/index.get.js) | JavaScript | 49 | 0 | 7 | 56 |
| [server/api/bookedBooks/index.post.js](/server/api/bookedBooks/index.post.js) | JavaScript | 58 | 0 | 13 | 71 |
| [server/api/bookedBooks/index.put.js](/server/api/bookedBooks/index.put.js) | JavaScript | 22 | 0 | 7 | 29 |
| [server/api/books/[id].get.js](/server/api/books/%5Bid%5D.get.js) | JavaScript | 29 | 1 | 8 | 38 |
| [server/api/books/index.get.js](/server/api/books/index.get.js) | JavaScript | 55 | 0 | 6 | 61 |
| [server/api/books/index.post.js](/server/api/books/index.post.js) | JavaScript | 33 | 4 | 10 | 47 |
| [server/api/libraryBook/getLibBooks.get.js](/server/api/libraryBook/getLibBooks.get.js) | JavaScript | 26 | 3 | 8 | 37 |
| [server/api/libraryBook/index.put.js](/server/api/libraryBook/index.put.js) | JavaScript | 26 | 0 | 10 | 36 |
| [server/api/libraryBook/postLibBook.post.js](/server/api/libraryBook/postLibBook.post.js) | JavaScript | 24 | 14 | 11 | 49 |
| [server/api/library/index.get.js](/server/api/library/index.get.js) | JavaScript | 13 | 0 | 5 | 18 |
| [server/api/library/index.post.js](/server/api/library/index.post.js) | JavaScript | 16 | 0 | 7 | 23 |
| [server/api/publishers/index.get.js](/server/api/publishers/index.get.js) | JavaScript | 27 | 0 | 8 | 35 |
| [server/api/publishers/index.post.js](/server/api/publishers/index.post.js) | JavaScript | 13 | 0 | 7 | 20 |
| [server/api/transformers/book.js](/server/api/transformers/book.js) | JavaScript | 14 | 1 | 2 | 17 |
| [server/api/transformers/library.js](/server/api/transformers/library.js) | JavaScript | 14 | 0 | 1 | 15 |
| [server/api/transformers/libraryBook.js](/server/api/transformers/libraryBook.js) | JavaScript | 11 | 1 | 2 | 14 |
| [server/api/transformers/user.js](/server/api/transformers/user.js) | JavaScript | 10 | 0 | 0 | 10 |
| [server/cron/index.js](/server/cron/index.js) | JavaScript | 1 | 0 | 0 | 1 |
| [server/cron/removeExpiredBookings.js](/server/cron/removeExpiredBookings.js) | JavaScript | 35 | 15 | 7 | 57 |
| [server/db/author.js](/server/db/author.js) | JavaScript | 11 | 0 | 2 | 13 |
| [server/db/book.js](/server/db/book.js) | JavaScript | 92 | 9 | 14 | 115 |
| [server/db/booking.js](/server/db/booking.js) | JavaScript | 52 | 0 | 7 | 59 |
| [server/db/index.js](/server/db/index.js) | JavaScript | 4 | 0 | 3 | 7 |
| [server/db/library.js](/server/db/library.js) | JavaScript | 16 | 0 | 3 | 19 |
| [server/db/publisher.js](/server/db/publisher.js) | JavaScript | 11 | 0 | 2 | 13 |
| [server/db/refreshTokens.js](/server/db/refreshTokens.js) | JavaScript | 20 | 0 | 3 | 23 |
| [server/db/users.js](/server/db/users.js) | JavaScript | 25 | 0 | 5 | 30 |
| [server/init.js](/server/init.js) | JavaScript | 1 | 0 | 0 | 1 |
| [server/middleware/auth.js](/server/middleware/auth.js) | JavaScript | 31 | 1 | 13 | 45 |
| [server/tsconfig.json](/server/tsconfig.json) | JSON with Comments | 3 | 0 | 1 | 4 |
| [server/utils/jwt.js](/server/utils/jwt.js) | JavaScript | 43 | 0 | 13 | 56 |
| [tailwind.config.js](/tailwind.config.js) | JavaScript | 42 | 1 | 8 | 51 |
| [tsconfig.json](/tsconfig.json) | JSON with Comments | 3 | 1 | 1 | 5 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)