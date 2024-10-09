/*
  Warnings:

  - You are about to drop the column `contactInfo` on the `Organization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "contactInfo",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "phoneNumber" TEXT;
