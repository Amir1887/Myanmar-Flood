const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/weather-data", async (req, res) => {
  try {
    const {
      id,
      region,
      temperature,
      precipitation,
      soilMoisture0To1cm,
      soilMoisture1To3cm,
      soilMoisture3To9cm,
      soilMoisture9To27cm,
      soilMoisture27To81cm,
      cloudCover,
      windSpeed,
      windGusts,
      windDirection,
      visibility,
      surfacePressure,
      floodRiskLevel,
      floodDataId,
      apiSource,
      fetchedAt
    } = req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    const newWeatherDataData = await prisma.weatherData.create({
      data: {
        id,
        region,
        temperature,
        precipitation,
        soilMoisture0To1cm,
        soilMoisture1To3cm,
        soilMoisture3To9cm,
        soilMoisture9To27cm,
        soilMoisture27To81cm,
        cloudCover,
        windSpeed,
        windGusts,
        windDirection,
        visibility,
        surfacePressure,
        floodRiskLevel,
        floodDataId,
        apiSource,
        fetchedAt
      },
    });

    res.status(201).json(newWeatherDataData);
  } catch (error) {
    console.error("Error creating weatherData: ", error);
    res.status(500).json({
      error: "Failed to create weatherData",
      details: error.message,
    });
  }
});

module.exports = router;
