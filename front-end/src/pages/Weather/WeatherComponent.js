import React, { useEffect, useState } from "react";
import WeatherGraph from "./WeatherGraph";
import { useSearch } from "../../context/SearchContext";
import WeatherDataSummary from "./WeatherDataSummary";

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
              "surface_pressure"
            ].join(","),
          });
          const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setWeatherData(data);
          console.log("data",data);
        } catch (error) {
          console.error("Failed to fetch weather data:", error);
        }
      }
    };

    fetchWeatherData();
  }, [location]);
  console.log("data after",weatherData);
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Weather Forecast
      </h2>
      <form onSubmit={handleSubmit} className="flex items-center mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a location"
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : weatherData ? (
        <>
          <WeatherGraph weatherData={weatherData} />
          <WeatherDataSummary weatherData={weatherData} />
        </>
      ) : (
        <p className="text-gray-500">No data available.</p>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default WeatherComponent;
