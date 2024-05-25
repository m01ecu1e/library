/*
  Warnings:

  - Made the column `amount` on table `LibraryBook` required. This step will fail if there are existing NULL values in that column.
  - Made the column `amountAvailable` on table `LibraryBook` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "LibraryBook" ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "amountAvailable" SET NOT NULL;

-- CreateTable
CREATE TABLE "BookedBooks" (
    "id" VARCHAR(36) NOT NULL,
    "LibraryBookId" TEXT NOT NULL,
    "UserId" VARCHAR(36) NOT NULL,
    "Received" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookedBooks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookedBooks_LibraryBookId_key" ON "BookedBooks"("LibraryBookId");

-- AddForeignKey
ALTER TABLE "BookedBooks" ADD CONSTRAINT "BookedBooks_LibraryBookId_fkey" FOREIGN KEY ("LibraryBookId") REFERENCES "LibraryBook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookedBooks" ADD CONSTRAINT "BookedBooks_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
