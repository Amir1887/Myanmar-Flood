/*
  Warnings:

  - Made the column `password` on table `DecisionMaker` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `HighLevelOrganization` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "DecisionMaker" ALTER COLUMN "password" SET NOT NULL;

-- AlterTable
ALTER TABLE "HighLevelOrganization" ALTER COLUMN "password" SET NOT NULL;
