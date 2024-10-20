/*
  Warnings:

  - You are about to drop the column `region` on the `WeatherData` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fetchedAt,latitude,longitude]` on the table `WeatherData` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "WeatherData_fetchedAt_region_key";

-- AlterTable
ALTER TABLE "WeatherData" DROP COLUMN "region",
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "WeatherData_fetchedAt_latitude_longitude_key" ON "WeatherData"("fetchedAt", "latitude", "longitude");
