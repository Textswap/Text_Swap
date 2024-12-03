/*
  Warnings:

  - You are about to drop the `_SavedBookRelation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SavedBookRelation" DROP CONSTRAINT "_SavedBookRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_SavedBookRelation" DROP CONSTRAINT "_SavedBookRelation_B_fkey";

-- DropTable
DROP TABLE "_SavedBookRelation";
