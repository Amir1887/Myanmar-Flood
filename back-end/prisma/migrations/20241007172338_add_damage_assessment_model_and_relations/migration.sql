-- CreateTable
CREATE TABLE "DamageAssessment" (
    "id" SERIAL NOT NULL,
    "floodDataId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "severity" TEXT NOT NULL,
    "estimatedLoss" DOUBLE PRECISION NOT NULL,
    "needsAnalysis" TEXT NOT NULL,
    "additionalNotes" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DamageAssessment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DamageAssessment" ADD CONSTRAINT "DamageAssessment_floodDataId_fkey" FOREIGN KEY ("floodDataId") REFERENCES "FloodData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DamageAssessment" ADD CONSTRAINT "DamageAssessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
