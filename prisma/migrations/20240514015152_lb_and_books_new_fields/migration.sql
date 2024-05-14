-- AlterTable
ALTER TABLE "Books" ADD COLUMN     "ISBN" TEXT,
ADD COLUMN     "info" TEXT,
ADD COLUMN     "theme" TEXT,
ADD COLUMN     "year" TEXT;

-- AlterTable
ALTER TABLE "LibraryBook" ADD COLUMN     "amount" INTEGER,
ADD COLUMN     "amountAvailable" INTEGER;
