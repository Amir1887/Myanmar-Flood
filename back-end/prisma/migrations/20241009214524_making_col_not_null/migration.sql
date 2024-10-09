/*
  Warnings:

  - Made the column `userId` on table `Volunteer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Volunteer" DROP CONSTRAINT "Volunteer_userId_fkey";

-- AlterTable
ALTER TABLE "Volunteer" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Volunteer" ADD CONSTRAINT "Volunteer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
