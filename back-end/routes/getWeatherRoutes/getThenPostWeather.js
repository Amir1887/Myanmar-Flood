// weatherRouter.js  
const express = require("express");  
const router = express.Router();  
const { startWeatherDataFetchCron, fetchWeatherData } = require("./cronWeatherFetch");  // Import from cron module  
require("dotenv").config();  

// To keep track of running cron jobs
let isCronRunning = false;

// Route to fetch weather data on demand  
router.post("/weather-data-from-api", async (req, res) => {  
  const { latitude, longitude } = req.body;  
  if (!latitude || !longitude) {  
    return res.status(400).json({ error: "Latitude and longitude are required" });  
  }  
  console.log("Fetching weather data for:", latitude, longitude);  

  try {  
    // Fetch the weather data immediately
    const weatherData = await fetchWeatherData(latitude, longitude);  
    
    // Start the cron job if it's not already running
    if (!isCronRunning) {
      startWeatherDataFetchCron(latitude, longitude);
      isCronRunning = true;
      console.log("Cron job started for:", latitude, longitude);
    }

    res.status(200).json(weatherData);  
  } catch (error) {  
    console.error("Error fetching weather data:", error);  
    res.status(500).json({ error: "Failed to fetch weather data." });  
  }  
});  

module.exports = router;
