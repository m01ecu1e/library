/*
  Warnings:

  - Added the required column `orderCode` to the `BookedBooks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookedBooks" ADD COLUMN     "orderCode" TEXT NOT NULL;
