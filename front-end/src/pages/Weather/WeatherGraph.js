import { Line } from "react-chartjs-2";
import React, { useState, useMemo } from "react";
import {
  Chart as ChartJS, //Renames Chart to ChartJS to avoid naming conflicts.
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherGraph = ({ weatherData }) => {
  const [selectedData, setSelectedData] = useState({
    temperature: false,
    precipitation: false,
    soil_moisture_0_to_1cm: false,
    cloud_cover: false,
    wind_speed: false,
    visibility: false,
    surface_pressure: false,
  });

  // Options for user to choose
  // value: Key for the state (selectedData).
  // label: Text displayed next to the checkbox.
  // key: Corresponding key in the weatherData object.
  const dataOptions = [
    { value: "temperature", label: "Temperature (°C)", key: "temperature_2m" },
    {
      value: "precipitation",
      label: "Precipitation (mm)",
      key: "precipitation",
    },
    {
      value: "soil_moisture_0_to_1cm",
      label: "Soil Moisture (0-1 cm)",
      key: "soil_moisture_0_to_1cm",
    },
    { value: "cloud_cover", label: "Cloud Cover (%)", key: "cloudcover_total" },
    { value: "wind_speed", label: "Wind Speed (10 m)", key: "wind_speed_10m" },
    { value: "visibility", label: "Visibility (km)", key: "visibility" },
    {
      value: "surface_pressure",
      label: "Surface Pressure (hPa)",
      key: "surface_pressure",
    },
  ];

  // Function to generate random colors for datasets
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Memoized chart data  (The chartData is now calculated using useMemo, which will only recompute when weatherData or selectedData change, reducing unnecessary re-renders.)
  const chartData = useMemo(() => {
    if (weatherData && weatherData.hourly) {
      const labels = weatherData.hourly.time.map((time) =>
        new Date(time).toLocaleTimeString()
      );

      //Filters the data options based on user selection, creating a dataset for each selected option.
      const datasets = dataOptions
        .filter((option) => selectedData[option.value])
        .map((option) => {
          const selectedValues = weatherData.hourly[option.key]; //retrieving the corresponding data for the selected option from the weatherData.hourly object, using the key specified in the option.
          return {
            label: option.label,
            data: selectedValues,
            borderColor: getRandomColor(), // Function to get a unique color
            backgroundColor: "rgba(75,192,192,0.4)",
            fill: false,
          };
        });

      return {
        labels: labels,
        datasets: datasets,
      };
    }
    return null;
  }, [weatherData, selectedData]);

  // Function to handle checkbox selection
  const handleDataSelection = (e) => {
    const { name, checked } = e.target;
    setSelectedData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <div>
      <h2>Weather Graph</h2>

      {/* Checkboxes for selecting which data to display */}
      <div>
        {dataOptions.map((option) => (
          <div key={option.value}>
            <input
              type="checkbox"
              name={option.value}
              checked={selectedData[option.value]}
              onChange={handleDataSelection}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>

      {/* Weather chart */}
      {chartData && chartData.datasets.length > 0 ? (
        <div style={{ width: "100%", height: "500px" }}>
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      ) : (
        <p>No available chart data</p>
      )}
    </div>
  );
};

export default WeatherGraph;
