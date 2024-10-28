/*
  Warnings:

  - You are about to drop the column `url` on the `ReliefWeb` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[articleUrl]` on the table `ReliefWeb` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `articleUrl` to the `ReliefWeb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categorizedSentiment` to the `ReliefWeb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishedDate` to the `ReliefWeb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentiment` to the `ReliefWeb` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ReliefWeb_url_key";

-- AlterTable
ALTER TABLE "ReliefWeb" DROP COLUMN "url",
ADD COLUMN     "articleUrl" TEXT NOT NULL,
ADD COLUMN     "categorizedSentiment" TEXT NOT NULL,
ADD COLUMN     "publishedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sentiment" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ReliefWeb_articleUrl_key" ON "ReliefWeb"("articleUrl");
