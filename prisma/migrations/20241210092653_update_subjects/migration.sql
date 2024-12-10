-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Subject" ADD VALUE 'architecture';
ALTER TYPE "Subject" ADD VALUE 'art';
ALTER TYPE "Subject" ADD VALUE 'business';
ALTER TYPE "Subject" ADD VALUE 'engineering';
ALTER TYPE "Subject" ADD VALUE 'law';
ALTER TYPE "Subject" ADD VALUE 'medicine';
ALTER TYPE "Subject" ADD VALUE 'music';
ALTER TYPE "Subject" ADD VALUE 'religion';
ALTER TYPE "Subject" ADD VALUE 'language';

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "imageURL" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT;
