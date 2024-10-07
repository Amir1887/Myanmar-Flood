-- DropForeignKey
ALTER TABLE "DamageAssessment" DROP CONSTRAINT "DamageAssessment_userId_fkey";

-- AlterTable
ALTER TABLE "DamageAssessment" ADD COLUMN     "organizationMemberId" INTEGER,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DamageAssessment" ADD CONSTRAINT "DamageAssessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DamageAssessment" ADD CONSTRAINT "DamageAssessment_organizationMemberId_fkey" FOREIGN KEY ("organizationMemberId") REFERENCES "OrganizationMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;
