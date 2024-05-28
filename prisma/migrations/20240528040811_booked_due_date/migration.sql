/*
  Warnings:

  - You are about to drop the column `is_overdue` on the `BookedBooks` table. All the data in the column will be lost.
  - You are about to drop the column `returned_at` on the `BookedBooks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BookedBooks" DROP COLUMN "is_overdue",
DROP COLUMN "returned_at",
ADD COLUMN     "booked_due_date" TIMESTAMPTZ(0);
