/*
  Warnings:

  - A unique constraint covering the columns `[title,owner]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Book_title_owner_key" ON "Book"("title", "owner");
