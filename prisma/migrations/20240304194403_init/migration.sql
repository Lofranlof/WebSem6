/*
  Warnings:

  - You are about to drop the column `type` on the `Achievement` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[typeID]` on the table `Achievement` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `typeID` to the `Achievement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "type",
ADD COLUMN     "typeID" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Type";

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_typeID_key" ON "Achievement"("typeID");

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_typeID_fkey" FOREIGN KEY ("typeID") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
