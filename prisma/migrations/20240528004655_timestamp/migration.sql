-- AlterTable
ALTER TABLE "BookedBooks" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(1),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(1);