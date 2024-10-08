/*
  Warnings:

  - Made the column `purpose` on table `Donation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `priorityLevel` on table `Resource` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Donation" ALTER COLUMN "purpose" SET NOT NULL;

-- AlterTable
ALTER TABLE "Resource" ALTER COLUMN "priorityLevel" SET NOT NULL;
