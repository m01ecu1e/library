/*
  Warnings:

  - Added the required column `updated_at` to the `LibraryBook` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Books" DROP CONSTRAINT "Books_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Books" DROP CONSTRAINT "Books_publisherId_fkey";

-- AlterTable
ALTER TABLE "Books" ALTER COLUMN "authorId" SET DATA TYPE TEXT,
ALTER COLUMN "publisherId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "LibraryBook" ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Authors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publishers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
