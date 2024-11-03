import React from 'react';
import { Box, Typography, Paper } from "@mui/material";
function WeatherDataSummary({ weatherData }) {
    const latestHour = weatherData?.hourly?.time.length - 1;

    // Extracting additional data fields
    const temperature = weatherData?.hourly?.temperature_2m?.[latestHour];
    const precipitation = weatherData?.hourly?.precipitation?.[latestHour];
    const soilMoisture0To1cm = weatherData?.hourly?.soil_moisture_0_to_1cm?.[latestHour];
    const soilMoisture1To3cm = weatherData?.hourly?.soil_moisture_1_to_3cm?.[latestHour];
    const cloudCover = weatherData?.hourly?.cloud_cover?.[latestHour];
    const windspeed = weatherData?.hourly?.wind_speed_10m?.[latestHour];
    const windGusts = weatherData?.hourly?.wind_gusts_10m?.[latestHour];
    const windDirection = weatherData?.hourly?.wind_direction_10m?.[latestHour];
    const visibility = weatherData?.hourly?.visibility?.[latestHour];
    const surfacePressure = weatherData?.hourly?.surface_pressure?.[latestHour];

    return (
        <Paper elevation={3} sx={{ p: 2, maxHeight: 400, overflowY: "auto", mt: 2 }}>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Current Weather Data</h3>
            {weatherData && latestHour >= 0 ? (
                <ul className="list-disc list-inside">
                    {temperature !== undefined && <li>Temperature: {temperature}°C</li>}
                    {precipitation !== undefined && <li>Precipitation: {precipitation} mm</li>}
                    {soilMoisture0To1cm !== undefined && <li>Soil Moisture (0-1 cm): {soilMoisture0To1cm} m³/m³</li>}
                    {soilMoisture1To3cm !== undefined && <li>Soil Moisture (1-3 cm): {soilMoisture1To3cm} m³/m³</li>}
                    {cloudCover !== undefined && <li>Cloud Cover: {cloudCover}%</li>}
                    {windspeed !== undefined && <li>Wind Speed: {windspeed} m/s</li>}
                    {windGusts !== undefined && <li>Wind Gusts: {windGusts} m/s</li>}
                    {windDirection !== undefined && <li>Wind Direction: {windDirection}°</li>}
                    {visibility !== undefined && <li>Visibility: {visibility} meters</li>}
                    {surfacePressure !== undefined && <li>Surface Pressure: {surfacePressure} hPa</li>}
                </ul>
            ) : (
                <p className="text-gray-500">Loading...</p>
            )}
        </Paper>
    );
}

export default WeatherDataSummary;
