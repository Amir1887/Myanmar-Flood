import React, { useEffect, useState } from "react";
import WeatherGraph from "./WeatherGraph";
import { useSearch } from "../../context/SearchContext";
import WeatherDataSummary from "./WeatherDataSummary";
import WeatherMap from "./WeatherMap";
import { Container, Typography, Button, AppBar, Toolbar } from "@mui/material";
const WeatherComponent = () => {
  const { location, handleSearch, isLoading, error } = useSearch();
  const [weatherData, setWeatherData] = useState(null);
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch(query);
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (location) {
        try {
          const params = new URLSearchParams({
            latitude: location.lat,
            longitude: location.lng,
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
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setWeatherData(data);
        } catch (error) {
          console.error("Failed to fetch weather data:", error);
        }
      }
    };

    fetchWeatherData();
  }, [location]);

  return (
    <>
      {/* Header with AppBar */}
      <AppBar
        position="static"
        color="primary"
        style={{
          marginTop: "20px",
          width: "40%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Toolbar style={{ justifyContent: "center" }}>
          {" "}
          {/* Center the content in the Toolbar */}
          <Typography variant="h4" align="center">
            {" "}
            {/* Center the text within Typography */}
            Current Weather Forecast
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-3 mb-5">
        {/* Map Section with Search */}
        <div className="relative mb-8">
          <WeatherMap location={location} />
          <form
            onSubmit={handleSubmit}
            className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row items-center"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a location"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            />
            <button
              type="submit"
              className="mt-2 sm:mt-0 sm:ml-2 w-full sm:w-auto p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </form>
        </div>

        {/* Weather Content Section */}

        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : weatherData ? (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-6">
              <div className="flex-1 min-w-[300px] p-4 bg-gray-50 rounded-lg shadow-md">
                <WeatherGraph weatherData={weatherData} />
              </div>
              <div className="flex-1 min-w-[300px] p-4 bg-gray-50 rounded-lg shadow-md">
                <WeatherDataSummary weatherData={weatherData} />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No data available.</p>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </>
  );
};

export default WeatherComponent;
