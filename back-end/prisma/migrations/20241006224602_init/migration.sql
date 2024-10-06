-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'DONOR');

-- CreateEnum
CREATE TYPE "ResourceStatus" AS ENUM ('PENDING', 'DISTRIBUTED', 'IN_TRANSIT');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "location" TEXT NOT NULL,
    "isInNeed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthData" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "waterAccess" BOOLEAN NOT NULL,
    "diseaseRisk" TEXT NOT NULL,
    "healthNotes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HealthData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FloodData" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "riskLevel" DOUBLE PRECISION NOT NULL,
    "affectedPeople" INTEGER NOT NULL,
    "predictedDate" TIMESTAMP(3) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FloodData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "ResourceStatus" NOT NULL DEFAULT 'PENDING',
    "userId" INTEGER,
    "floodDataId" INTEGER NOT NULL,
    "communityResilienceId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "floodDataId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" SERIAL NOT NULL,
    "donorName" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityResilience" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "recoveryPlans" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunityResilience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "HealthData" ADD CONSTRAINT "HealthData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_floodDataId_fkey" FOREIGN KEY ("floodDataId") REFERENCES "FloodData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_communityResilienceId_fkey" FOREIGN KEY ("communityResilienceId") REFERENCES "CommunityResilience"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_floodDataId_fkey" FOREIGN KEY ("floodDataId") REFERENCES "FloodData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
