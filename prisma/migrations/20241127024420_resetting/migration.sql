-- CreateEnum
CREATE TYPE "Subject" AS ENUM ('math', 'english', 'science', 'history');

-- CreateEnum
CREATE TYPE "Format" AS ENUM ('hardcover', 'paperback');

-- AlterEnum
ALTER TYPE "Condition" ADD VALUE 'new';

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "isbn" TEXT,
    "subject" "Subject" NOT NULL,
    "courseName" TEXT,
    "courseCrn" TEXT,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "condition" "Condition" NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
