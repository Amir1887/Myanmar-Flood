/*
  Warnings:

  - A unique constraint covering the columns `[pdfLink]` on the table `Mimu` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Mimu_url_key";

-- CreateIndex
CREATE UNIQUE INDEX "Mimu_pdfLink_key" ON "Mimu"("pdfLink");
