-- DropForeignKey
ALTER TABLE "OrganizationResponse" DROP CONSTRAINT "OrganizationResponse_organizationId_fkey";

-- AddForeignKey
ALTER TABLE "OrganizationResponse" ADD CONSTRAINT "OrganizationResponse_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
