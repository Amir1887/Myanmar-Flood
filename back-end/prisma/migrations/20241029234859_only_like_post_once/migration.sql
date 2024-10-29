/*
  Warnings:

  - A unique constraint covering the columns `[postId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId,organizationId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "unique_like_per_user" ON "Like"("postId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "unique_like_per_org" ON "Like"("postId", "organizationId");
