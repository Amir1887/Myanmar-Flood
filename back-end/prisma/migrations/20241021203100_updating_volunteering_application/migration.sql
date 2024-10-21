/*
  Warnings:

  - You are about to drop the column `organizationId` on the `VolunteerApplication` table. All the data in the column will be lost.
  - Added the required column `education` to the `VolunteerApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyContact` to the `VolunteerApplication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VolunteerApplication" DROP CONSTRAINT "VolunteerApplication_organizationId_fkey";

-- AlterTable
ALTER TABLE "VolunteerApplication" DROP COLUMN "organizationId",
ADD COLUMN     "availability" TEXT,
ADD COLUMN     "certifications" TEXT,
ADD COLUMN     "education" TEXT NOT NULL,
ADD COLUMN     "emergencyContact" TEXT NOT NULL,
ADD COLUMN     "languages" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "motivation" TEXT,
ADD COLUMN     "preferredAreas" TEXT,
ADD COLUMN     "previousExperience" TEXT;
