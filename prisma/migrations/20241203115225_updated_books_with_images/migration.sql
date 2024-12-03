/*
  Warnings:

  - You are about to drop the column `owner` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the `BookImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stuff` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BookImage" DROP CONSTRAINT "BookImage_bookId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "owner",
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "imageURL" TEXT,
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "BookImage";

-- DropTable
DROP TABLE "Stuff";

-- CreateTable
CREATE TABLE "SavedBook" (
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "SavedBook_pkey" PRIMARY KEY ("userId","bookId")
);

-- CreateTable
CREATE TABLE "_SavedBookRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SavedBookRelation_AB_unique" ON "_SavedBookRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedBookRelation_B_index" ON "_SavedBookRelation"("B");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedBook" ADD CONSTRAINT "SavedBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedBook" ADD CONSTRAINT "SavedBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedBookRelation" ADD CONSTRAINT "_SavedBookRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedBookRelation" ADD CONSTRAINT "_SavedBookRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
