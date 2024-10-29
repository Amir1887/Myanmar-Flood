-- DropForeignKey
ALTER TABLE "VolunteerApplication" DROP CONSTRAINT "VolunteerApplication_userId_fkey";

-- AddForeignKey
ALTER TABLE "VolunteerApplication" ADD CONSTRAINT "VolunteerApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
