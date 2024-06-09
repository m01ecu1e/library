-- CreateIndex
CREATE INDEX "Books_authorId_publisherId_title_year_idx" ON "Books"("authorId", "publisherId", "title", "year");

-- CreateIndex
CREATE INDEX "LibraryBook_amountAvailable_idx" ON "LibraryBook"("amountAvailable");
