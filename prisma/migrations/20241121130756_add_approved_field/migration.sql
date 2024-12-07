/*
  Warnings:

  - You are about to drop the column `lastEdited` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "lastEdited",
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false;
