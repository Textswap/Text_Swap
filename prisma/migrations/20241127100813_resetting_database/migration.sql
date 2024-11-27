/*
  Warnings:

  - You are about to drop the column `imagePath` on the `BookImage` table. All the data in the column will be lost.
  - Added the required column `filePath` to the `BookImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookImage" DROP COLUMN "imagePath",
ADD COLUMN     "filePath" TEXT NOT NULL;
