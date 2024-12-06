-- CreateEnum
CREATE TYPE "Department" AS ENUM ('Mathematics', 'Arts', 'Science', 'ComputerScience');

-- CreateEnum
CREATE TYPE "Course" AS ENUM ('Algebra', 'History', 'Physics', 'Literature', 'Algorithms');

-- CreateEnum
CREATE TYPE "Format" AS ENUM ('Hardcover', 'eBook', 'Paperback');

-- CreateTable
CREATE TABLE "Textbooks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "department" "Department" NOT NULL,
    "course" "Course" NOT NULL,
    "format" "Format" NOT NULL,
    "condition" "Condition" NOT NULL,
    "isbn" TEXT NOT NULL,

    CONSTRAINT "Textbooks_pkey" PRIMARY KEY ("id")
);
