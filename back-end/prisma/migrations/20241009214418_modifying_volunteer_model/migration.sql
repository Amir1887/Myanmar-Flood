/*
  Warnings:

  - You are about to drop the column `email` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Volunteer` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Volunteer_email_key";

-- AlterTable
ALTER TABLE "Volunteer" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Volunteer" ADD CONSTRAINT "Volunteer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
