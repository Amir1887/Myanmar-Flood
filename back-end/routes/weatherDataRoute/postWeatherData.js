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
      humidity,
      rainfall,
      windSpeed,
      forecast,
      fetchedAt,
      floodRiskLevel,
      floodDataId,
      apiSource,
    } = req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    const newWeatherDataData = await prisma.weatherData.create({
      data: {
        id,
        region,
        temperature,
        humidity,
        rainfall,
        windSpeed,
        forecast,
        fetchedAt,
        floodRiskLevel,
        floodDataId,
        apiSource,
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
