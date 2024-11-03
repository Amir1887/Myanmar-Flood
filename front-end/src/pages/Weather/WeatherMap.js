import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Box, IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function WeatherMap({ location, onSearchClick }) {
  const center = [20.0, 96.0];
  const zoomLevel = 5;

  const FlyToLocation = ({ location }) => {
    const map = useMap();
    if (location && location.lat && location.lng) {
      map.flyTo([location.lat, location.lng], 10, { duration: 2 });
    }
    return null;
  };

  return (
    <Box position="relative" width="100%" height="50vh" mb={2}>
      <MapContainer center={center} zoom={zoomLevel} style={{ height: "100%", borderRadius: 8 }}>
        <TileLayer
          url="https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=gSXiU4XXwkoLtGhf1qUM"
          attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
        />
        {location && <FlyToLocation location={location} />}
      </MapContainer>
      <Box position="absolute" top={10} left={10} zIndex={1000}>
        <IconButton onClick={onSearchClick} color="primary">
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default WeatherMap;
