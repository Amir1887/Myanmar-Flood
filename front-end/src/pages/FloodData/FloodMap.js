import React, { useState } from "react";
import { MapContainer, TileLayer, WMSTileLayer, LayersControl, Marker, Popup, Tooltip, useMapEvents, useMap } from "react-leaflet";
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
// Updated ClickHandler to fetch flood data based on the clicked location
const ClickHandler = ({ setPopupData }) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;

      // Create a small bounding box around the clicked location
      const delta = 0.01; // Adjust this value for a larger or smaller bounding box
      const minx = lng - delta;
      const miny = lat - delta;
      const maxx = lng + delta;
      const maxy = lat + delta;

      try {
        // Construct the WMS GetFeatureInfo request URL with info_format=application/vnd.ogc.gml
        const url = `https://ows.globalfloods.eu/glofas-ows/ows.py?service=WMS&request=GetFeatureInfo&layers=AccRainEGE&query_layers=AccRainEGE&info_format=application/vnd.ogc.gml&version=1.3.0&I=50&J=50&width=101&height=101&crs=EPSG:4326&bbox=${minx},${miny},${maxx},${maxy}`;

        // Fetch the data from the WMS server
        const response = await fetch(url);
        console.log("response:", response);

        if (response.ok) {
          const gmlData = await response.text(); // Get the response as text

          // Parse the GML data using a DOMParser
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(gmlData, "application/xml");

          // Extract flood information from the GML response
          const featureMember = xmlDoc.querySelector("gml\\:featureMember, featureMember");
          if (featureMember) {
            const floodValue = featureMember.querySelector("gml\\:value, value")?.textContent;
            const description = floodValue ? `Flood Value: ${floodValue}` : "Flood data available, but could not parse value.";

            setPopupData({ lat, lng, message: description });
          } else {
            setPopupData({ lat, lng, message: "No flood data available for this location." });
          }
        } else {
          setPopupData({ lat, lng, message: "Failed to fetch flood data." });
        }
      } catch (error) {
        console.error("Error fetching flood data:", error);
        setPopupData({ lat, lng, message: "Error fetching flood data." });
      }
    },
  });

  return null;
};






// Legend component
// Displays a legend explaining the color coding for different map layers
const Legend = () => {
  return (
    <div className="legend" style={{ maxHeight: "195px", overflowY: "auto"}}>
      <h4>Map Legend</h4>
      <p><span className="legend-color" style={{ backgroundColor: "#0000FF", opacity: 0.6 }}></span> Accumulated Rainfall</p>
      <p><span className="legend-color" style={{ backgroundColor: "#800080", opacity: 0.6 }}></span> Rapid Flood Mapping</p>
      <p><span className="legend-color" style={{ backgroundColor: "#FFD700", opacity: 0.6 }}></span> Flood Hazard 100-Year</p>
      <p><span className="legend-color" style={{ backgroundColor: "#FF69B4", opacity: 0.6 }}></span> Rapid Impact Assessment</p>
      <p><span className="legend-color" style={{ backgroundColor: "#00FF00", opacity: 0.6 }}></span> Critical Infrastructure</p>
      <p><span className="legend-color" style={{ backgroundColor: "#8B4513", opacity: 0.6 }}></span> Major River Basins</p>
      <p><span className="legend-color" style={{ backgroundColor: "#00FFFF", opacity: 0.6 }}></span> Lakes and Reservoirs</p>
      <p><span className="legend-color" style={{ backgroundColor: "#FF4500", opacity: 0.6 }}></span> Reservoir Impact</p>
      <p><span className="legend-color" style={{ backgroundColor: "#FFFF00", opacity: 0.6 }}></span> Upstream Area</p>
      <p><span className="legend-color" style={{ backgroundColor: "#FF6347", opacity: 0.6 }}></span> Reporting Points</p>
      <p><span className="legend-color" style={{ backgroundColor: "#0000FF", opacity: 0.6 }}></span> Medium-Range Forecast</p>
      <p><span className="legend-color" style={{ backgroundColor: "#FFD700", opacity: 0.6 }}></span> Seasonal Outlook</p>
      <p><span className="legend-color" style={{ backgroundColor: "#FF69B4", opacity: 0.6 }}></span> Rapid Risk Assessment</p>
    </div>
  );
};

// Main Component
const FloodMap = () => {
  const center = [20.0, 96.0]; // Initializes the center coordinates and zoom level for the map (Center of Myanmar)
  const zoomLevel = 5;

  // State for opacity control
  const [rainOpacity, setRainOpacity] = useState(0.7);
  const [hazardOpacity, setHazardOpacity] = useState(0.6);
  const [impactOpacity, setImpactOpacity] = useState(0.6);
  const [riverBasinOpacity, setRiverBasinOpacity] = useState(0.6);
  const [reservoirOpacity, setReservoirOpacity] = useState(0.6);
  const [upstreamOpacity, setUpstreamOpacity] = useState(0.6);
  const [reportingOpacity, setReportingOpacity] = useState(0.6);

  // const [forecastOpacity, setForecastOpacity] = useState(0.7);
  // const [outlookOpacity, setOutlookOpacity] = useState(0.6);
  // const [riskOpacity, setRiskOpacity] = useState(0.6);

  // State for clicked popup data
  const [popupData, setPopupData] = useState(null);

  const [rpg80Opacity, setRpg80Opacity] = useState(0.6);
  const [time, setTime] = useState("2024-10"); // Default time dimension

  const [rivermapOpacity, setRivermapOpacity] = useState(0.6);
  const [rivertime, setRiverTime] = useState("2024-10"); // Default time dimension

  return (
    <div style={{ position: "relative" }}>
      {/* MapContainer Configuration */} 
      <MapContainer center={center} zoom={zoomLevel} style={{ height: "100vh", width: "100%" }}>
        {/* Default base layer */}
        <TileLayer
          url="https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=gSXiU4XXwkoLtGhf1qUM"
          attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
        />

        {/* LayersControl for switching between base layers and WMS layers */}
        <LayersControl position="topright"  className="leaflet-control-layers-list">
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

          <LayersControl.Overlay name="Flood Hazard (100-Year)">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="FloodHazard100y"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Flood Hazard Data"
              opacity={hazardOpacity}
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
              opacity={impactOpacity}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Major River Basins">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="MajorRiverBasins"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS River Basins"
              opacity={riverBasinOpacity}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Lakes and Reservoirs">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="GlofasLakesReservoirs"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Lakes and Reservoirs"
              opacity={reservoirOpacity}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Reservoir Impact">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="GlofasReservoirImpact"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Reservoir Impact"
              opacity={reservoirOpacity}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Upstream Area">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="UpstreamArea"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Drainage Network"
              opacity={upstreamOpacity}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Reporting Points">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="RPG_U_GLOFAS_3_3"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Reporting Points"
              opacity={reportingOpacity}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Seasonal Outlook - Reporting Points">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="RPG80"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Seasonal Outlook"
              opacity={rpg80Opacity}
              params={{
                time: time, // Set the time dimension dynamically
              }}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Seasonal Outlook - River Network">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="rivermap_4mon"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Seasonal Outlook"
              opacity={rivermapOpacity}
              params={{
                time: rivertime, // Set the time dimension dynamically
              }}
            />
          </LayersControl.Overlay>

          {/* <LayersControl.Overlay checked name="Medium-Range Forecast">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="MediumRangeForecast"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Medium-Range Forecast"
              opacity={forecastOpacity}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Seasonal Outlook">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="SeasonalOutlook"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Seasonal Outlook"
              opacity={outlookOpacity}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Rapid Risk Assessment">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="RapidRiskAssessment"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Rapid Risk Assessment"
              opacity={riskOpacity}
            />
          </LayersControl.Overlay> */}
        </LayersControl>

        

        {/* Click handler */} 
        <ClickHandler setPopupData={setPopupData} />

        {/* Marker with popup */}
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

      {/* Map Legend */}
      <Legend />

      {/* Dynamic Opacity Controls with Vertical Scroll */}
      <div className="opacity-controls" style={{ maxHeight: "195px", overflowY: "auto"}}>
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
        <label>Flood Hazard (100-Year): {hazardOpacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={hazardOpacity}
          onChange={(e) => setHazardOpacity(parseFloat(e.target.value))}
        />
        <label>Rapid Impact Assessment: {impactOpacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={impactOpacity}
          onChange={(e) => setImpactOpacity(parseFloat(e.target.value))}
        />
        <label>Major River Basins: {riverBasinOpacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={riverBasinOpacity}
          onChange={(e) => setRiverBasinOpacity(parseFloat(e.target.value))}
        />
        <label>Lakes and Reservoirs: {reservoirOpacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={reservoirOpacity}
          onChange={(e) => setReservoirOpacity(parseFloat(e.target.value))}
        />
        <label>Upstream Area: {upstreamOpacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={upstreamOpacity}
          onChange={(e) => setUpstreamOpacity(parseFloat(e.target.value))}
        />
        <label>Reporting Points: {reportingOpacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={reportingOpacity}
          onChange={(e) => setReportingOpacity(parseFloat(e.target.value))}

        />
        <label>Seasonal Outlook - Reporting Points: {rpg80Opacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={rpg80Opacity}
          onChange={(e) => setRpg80Opacity(parseFloat(e.target.value))}
        />
      {/* Time Dimension Control */}
      <div className="time-controls">
        <label>Select Time:</label>
        <input
          type="month"
          value={time}
          onChange={(e) => setTime(e.target.value)} />
      </div>
      <label>Seasonal Outlook - River Network: {rivermapOpacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={rivermapOpacity}
          onChange={(e) => setRivermapOpacity(parseFloat(e.target.value))}
        />
      {/* Time Dimension Control */}
      <div className="time-controls">
        <label>Select Time:</label>
        <input
          type="month"
          value={rivertime}
          onChange={(e) => setRiverTime(e.target.value)}
        />
      </div>

       

{/* <label>Medium-Range Forecast: {forecastOpacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={forecastOpacity}
          onChange={(e) => setForecastOpacity(parseFloat(e.target.value))}
        />
        <label>Seasonal Outlook: {outlookOpacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={outlookOpacity}
          onChange={(e) => setOutlookOpacity(parseFloat(e.target.value))}
        />
        <label>Rapid Risk Assessment: {riskOpacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={riskOpacity}
          onChange={(e) => setRiskOpacity(parseFloat(e.target.value))}
        /> */}
      </div>
    </div>
  );
};

export default FloodMap;
