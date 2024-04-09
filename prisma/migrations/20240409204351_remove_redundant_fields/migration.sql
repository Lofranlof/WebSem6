/*
  Warnings:

  - You are about to drop the column `content` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Record` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "content",
DROP COLUMN "published";
