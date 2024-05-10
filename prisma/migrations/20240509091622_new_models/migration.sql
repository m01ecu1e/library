/*
  Warnings:

  - You are about to drop the column `author` on the `Books` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Books` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Users_username_key";

-- AlterTable
ALTER TABLE "Books" DROP COLUMN "author",
DROP COLUMN "image",
ADD COLUMN     "authorId" VARCHAR(36),
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "publisherId" VARCHAR(36);

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "profileImage",
DROP COLUMN "username";

-- CreateTable
CREATE TABLE "LibraryBook" (
    "id" VARCHAR(36) NOT NULL,
    "bookId" TEXT NOT NULL,
    "libraryId" TEXT NOT NULL,

    CONSTRAINT "LibraryBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Authors" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "info" TEXT,

    CONSTRAINT "Authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publishers" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "info" TEXT,

    CONSTRAINT "Publishers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Libraries" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "info" TEXT,
    "Address" TEXT NOT NULL,

    CONSTRAINT "Libraries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LibraryBook_bookId_key" ON "LibraryBook"("bookId");

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Authors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publishers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryBook" ADD CONSTRAINT "LibraryBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryBook" ADD CONSTRAINT "LibraryBook_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Libraries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
