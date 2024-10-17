const { PrismaClient } = require("@prisma/client");  
const prisma = new PrismaClient();  
const express = require("express");  
const router = express.Router();  
const axios = require("axios");  
const cron = require("node-cron");  
require("dotenv").config();  

const fetchWeatherData = async (latitude, longitude) => {  
  try {  
    const params = new URLSearchParams({  
      latitude: process.env.LATITUDE.toString(),  
      longitude: process.env.LONGITUDE.toString(),  
      hourly: [  
        "temperature_2m",  
        "precipitation",  
        "soil_moisture_0_to_1cm",  
        "soil_moisture_1_to_3cm",  
        "soil_moisture_3_to_9cm",  
        "soil_moisture_9_to_27cm",  
        "soil_moisture_27_to_81cm",  
        "cloud_cover",  
        "wind_speed_10m",  
        "wind_gusts_10m",  
        "wind_direction_10m",  
        "visibility",  
        "surface_pressure",  
      ].join(","),  
    });  

    const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;  
    const response = await axios.get(url);  

    if (response.status === 200) {  
      return response.data;  
    } else {  
      throw new Error("Failed to fetch weather data: " + response.statusText);  
    }  
  } catch (error) {  
    console.error("Error fetching weather data:", error.message);  
    throw error; // Rethrow to handle it in cron job  
  }  
};  
// 30-minute schedule ("*/30 * * * *")
//for a 1-hour schedule:("0 * * * *")
//every minute: "* * * * *",
// Schedule the cron job to run every minute on application startup  
cron.schedule("0 * * * *", async () => {  
  console.log("Fetching weather data...");  
  
  try {  
    const weatherData = await fetchWeatherData(process.env.LATITUDE, process.env.LONGITUDE); // Use environment variables  
    console.log("Weather data fetched:", weatherData);  

    if (weatherData && weatherData.hourly) {  
      const hourlyData = weatherData.hourly;  

      // Iterate through each hourly data entry  
      for (let i = 0; i < hourlyData.time.length; i++) {  
        try {  
          // Check for existing entry to prevent duplicates  
          const existingEntry = await prisma.weatherData.findUnique({
            where: {
              fetchedAt_region: {
                fetchedAt: new Date(hourlyData.time[i]),
                region: "Example Region", // Adjust for your region
              },
            },
          });
           

          if (!existingEntry) {  
            // Create new weather data entry  
            const newWeatherData = await prisma.weatherData.create({  
              data: {  
                region: "Example Region", // Set your desired region  
                temperature: hourlyData.temperature_2m[i],  
                precipitation: hourlyData.precipitation[i],  
                soilMoisture0To1cm: hourlyData.soil_moisture_0_to_1cm[i],  
                soilMoisture1To3cm: hourlyData.soil_moisture_1_to_3cm[i],  
                soilMoisture3To9cm: hourlyData.soil_moisture_3_to_9cm[i],  
                soilMoisture9To27cm: hourlyData.soil_moisture_9_to_27cm[i],  
                soilMoisture27To81cm: hourlyData.soil_moisture_27_to_81cm[i],  
                cloudCover: hourlyData.cloud_cover[i],  
                windSpeed: hourlyData.wind_speed_10m[i],  
                windGusts: hourlyData.wind_gusts_10m[i],  
                windDirection: hourlyData.wind_direction_10m[i],  
                visibility: hourlyData.visibility[i],  
                surfacePressure: hourlyData.surface_pressure[i],  
                apiSource: "Open-Meteo",  
                fetchedAt: new Date(hourlyData.time[i]),  
              },  
            });  

            console.log("Inserted weather data:", newWeatherData);  
          } else {  
            console.log(`Data for ${hourlyData.time[i]} already exists.`);  
          }  
        } catch (error) {  
          console.error("Error inserting weather data:", error);  
        }  
      }  
    } else {  
      console.log("No weather data fetched or weather data format is incorrect.");  
    }  
  } catch (error) {  
    console.error("Error occurred during scheduled weather data fetch:", error);  
  }  
});  

// Initial route to start fetching data (this can be disabled in production)  (cron can not be inside routeter)
router.get("/weather-data-from-api", (req, res) => {  
  res.send("Cron job for weather data fetching is running.");  
});  

module.exports = router;