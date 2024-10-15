import React, { useState, useEffect } from 'react';
import WeatherGraph from './WeatherGraph';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      // Use Open-Meteo API to fetch hourly temperature and precipitation
      const url = 'https://api.open-meteo.com/v1/forecast?latitude=20.0&longitude=96.0&hourly=temperature_2m,precipitation';
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    };

    fetchWeatherData();
  }, []);

  return (
    <div>
      <h2>Weather Forecast</h2>
      {weatherData ? <WeatherGraph weatherData={weatherData} /> : <p>Loading...</p>}
    </div>
  );
};

export default WeatherComponent;
