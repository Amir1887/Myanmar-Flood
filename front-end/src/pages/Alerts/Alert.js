import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Alert() {
    const [alerts, setAlerts] = useState([]); // Store alerts
    const [expandedAlertId, setExpandedAlertId] = useState(null); // Store which alert's weather details are expanded

    useEffect(() => {
        const getAlerts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/alerts');
                console.log("response from alerts", response);
                if (response.data) {
                    setAlerts(response.data);
                }
            } catch (error) {
                console.error("Error fetching alerts:", error);
            }
        };
        getAlerts();
    }, []);

    // Function to toggle weather details for a specific alert
    const toggleWeatherDetails = (alertId) => {
        if (expandedAlertId === alertId) {
            setExpandedAlertId(null); // Collapse if already expanded
        } else {
            setExpandedAlertId(alertId); // Expand weather details
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Alerts</h1>
            {alerts.length > 0 ? (
                alerts.map((alert) => (
                    <div key={alert.id} className="border border-gray-300 p-4 mb-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Alert: {alert.message}</h2>
                        <p className="mb-1"><strong>Latitude:</strong> {alert.latitude}</p>
                        <p className="mb-1"><strong>Longitude:</strong> {alert.longitude}</p>
                        <p className="mb-1"><strong>Status:</strong> {alert.status}</p>
                        <p className="mb-1"><strong>Created At:</strong> {new Date(alert.createdAt).toLocaleString()}</p>

                        {/* Button to toggle weather details */}
                        <button
                            onClick={() => toggleWeatherDetails(alert.id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                        >
                            {expandedAlertId === alert.id ? 'Hide Weather Details' : 'See Weather Details'}
                        </button>

                        {/* Show weather details if expanded */}
                        {expandedAlertId === alert.id && alert.weatherData && (
                            <div className="mt-4 bg-gray-100 p-4 rounded-md">
                                <h3 className="text-lg font-bold mb-2">Weather Details:</h3>
                                <p><strong>Temperature:</strong> {alert.weatherData.temperature} °C</p>
                                <p><strong>Precipitation:</strong> {alert.weatherData.precipitation} mm</p>
                                <p><strong>Soil Moisture (0-1 cm):</strong> {alert.weatherData.soilMoisture0To1cm}</p>
                                <p><strong>Soil Moisture (1-3 cm):</strong> {alert.weatherData.soilMoisture1To3cm}</p>
                                <p><strong>Soil Moisture (3-9 cm):</strong> {alert.weatherData.soilMoisture3To9cm}</p>
                                <p><strong>Surface Pressure:</strong> {alert.weatherData.surfacePressure} hPa</p>
                                <p><strong>Wind Speed:</strong> {alert.weatherData.windSpeed} km/h</p>
                                <p><strong>Wind Gusts:</strong> {alert.weatherData.windGusts} km/h</p>
                                <p><strong>Visibility:</strong> {alert.weatherData.visibility} meters</p>
                                <p><strong>Cloud Cover:</strong> {alert.weatherData.cloudCover}%</p>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No alerts found.</p>
            )}
        </div>
    );
}

export default Alert;
