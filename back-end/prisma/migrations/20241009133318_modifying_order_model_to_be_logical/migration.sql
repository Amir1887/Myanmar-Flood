/*
  Warnings:

  - You are about to drop the column `targetId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `organizationId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "TargetType" ADD VALUE 'ORGANIZATION';

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "targetId",
ADD COLUMN     "highLevelOrgId" INTEGER,
ADD COLUMN     "organizationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_highLevelOrgId_fkey" FOREIGN KEY ("highLevelOrgId") REFERENCES "HighLevelOrganization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
