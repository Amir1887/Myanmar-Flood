/*
  Warnings:

  - You are about to drop the column `pdfLink` on the `ReliefWeb` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReliefWeb" DROP COLUMN "pdfLink",
ALTER COLUMN "publishedDate" DROP NOT NULL;
