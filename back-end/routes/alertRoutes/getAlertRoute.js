const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();

router.get('/alerts', async (req, res) => {
  try {
    // Find all alerts and include related weather data
    const alertsData = await prisma.alert.findMany({
      include: {
        weatherData: true,  // Join with the WeatherData table based on weatherDataId
      },
    });

    console.log("alertdata with weather data", alertsData);
    res.json(alertsData);
  } catch (error) {
    console.error("Error fetching alerts with weather data:", error);
    res.status(500).json({ error: "Failed to fetch alerts." });
  }
});

module.exports = router;
