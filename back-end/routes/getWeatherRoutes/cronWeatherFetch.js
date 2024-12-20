const { PrismaClient } = require("@prisma/client");
const cron = require("node-cron");
const axios = require("axios");
const { sendPushNotification } = require("./web-pushNotification");

const prisma = new PrismaClient();

// Threshold configuration
const thresholds = {
  precipitation: {
    shortDuration: 30, // mm in 1-3 hours for potential flooding
    highRiskShortDuration: 50, // mm for high flash flood risk
    longDuration: 100, // mm in 24 hours for significant flooding
  },
  soilMoisture: {
    level: 0.3, // 30% volumetric water content for saturation
    rapidIncrease: 0.05, // Daily increase in soil moisture
  },
  surfacePressure: {
    rapidDrop: 2, // hPa in 6 hours indicating a storm
  },
  windGusts: 30, // km/h indicating significant weather systems
};

// Function to fetch weather data
const fetchWeatherData = async (latitude, longitude) => {
  try {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
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
    throw error;
  }
};

// Function to save alerts to the database
const saveAlertToDB = async (message, latitude, longitude, weatherDataId = null, floodDataId = null) => {
  try {
    const newAlert = await prisma.alert.create({
      data: {
        message: message,
        latitude: latitude,
        longitude: longitude,
        weatherDataId: weatherDataId,
        floodDataId: floodDataId,
        status: "PENDING", // Default to PENDING before sending
      },
    });
    console.log("Alert saved to DB:", newAlert);
    return newAlert;
  } catch (error) {
    console.error("Error saving alert to DB:", error);
  }
};


// Function to notify users based on weather alerts and update alert status
const notifyUserIfThresholdsExceeded = async (alerts, alertIds) => {
  if (alerts.length > 0 && alertIds.length > 0) {
    try {
      // Fetch all subscriptions from the database
      const subscriptions = await prisma.pushSubscription.findMany();

      for (const subscription of subscriptions) {
        const payload = {
          title: "Weather Alert!",
          body: alerts.join("\n"),
          icon: "https://img.icons8.com/?size=100&id=11642&format=png&color=000000",
        };

        try {
          // Send push notification
          await sendPushNotification(subscription, payload);

          // Update alert status to "SENT" if notification is successful
          await prisma.alert.updateMany({
            where: {
              id: { in: alertIds },
            },
            data: {
              status: "SENT",
            },
          });

          console.log("Notifications sent to all users. Alerts updated to SENT.");
        } catch (error) {
          // If an error occurs, update alert status to "FAILED"
          await prisma.alert.updateMany({
            where: {
              id: { in: alertIds },
            },
            data: {
              status: "FAILED",
            },
          });

          console.error("Error sending notification. Alerts updated to FAILED:", error);
        }
      }
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  }
};


// Function to check if weather data exceeds thresholds
const checkThresholds = (currentData, latitude, longitude) => {
  const alerts = [];

  // Check precipitation thresholds
  if (currentData.precipitation >= thresholds.precipitation.shortDuration) {
    alerts.push(
      `Potential flooding detected at (${latitude}, ${longitude}) due to high precipitation.`
    );
  }
  if (currentData.precipitation >= thresholds.precipitation.highRiskShortDuration) {
    alerts.push(
      `High risk of flash floods detected at (${latitude}, ${longitude}) due to very high precipitation.`
    );
  }

  // Check soil moisture thresholds
  if (currentData.soilMoisture0To1cm >= thresholds.soilMoisture.level) {
    alerts.push(
      `Ground is saturated at (${latitude}, ${longitude}) with high soil moisture.`
    );
  }

  // Check surface pressure thresholds
  if (currentData.surfacePressure < thresholds.surfacePressure.rapidDrop) {
    alerts.push(
      `Rapid drop in surface pressure detected at (${latitude}, ${longitude}), indicating an approaching storm.`
    );
  }

  // Check wind speed
  if (currentData.windGusts > thresholds.windGusts) {
    alerts.push(
      `High wind gusts detected at (${latitude}, ${longitude}), which may accompany significant weather systems.`
    );
  }

  return alerts;
};

// Function to save weather data to the database
const saveWeatherDataToDB = async (weatherData, latitude, longitude) => {
  if (weatherData && weatherData.hourly) {
    const hourlyData = weatherData.hourly;

    for (let i = 0; i < hourlyData.time.length; i++) {
      try {
        const currentData = {
          precipitation: hourlyData.precipitation[i],
          soilMoisture0To1cm: hourlyData.soil_moisture_0_to_1cm[i],
          surfacePressure: hourlyData.surface_pressure[i],
          windGusts: hourlyData.wind_gusts_10m[i],
        };

        const alerts = checkThresholds(currentData, latitude, longitude);
        const alertIds = []; // Array to store alert IDs

        const existingEntry = await prisma.weatherData.findUnique({
          where: {
            fetchedAt_latitude_longitude: {
              fetchedAt: new Date(hourlyData.time[i]),
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
            },
          },
        });

        let weatherDataId;

        if (!existingEntry) {
          const newWeatherData = await prisma.weatherData.create({
            data: {
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
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

          weatherDataId = newWeatherData.id;
        } else {
          weatherDataId = existingEntry.id;
        }

        // Save alerts and collect their IDs
        if (alerts.length > 0) {
          for (const alertMessage of alerts) {
            const savedAlert = await saveAlertToDB(alertMessage, latitude, longitude, weatherDataId);
            alertIds.push(savedAlert.id); // Add saved alert ID
          }
        }

        // Send notifications and pass alertIds
        await notifyUserIfThresholdsExceeded(alerts, alertIds);

      } catch (error) {
        console.error("Error inserting weather data:", error);
      }
    }
  } else {
    console.log("No weather data fetched or weather data format is incorrect.");
  }
};


// Function to start the cron job
const startWeatherDataFetchCron = (latitude, longitude) => {
  cron.schedule("*/30 * * * *", async () => {
    console.log("Fetching weather data...");
    try {
      const weatherData = await fetchWeatherData(latitude, longitude);
      await saveWeatherDataToDB(weatherData, latitude, longitude);
    } catch (error) {
      console.error(
        "Error occurred during scheduled weather data fetch:",
        error
      );
    }
  });
};

module.exports = { startWeatherDataFetchCron, fetchWeatherData };
