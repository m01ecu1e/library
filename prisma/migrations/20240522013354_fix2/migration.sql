/*
  Warnings:

  - You are about to drop the column `LibraryBookId` on the `BookedBooks` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `BookedBooks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[libraryBookId]` on the table `BookedBooks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `libraryBookId` to the `BookedBooks` table without a default value. This is not possible if the table is not empty.
  - The required column `userId` was added to the `BookedBooks` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "BookedBooks" DROP CONSTRAINT "BookedBooks_LibraryBookId_fkey";

-- DropForeignKey
ALTER TABLE "BookedBooks" DROP CONSTRAINT "BookedBooks_UserId_fkey";

-- DropIndex
DROP INDEX "BookedBooks_LibraryBookId_key";

-- AlterTable
ALTER TABLE "BookedBooks" DROP COLUMN "LibraryBookId",
DROP COLUMN "UserId",
ADD COLUMN     "libraryBookId" TEXT NOT NULL,
ADD COLUMN     "userId" VARCHAR(36) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BookedBooks_libraryBookId_key" ON "BookedBooks"("libraryBookId");

-- AddForeignKey
ALTER TABLE "BookedBooks" ADD CONSTRAINT "BookedBooks_libraryBookId_fkey" FOREIGN KEY ("libraryBookId") REFERENCES "LibraryBook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookedBooks" ADD CONSTRAINT "BookedBooks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
