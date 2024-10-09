/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `HighLevelOrganization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "HighLevelOrganization_email_key" ON "HighLevelOrganization"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_email_key" ON "Organization"("email");
