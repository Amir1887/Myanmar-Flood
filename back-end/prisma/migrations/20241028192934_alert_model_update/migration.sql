/*
  Warnings:

  - Added the required column `latitude` to the `Alert` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Alert` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Alert" DROP CONSTRAINT "Alert_floodDataId_fkey";

-- AlterTable
ALTER TABLE "Alert" ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "weatherDataId" INTEGER,
ALTER COLUMN "region" DROP NOT NULL,
ALTER COLUMN "floodDataId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_floodData_fkey" FOREIGN KEY ("floodDataId") REFERENCES "FloodData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_weatherData_fkey" FOREIGN KEY ("weatherDataId") REFERENCES "WeatherData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
