import axios from 'axios';
import React, { useEffect, useState } from 'react';

function WeatherHistory() {
  const [weatherNotes, setWeatherNotes] = useState([]);
  const [filteredWeatherNotes, setFilteredWeatherNotes] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getWeatherHistory = async () => {
      try {
        const response = await axios.get('http://localhost:4000/weather-data');
        console.log('Response from weather history:', response);
        if (response.data) {
          setWeatherNotes(response.data);
          filterLastWeekData(response.data); // Automatically show last week's data on page load
        }
      } catch (error) {
        console.error('Error fetching weather history:', error);
      }
    };
    getWeatherHistory();
  }, []);

  // Filter the weather data for the last 7 days
  const filterLastWeekData = (data) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const filteredData = data.filter((item) => {
      const fetchedDate = new Date(item.fetchedAt);
      return fetchedDate >= oneWeekAgo;
    });

    setFilteredWeatherNotes(filteredData);
  };

  // Handle search by date
  const handleSearch = (e) => {
    e.preventDefault();

    // Reset message
    setMessage('');

    if (searchDate) {
      const filtered = weatherNotes.filter((note) => {
        const fetchedDate = new Date(note.fetchedAt).toLocaleDateString();
        return fetchedDate === new Date(searchDate).toLocaleDateString();
      });

      if (filtered.length > 0) {
        setFilteredWeatherNotes(filtered);
      } else {
        setMessage('No weather data recorded for this date.');
        setFilteredWeatherNotes([]);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Weather History</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <label htmlFor="searchDate" className="block text-lg mb-2">
          Search by Date:
        </label>
        <input
          type="date"
          id="searchDate"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
        >
          Search
        </button>
      </form>

      {/* Display message if there's no data for the searched date */}
      {message && <p className="text-center text-red-500 mb-4">{message}</p>}
      {filteredWeatherNotes.length > 0 && <h2 className="text-2xl font-bold mb-6">Weather History of Last Week</h2>}
      {/* Display Weather Data */}
      {filteredWeatherNotes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
             
          {filteredWeatherNotes.map((note, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">
                Date: {new Date(note.fetchedAt).toLocaleDateString()}
              </h2>
              <p>
                <strong>Temperature:</strong> {note.temperature} °C
              </p>
              <p>
                <strong>Precipitation:</strong> {note.precipitation} mm
              </p>
              <p>
                <strong>Soil Moisture (0-1cm):</strong> {note.soilMoisture0To1cm}
              </p>
              <p>
                <strong>Wind Speed:</strong> {note.windSpeed} km/h
              </p>
              <p>
                <strong>Surface Pressure:</strong> {note.surfacePressure} hPa
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No weather data available</p>
      )}
    </div>
  );
}

export default WeatherHistory;
