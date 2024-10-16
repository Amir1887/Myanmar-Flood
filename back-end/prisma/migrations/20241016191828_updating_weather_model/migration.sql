/*
  Warnings:

  - You are about to drop the column `forecast` on the `WeatherData` table. All the data in the column will be lost.
  - You are about to drop the column `humidity` on the `WeatherData` table. All the data in the column will be lost.
  - You are about to drop the column `rainfall` on the `WeatherData` table. All the data in the column will be lost.
  - Added the required column `cloudCover` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precipitation` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soilMoisture0To1cm` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soilMoisture1To3cm` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soilMoisture27To81cm` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soilMoisture3To9cm` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soilMoisture9To27cm` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surfacePressure` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visibility` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `windDirection` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `windGusts` to the `WeatherData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WeatherData" DROP COLUMN "forecast",
DROP COLUMN "humidity",
DROP COLUMN "rainfall",
ADD COLUMN     "cloudCover" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "precipitation" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "soilMoisture0To1cm" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "soilMoisture1To3cm" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "soilMoisture27To81cm" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "soilMoisture3To9cm" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "soilMoisture9To27cm" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "surfacePressure" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "visibility" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "windDirection" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "windGusts" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "floodRiskLevel" DROP NOT NULL;
