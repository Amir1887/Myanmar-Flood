-- DropForeignKey
ALTER TABLE "VolunteerApplication" DROP CONSTRAINT "VolunteerApplication_organizationId_fkey";

-- AddForeignKey
ALTER TABLE "VolunteerApplication" ADD CONSTRAINT "VolunteerApplication_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
