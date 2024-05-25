/*
  Warnings:

  - You are about to drop the column `Received` on the `BookedBooks` table. All the data in the column will be lost.
  - Added the required column `received` to the `BookedBooks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookedBooks" DROP COLUMN "Received",
ADD COLUMN     "received" BOOLEAN NOT NULL;
