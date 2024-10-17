/*
  Warnings:

  - A unique constraint covering the columns `[fetchedAt,region]` on the table `WeatherData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WeatherData_fetchedAt_region_key" ON "WeatherData"("fetchedAt", "region");
