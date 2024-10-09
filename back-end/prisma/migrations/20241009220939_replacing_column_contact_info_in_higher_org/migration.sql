/*
  Warnings:

  - You are about to drop the column `contactInfo` on the `HighLevelOrganization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HighLevelOrganization" DROP COLUMN "contactInfo",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "phoneNumber" TEXT;
