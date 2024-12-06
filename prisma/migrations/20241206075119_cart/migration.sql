/*
  Warnings:

  - You are about to drop the `SavedBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SavedBook" DROP CONSTRAINT "SavedBook_bookId_fkey";

-- DropForeignKey
ALTER TABLE "SavedBook" DROP CONSTRAINT "SavedBook_userId_fkey";

-- DropTable
DROP TABLE "SavedBook";

-- CreateTable
CREATE TABLE "Cart" (
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_bookId_key" ON "Cart"("userId", "bookId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
