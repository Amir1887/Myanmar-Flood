import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FloodForecast = () => {
    const [region, setRegion] = useState('upper');
    const [floodData, setFloodData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFloodData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:4000/api/glofas?region=${region}&leadtime_day=15`);
            setFloodData(response.data);
        } catch (err) {
            setError('Failed to fetch flood data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFloodData(); // Fetch data when component mounts or region changes
    }, [region]);

    return (
        <div>
            <h1>Flood Forecast for Myanmar</h1>
            <select onChange={(e) => setRegion(e.target.value)} value={region}>
                <option value="upper">Upper Myanmar</option>
                <option value="middle">Middle Myanmar</option>
                <option value="tail">Tail of Myanmar</option>
            </select>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {floodData && (
                <div>
                    <h2>Flood Data for {region.toUpperCase()}</h2>
                    <pre>{JSON.stringify(floodData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default FloodForecast;
