/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Record` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Type` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Record_title_key" ON "Record"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Type_title_key" ON "Type"("title");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
