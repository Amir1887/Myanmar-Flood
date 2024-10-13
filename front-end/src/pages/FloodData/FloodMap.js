import React, { useState } from "react";
import { MapContainer, TileLayer, WMSTileLayer, LayersControl, Marker, Popup, Tooltip, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Used for defining custom map elements like marker icons.
import "./FloodMap.css";

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1679/1679266.png", // Flood icon
  iconSize: [30, 30],
});

// Function to handle map clicks and display a marker with a popup
// Listens for clicks on the map and updates the state (setPopupData) with the latitude and longitude of the clicked location.
const ClickHandler = ({ setPopupData }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPopupData({ lat, lng, message: `Flood information for the selected location.` });
    },
  });
  return null;
};

// Legend component
// Displays a legend explaining the color coding for different map layers
const Legend = () => {
  return (
    <div className="legend">
      <h4>Map Legend</h4>
      <p><span className="legend-color" style={{ backgroundColor: "#0000FF", opacity: 0.6 }}></span> Accumulated Rainfall</p>
      <p><span className="legend-color" style={{ backgroundColor: "#FF0000", opacity: 0.6 }}></span> Flood Zones</p>
      <p><span className="legend-color" style={{ backgroundColor: "#FFA500", opacity: 0.6 }}></span> Flood Risk Areas</p>
      <p><span className="legend-color" style={{ backgroundColor: "#00FF00", opacity: 0.6 }}></span> Reporting Points</p>
      <p><span className="legend-color" style={{ backgroundColor: "#800080", opacity: 0.6 }}></span> Rapid Flood Mapping</p>
      <p><span className="legend-color" style={{ backgroundColor: "#FFFF00", opacity: 0.6 }}></span> Flood Summary</p>
      <p><span className="legend-color" style={{ backgroundColor: "#FF69B4", opacity: 0.6 }}></span> Rapid Impact Assessment</p>
      <p><span className="legend-color" style={{ backgroundColor: "#8B4513", opacity: 0.6 }}></span> Observed Flood Extent</p>
    </div>
  );
};

// Main Component
const FloodMap = () => {
  const center = [20.0, 96.0]; // Initializes the center coordinates and zoom level for the map (Center of Myanmar)
  const zoomLevel = 5;

  // State for opacity control
  const [rainOpacity, setRainOpacity] = useState(0.7);
  const [zonesOpacity, setZonesOpacity] = useState(0.6);
  const [riskOpacity, setRiskOpacity] = useState(0.6);

  // State for clicked popup data
  const [popupData, setPopupData] = useState(null);

  return (
    <div style={{ position: "relative" }}>
      {/* MapContainer Configuration: 
          - Defines the map's center and zoom level. 
          - Uses TileLayer for the default satellite base map. */}
      <MapContainer center={center} zoom={zoomLevel} style={{ height: "100vh", width: "100%" }}>
        {/* Default base layer (MapTiler Satellite) */}
        <TileLayer
          url="https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=gSXiU4XXwkoLtGhf1qUM"
          attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
        />

        {/* LayersControl for switching between base layers and WMS layers */}
        {/* Allows users to switch between base layers (Satellite and Topographic) and overlay WMS layers for accumulated rainfall, flood zones, and flood risk areas */}
        <LayersControl position="topright">

          {/* Base Layers */}
          <LayersControl.BaseLayer checked name="Satellite">
            <TileLayer
              url="https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=gSXiU4XXwkoLtGhf1qUM"
              attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Topographic">
            <TileLayer
              url="https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=gSXiU4XXwkoLtGhf1qUM"
              attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
            />
          </LayersControl.BaseLayer>

         {/* WMS Layers */}
          {/* WMS Layer for Accumulated Rainfall */}
         <LayersControl.Overlay checked name="Accumulated Rainfall">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="AccRainEGE"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Flood Data"
              opacity={rainOpacity}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Flood Zones">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="FloodZonesEGE"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Flood Data"
              opacity={zonesOpacity}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Flood Risk Areas">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="FloodRiskEGE"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Flood Risk Data"
              opacity={riskOpacity}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Reporting Points">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="reportingPoints"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Reporting Data"
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Rapid Flood Mapping">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="RapidFloodMapping"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Rapid Mapping"
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Flood Summary">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="sumAL41EGE"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Flood Summary"
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Rapid Impact Assessment">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="RapidImpactAssessment"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Impact Assessment"
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Observed Flood Extent">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="gfm:observed_flood_extent_group_layer"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Observed Extent"
            />
          </LayersControl.Overlay>
        </LayersControl>

        {/* Click handler for Adding a clickable event listener to the map for displaying popups. */}
        <ClickHandler setPopupData={setPopupData} />

        {/* If popupData is present, a Marker is shown on the map with a custom icon, displaying location-specific flood information. */}
        {popupData && (
          <Marker position={[popupData.lat, popupData.lng]} icon={customIcon}>
            <Popup>
              <h4>Flood Data</h4>
              <p>Location: {popupData.lat.toFixed(2)}, {popupData.lng.toFixed(2)}</p>
              <p>{popupData.message}</p>
            </Popup>
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
              Click for more info
            </Tooltip>
          </Marker>
        )}
      </MapContainer>

      {/* Map Legend: 
          - Displays a map legend to explain the layers. 
          - Includes range sliders to adjust the opacity of each map layer. */}
      <Legend />

      {/* Dynamic Opacity Controls */}
      <div className="opacity-controls">
        <h4>Adjust Layer Opacity</h4>
        <label>Accumulated Rainfall: {rainOpacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={rainOpacity}
          onChange={(e) => setRainOpacity(parseFloat(e.target.value))}
        />
        <label>Flood Zones: {zonesOpacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={zonesOpacity}
          onChange={(e) => setZonesOpacity(parseFloat(e.target.value))}
        />
        <label>Flood Risk Areas: {riskOpacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={riskOpacity}
          onChange={(e) => setRiskOpacity(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default FloodMap;
