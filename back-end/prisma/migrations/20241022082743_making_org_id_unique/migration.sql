/*
  Warnings:

  - A unique constraint covering the columns `[organizationId]` on the table `VolunteerApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VolunteerApplication_organizationId_key" ON "VolunteerApplication"("organizationId");
