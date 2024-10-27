/*
  Warnings:

  - A unique constraint covering the columns `[imageUrl]` on the table `Mozela` will be added. If there are existing duplicate values, this will fail.
  - Made the column `imageUrl` on table `Mozela` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Mozela_url_key";

-- AlterTable
ALTER TABLE "Mozela" ALTER COLUMN "imageUrl" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Mozela_imageUrl_key" ON "Mozela"("imageUrl");
