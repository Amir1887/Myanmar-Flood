/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pdf` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_blogPostId_fkey";

-- DropForeignKey
ALTER TABLE "Pdf" DROP CONSTRAINT "Pdf_blogPostId_fkey";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "Pdf";

-- CreateTable
CREATE TABLE "Mimu" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "uploadedDate" TEXT NOT NULL,
    "pdfLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mimu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReliefWeb" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "articleContent" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "pdfLink" TEXT,
    "relatedContent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReliefWeb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mozela" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "hydrograph" TEXT NOT NULL,
    "imageUrl" TEXT,
    "readMoreLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mozela_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mimu_url_key" ON "Mimu"("url");

-- CreateIndex
CREATE UNIQUE INDEX "ReliefWeb_url_key" ON "ReliefWeb"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Mozela_url_key" ON "Mozela"("url");
