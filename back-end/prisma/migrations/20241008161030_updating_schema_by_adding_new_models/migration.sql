/*
  Warnings:

  - Made the column `sanitationAccess` on table `HealthData` required. This step will fail if there are existing NULL values in that column.
  - Made the column `submitterEmail` on table `HealthData` required. This step will fail if there are existing NULL values in that column.
  - Made the column `submitterName` on table `HealthData` required. This step will fail if there are existing NULL values in that column.
  - Made the column `submitterRole` on table `HealthData` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PriorityLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('DAMAGE_ASSESSMENT', 'RESOURCE_DISTRIBUTION', 'HEALTH_MONITORING', 'DISEASE_OUTBREAK');

-- CreateEnum
CREATE TYPE "VolunteerRole" AS ENUM ('MEDICAL', 'LOGISTICS', 'GENERAL');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "VisualizationType" AS ENUM ('MAP', 'CHART', 'TABLE');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'DONE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "TargetType" AS ENUM ('DOCTOR', 'NURSE', 'ORGANIZER', 'MANAGER', 'VOLUNTEER', 'USER', 'DONOR', 'ADMIN', 'OTHER');

-- CreateEnum
CREATE TYPE "AlertStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- AlterTable
ALTER TABLE "Alert" ADD COLUMN     "status" "AlertStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "impactReport" TEXT,
ADD COLUMN     "purpose" TEXT;

-- AlterTable
ALTER TABLE "FloodData" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "HealthData" ALTER COLUMN "sanitationAccess" SET NOT NULL,
ALTER COLUMN "submitterEmail" SET NOT NULL,
ALTER COLUMN "submitterName" SET NOT NULL,
ALTER COLUMN "submitterRole" SET NOT NULL;

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "highLevelOrgId" INTEGER;

-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "priorityLevel" "PriorityLevel";

-- CreateTable
CREATE TABLE "HistoricalFloodData" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "severity" TEXT NOT NULL,
    "affectedPeople" INTEGER NOT NULL,
    "floodDataId" INTEGER,

    CONSTRAINT "HistoricalFloodData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "reportType" "ReportType" NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organizationId" INTEGER,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Volunteer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "VolunteerRole" NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Volunteer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "floodDataId" INTEGER,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "volunteerId" INTEGER,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HighLevelOrganization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "region" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HighLevelOrganization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DecisionMaker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "highLevelOrgId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DecisionMaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visualization" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "VisualizationType" NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visualization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "decisionMakerId" INTEGER NOT NULL,
    "targetType" "TargetType" NOT NULL,
    "targetId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "startDate" TIMESTAMP(3),
    "completionDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Volunteer_email_key" ON "Volunteer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DecisionMaker_email_key" ON "DecisionMaker"("email");

-- AddForeignKey
ALTER TABLE "HistoricalFloodData" ADD CONSTRAINT "HistoricalFloodData_floodDataId_fkey" FOREIGN KEY ("floodDataId") REFERENCES "FloodData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_highLevelOrgId_fkey" FOREIGN KEY ("highLevelOrgId") REFERENCES "HighLevelOrganization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_floodDataId_fkey" FOREIGN KEY ("floodDataId") REFERENCES "FloodData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "Volunteer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecisionMaker" ADD CONSTRAINT "DecisionMaker_highLevelOrgId_fkey" FOREIGN KEY ("highLevelOrgId") REFERENCES "HighLevelOrganization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_decisionMakerId_fkey" FOREIGN KEY ("decisionMakerId") REFERENCES "DecisionMaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
