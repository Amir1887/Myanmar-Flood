/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Mozela` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Mozela_imageUrl_key";

-- CreateIndex
CREATE UNIQUE INDEX "Mozela_date_key" ON "Mozela"("date");
