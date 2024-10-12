-- AlterTable
ALTER TABLE "DecisionMaker" ADD COLUMN     "username" TEXT;

-- AlterTable
ALTER TABLE "HighLevelOrganization" ADD COLUMN     "username" TEXT;

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "username" TEXT;

-- AlterTable
ALTER TABLE "OrganizationMember" ADD COLUMN     "username" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT;
