/*
  Warnings:

  - Made the column `email` on table `HighLevelOrganization` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Organization` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "HighLevelOrganization" ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "Organization" ALTER COLUMN "email" SET NOT NULL;
