/*
  Warnings:

  - Made the column `consentGranted` on table `HealthData` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "HealthData" ALTER COLUMN "consentGranted" SET NOT NULL;
