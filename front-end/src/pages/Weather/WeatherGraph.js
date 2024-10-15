import { Line } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

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
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (weatherData && weatherData.hourly) {
      const temps = weatherData.hourly.temperature_2m;
      const precipitation = weatherData.hourly.precipitation;
      const labels = weatherData.hourly.time.map((time) => new Date(time).toLocaleTimeString());

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: temps,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.4)',
            fill: false,
          },
          {
            label: 'Precipitation (mm)',
            data: precipitation,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.4)',
            fill: false,
          },
        ],
      });
    }
  }, [weatherData]);

  return (
    <div>
      {chartData && chartData.labels ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default WeatherGraph;
