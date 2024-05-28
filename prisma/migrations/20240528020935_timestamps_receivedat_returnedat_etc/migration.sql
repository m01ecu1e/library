-- AlterTable
ALTER TABLE "BookedBooks" ADD COLUMN     "due_date" TIMESTAMPTZ(0),
ADD COLUMN     "is_overdue" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "received_at" TIMESTAMPTZ(0),
ADD COLUMN     "returned_at" TIMESTAMPTZ(0);
