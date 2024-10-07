-- CreateEnum
CREATE TYPE "SubmitterRole" AS ENUM ('DOCTOR', 'NURSE', 'OTHER');

-- AlterTable
ALTER TABLE "HealthData" ADD COLUMN     "diseaseOutbreakId" INTEGER,
ADD COLUMN     "sanitationAccess" BOOLEAN,
ADD COLUMN     "submitterEmail" TEXT,
ADD COLUMN     "submitterName" TEXT,
ADD COLUMN     "submitterRole" "SubmitterRole",
ADD COLUMN     "waterQuality" TEXT;

-- CreateTable
CREATE TABLE "DiseaseOutbreak" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "disease" TEXT NOT NULL,
    "confirmedCases" INTEGER NOT NULL,
    "suspectedCases" INTEGER,
    "fatalities" INTEGER,
    "waterContamination" BOOLEAN NOT NULL,
    "outbreakStatus" TEXT NOT NULL,
    "submitterName" TEXT NOT NULL,
    "submitterEmail" TEXT NOT NULL,
    "submitterRole" "SubmitterRole" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiseaseOutbreak_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HealthData" ADD CONSTRAINT "HealthData_diseaseOutbreakId_fkey" FOREIGN KEY ("diseaseOutbreakId") REFERENCES "DiseaseOutbreak"("id") ON DELETE SET NULL ON UPDATE CASCADE;
