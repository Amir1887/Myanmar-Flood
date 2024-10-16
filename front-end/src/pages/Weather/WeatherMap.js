import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
const mapTileUrl = process.env.REACT_APP_MAP_TILE_URL_streets;

function WeatherMap({ location }) {
  const center = [20.0, 96.0]; // Center coordinates
  const zoomLevel = 5;

  const FlyToLocation = ({ location }) => {
    const map = useMap();

    // Validate location
    if (!location || !location.lat || !location.lng) {
        return <p className="text-red-500">Location data is unavailable. Please try another search.</p>;
      }
      

    // Fly to the location with animation
    map.flyTo([location.lat, location.lng], 10, {
      duration: 2, // Animation duration
    });
    return null;
  };

  return (
    <div>
      <MapContainer
        center={center}
        zoom={zoomLevel}
        style={{ height: "100vh", width: "100%" }}  // Consider the layout
      >
        <TileLayer
         url="https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=gSXiU4XXwkoLtGhf1qUM" // Ideally use environmental variable
          attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
        />

        {location && <FlyToLocation location={location} />}
      </MapContainer>
    </div>
  );
}

export default WeatherMap;
