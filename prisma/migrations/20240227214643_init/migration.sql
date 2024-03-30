/*
  Warnings:

  - You are about to drop the column `name` on the `Achievement` table. All the data in the column will be lost.
  - You are about to drop the column `RegisterDate` on the `User` table. All the data in the column will be lost.
  - Added the required column `type` to the `Achievement` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Noob', 'Amateur', 'Pro', 'Swolelvl1', 'Swolelvl2', 'Cut', 'Ripped', 'Yoked', 'Jacked', 'Shredded', 'AbsoluteUnit');

-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "name",
ADD COLUMN     "type" "Type" NOT NULL;

-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "statId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "RegisterDate",
ADD COLUMN     "registerDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Statistics" (
    "id" SERIAL NOT NULL,
    "recordId" INTEGER NOT NULL,
    "becnhPress" INTEGER NOT NULL,
    "deadLift" INTEGER NOT NULL,
    "squat" INTEGER NOT NULL,

    CONSTRAINT "Statistics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Statistics_recordId_key" ON "Statistics"("recordId");

-- AddForeignKey
ALTER TABLE "Statistics" ADD CONSTRAINT "Statistics_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
