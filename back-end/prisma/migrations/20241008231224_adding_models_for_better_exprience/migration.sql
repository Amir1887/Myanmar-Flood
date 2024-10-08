-- CreateEnum
CREATE TYPE "ConsentType" AS ENUM ('GENERAL', 'HEALTH_DATA', 'LOCATION_DATA');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('ENGLISH', 'Burmese', 'FRENCH', 'SPANISH');

-- CreateEnum
CREATE TYPE "NotificationMethod" AS ENUM ('EMAIL', 'SMS', 'APP_NOTIFICATION');

-- CreateEnum
CREATE TYPE "AlertFrequency" AS ENUM ('IMMEDIATE', 'DAILY', 'WEEKLY');

-- CreateEnum
CREATE TYPE "AlertType" AS ENUM ('FLOOD_ALERT', 'DISEASE_OUTBREAK', 'RESOURCE_DISTRIBUTION');

-- CreateEnum
CREATE TYPE "FeedbackType" AS ENUM ('RESOURCE', 'GENERAL');

-- CreateEnum
CREATE TYPE "FeedbackStatus" AS ENUM ('PENDING', 'ACKNOWLEDGED', 'UNDER_REVIEW', 'RESOLVED');

-- CreateEnum
CREATE TYPE "EmergencyType" AS ENUM ('FLOOD', 'EARTHQUAKE', 'DISEASE_OUTBREAK', 'FIRE', 'OTHER');

-- CreateEnum
CREATE TYPE "PlanStatus" AS ENUM ('PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ResponseStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "PriorityLevelER" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "DiseaseOutbreak" ADD COLUMN     "apiSource" TEXT,
ADD COLUMN     "criticalCondition" INTEGER,
ADD COLUMN     "fetchedAt" TIMESTAMP(3),
ADD COLUMN     "hospitalizations" INTEGER,
ADD COLUMN     "newCases" INTEGER,
ADD COLUMN     "recovered" INTEGER,
ADD COLUMN     "vaccinationData" TEXT;

-- AlterTable
ALTER TABLE "HealthData" ADD COLUMN     "consentGranted" BOOLEAN,
ADD COLUMN     "fetchedAt" TIMESTAMP(3),
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "emergencyResponsePlanId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "privacyAgreement" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "UserConsent" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "consentGiven" BOOLEAN NOT NULL DEFAULT false,
    "consentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consentType" "ConsentType" NOT NULL,
    "consentInfo" TEXT,
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserConsent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "notificationMethod" "NotificationMethod" NOT NULL,
    "alertFrequency" "AlertFrequency" NOT NULL,
    "preferredLanguage" "Language" NOT NULL,
    "alertType" "AlertType"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeatherData" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "rainfall" DOUBLE PRECISION NOT NULL,
    "windSpeed" DOUBLE PRECISION NOT NULL,
    "forecast" TEXT NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "floodRiskLevel" DOUBLE PRECISION NOT NULL,
    "floodDataId" INTEGER,
    "apiSource" TEXT NOT NULL,

    CONSTRAINT "WeatherData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MapData" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "mapUrl" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL,
    "floodDataId" INTEGER,
    "zoomLevel" INTEGER NOT NULL DEFAULT 10,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "apiSource" TEXT NOT NULL,

    CONSTRAINT "MapData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "feedbackType" "FeedbackType" NOT NULL,
    "resourceId" INTEGER,
    "rating" INTEGER NOT NULL,
    "comments" TEXT,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "status" "FeedbackStatus" NOT NULL DEFAULT 'PENDING',
    "adminResponse" TEXT,
    "respondedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "APILog" (
    "id" SERIAL NOT NULL,
    "apiName" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "responseCode" INTEGER NOT NULL,
    "responseTime" INTEGER NOT NULL,
    "requestPayload" TEXT,
    "errorMessage" TEXT,
    "retries" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    CONSTRAINT "APILog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyResponsePlan" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "planDetails" TEXT NOT NULL,
    "emergencyType" "EmergencyType" NOT NULL,
    "responsibleOrgId" INTEGER,
    "contactPerson" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "status" "PlanStatus" NOT NULL DEFAULT 'PENDING',
    "timeline" TIMESTAMP(3),
    "riskLevel" "RiskLevel",
    "priority" "PriorityLevelER",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmergencyResponsePlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmittedEmergency" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "emergencyType" "EmergencyType" NOT NULL,
    "description" TEXT NOT NULL,
    "submitterId" INTEGER NOT NULL,
    "submissionStatus" "SubmissionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "associatedPlanId" INTEGER,

    CONSTRAINT "SubmittedEmergency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationResponse" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "emergencyId" INTEGER NOT NULL,
    "responseDetails" TEXT NOT NULL,
    "responseStatus" "ResponseStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrganizationResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserConsent_userId_key" ON "UserConsent"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userId_key" ON "UserPreference"("userId");

-- AddForeignKey
ALTER TABLE "UserConsent" ADD CONSTRAINT "UserConsent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeatherData" ADD CONSTRAINT "WeatherData_floodDataId_fkey" FOREIGN KEY ("floodDataId") REFERENCES "FloodData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapData" ADD CONSTRAINT "MapData_floodDataId_fkey" FOREIGN KEY ("floodDataId") REFERENCES "FloodData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_emergencyResponsePlanId_fkey" FOREIGN KEY ("emergencyResponsePlanId") REFERENCES "EmergencyResponsePlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "APILog" ADD CONSTRAINT "APILog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyResponsePlan" ADD CONSTRAINT "EmergencyResponsePlan_responsibleOrgId_fkey" FOREIGN KEY ("responsibleOrgId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmittedEmergency" ADD CONSTRAINT "SubmittedEmergency_submitterId_fkey" FOREIGN KEY ("submitterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmittedEmergency" ADD CONSTRAINT "SubmittedEmergency_associatedPlanId_fkey" FOREIGN KEY ("associatedPlanId") REFERENCES "EmergencyResponsePlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationResponse" ADD CONSTRAINT "OrganizationResponse_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationResponse" ADD CONSTRAINT "OrganizationResponse_emergencyId_fkey" FOREIGN KEY ("emergencyId") REFERENCES "SubmittedEmergency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
