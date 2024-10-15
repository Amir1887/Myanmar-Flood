import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  LayersControl,
  Marker,
  Popup,
  Tooltip,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Used for defining custom map elements like marker icons.
import "./FloodMap.css";
import SearchMap from "./SearchMap";
import Legend from "./Legend";

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
          const featureMember = xmlDoc.querySelector(
            "gml\\:featureMember, featureMember"
          );
          if (featureMember) {
            const floodValue =
              featureMember.querySelector("gml\\:value, value")?.textContent;
            const description = floodValue
              ? `Flood Value: ${floodValue}`
              : "Flood data available, but could not parse value.";

            setPopupData({ lat, lng, message: description });
          } else {
            setPopupData({
              lat,
              lng,
              message: "No flood data available for this location.",
            });
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
<Legend/>

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

  const [basinOverviewOpacity, setBasinOverviewOpacity] = useState(0.6);
  const [floodSummary13Opacity, setFloodSummary13Opacity] = useState(0.6);
  const [floodSummary410Opacity, setFloodSummary410Opacity] = useState(0.6);

  const [precip3DaysOpacity, setPrecip3DaysOpacity] = useState(0.6);
  const [tempOpacity, setTempOpacity] = useState(0.6);
  const [precipAnomalyOpacity, setPrecipAnomalyOpacity] = useState(0.6);
  const [probRgt150Opacity, setProbRgt150Opacity] = useState(0.6);
  const [rainAnimationOpacity, setRainAnimationOpacity] = useState(0.6);
  const [plasticWasteOpacity, setPlasticWasteOpacity] = useState(0.6);
  const [smfrOpacity, setSmfrOpacity] = useState(0.6);
  const [criticalInfraOpacity, setCriticalInfraOpacity] = useState(0.6);
  const [forecastSkillOpacity, setForecastSkillOpacity] = useState(0.6);
  const [hydrologicalPerformanceOpacity, setHydrologicalPerformanceOpacity] =
    useState(0.6);

  // This function pans the map to the searched location
  const FlyToLocation = ({ location }) => {
    const map = useMap();
    map.flyTo([location.lat, location.lng], 10, {
      duration: 2, // Smooth fly animation duration in seconds
    });
    return null;
  };

  const [searchedLocation, setSearchedLocation] = useState(null);
  return (
    <div style={{ position: "relative" }}>
      <SearchMap onSearch={setSearchedLocation} />

      {/* MapContainer Configuration */}
      <MapContainer
        center={center}
        zoom={zoomLevel}
        style={{ height: "100vh", width: "100%" }}
      >
        {/* Default base layer */}
        <TileLayer
          url="https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=gSXiU4XXwkoLtGhf1qUM"
          attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
        />

        {searchedLocation && <FlyToLocation location={searchedLocation} />}

        {/* LayersControl for switching between base layers and WMS layers */}
        <LayersControl
          position="topright"
          className="leaflet-control-layers-list"
        >
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
                time: time, // Set the time dimension dynamically
              }}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Seasonal Outlook - Basin Overview">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="areamap_4mon"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Seasonal Outlook"
              opacity={basinOverviewOpacity} // Create state to control this if needed
              params={{
                time: "2024-10", // Example setting for the time dimension
              }}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Flood Summary (Days 1-3)">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="sumAL41EGE"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Flood Summary"
              opacity={floodSummary13Opacity} // Create state to control this if needed
              params={{
                time: "2024-10-14T00:00:00", // Example setting for the time dimension
              }}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Flood Summary (Days 4-10)">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="sumAL42EGE"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Flood Summary"
              opacity={floodSummary410Opacity} // Create state to control this if needed
              params={{
                time: "2024-10-14T00:00:00", // Example setting for the time dimension
              }}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Initial 3-day Precipitation">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="precip3Days"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Initial 3-day Precipitation"
              opacity={precip3DaysOpacity}
              params={{
                time: "2024-10-14T00:00:00", // Set the time dimension as needed
              }}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Initial 2m Temperature">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="temp"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Initial 2m Temperature"
              opacity={tempOpacity}
              params={{
                time: "2024-10-14T00:00:00", // Example setting for the time dimension
              }}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Initial 3-day Precipitation Anomaly">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="precip3DaysAnomaly"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Precipitation Anomaly"
              opacity={precipAnomalyOpacity}
              params={{
                time: "2024-10-14T00:00:00", // Example setting for the time dimension
              }}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Precipitation Probability > 150mm">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="EGE_probRgt150"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Precipitation Probability"
              opacity={probRgt150Opacity}
              params={{
                time: "2024-10-14T00:00:00", // Example setting for the time dimension
              }}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Rain Animation">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="RainAnimation"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Rain Animation"
              opacity={rainAnimationOpacity}
              params={{
                time: time,
              }}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Mismanaged Plastic Waste">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="MismanagedPlasticWaste"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Mismanaged Plastic Waste"
              opacity={plasticWasteOpacity}
              params={{
                time: time,
              }}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Social Media Analysis for Flood Risk">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="SMFR"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Social Media Analysis"
              opacity={smfrOpacity}
              params={{
                time: "2024-10-14T00:00:00", // Example setting for the time dimension
              }}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Affected Critical Infrastructure Assets">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="critinfra_assets"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Critical Infrastructure"
              opacity={criticalInfraOpacity}
              params={{
                time: "2024-10-14T00:00:00", // Example setting for the time dimension
              }}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Forecast Skill">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="ForecastSkill"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Forecast Skill"
              opacity={forecastSkillOpacity}
              params={{
                time: "2024-10-14T00:00:00", // Example setting for the time dimension
              }}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Hydrological Model Performance">
            <WMSTileLayer
              url="https://ows.globalfloods.eu/glofas-ows/ows.py?"
              layers="HydrologicalModelPerformance"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="GloFAS Hydrological Model Performance"
              opacity={hydrologicalPerformanceOpacity}
              params={{
                time: "2024-10-14T00:00:00", // Example setting for the time dimension
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
              <p>
                Location: {popupData.lat.toFixed(2)}, {popupData.lng.toFixed(2)}
              </p>
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
      <div
        className="opacity-controls"
        style={{ maxHeight: "195px", overflowY: "auto" }}
      >
        <h4>Adjust Layer Opacity</h4>
        {/* Time Dimension Control */}
        <div className="time-controls">
          <label>Select Time:</label>
          <input
            type="month"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

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

        <label>Seasonal Outlook - River Network: {rivermapOpacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={rivermapOpacity}
          onChange={(e) => setRivermapOpacity(parseFloat(e.target.value))}
        />

        <label>Seasonal Outlook - Basin Overview: {basinOverviewOpacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={basinOverviewOpacity}
          onChange={(e) => setBasinOverviewOpacity(parseFloat(e.target.value))}
        />

        <label>Flood Summary (Days 1-3): {floodSummary13Opacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={floodSummary13Opacity}
          onChange={(e) => setFloodSummary13Opacity(parseFloat(e.target.value))}
        />

        <label>Flood Summary (Days 4-10): {floodSummary410Opacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={floodSummary410Opacity}
          onChange={(e) =>
            setFloodSummary410Opacity(parseFloat(e.target.value))
          }
        />

        <label>Initial 3-day Precipitation: {precip3DaysOpacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={precip3DaysOpacity}
          onChange={(e) => setPrecip3DaysOpacity(parseFloat(e.target.value))}
        />

        <label>Initial 2m Temperature: {tempOpacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={tempOpacity}
          onChange={(e) => setTempOpacity(parseFloat(e.target.value))}
        />
        <label>
          Initial 3-day Precipitation Anomaly: {precipAnomalyOpacity}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={precipAnomalyOpacity}
          onChange={(e) => setPrecipAnomalyOpacity(parseFloat(e.target.value))}
        />
        <label>Precipitation Probability 150mm: {probRgt150Opacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={probRgt150Opacity}
          onChange={(e) => setProbRgt150Opacity(parseFloat(e.target.value))}
        />

        <label>Rain Animation: {rainAnimationOpacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={rainAnimationOpacity}
          onChange={(e) => setRainAnimationOpacity(parseFloat(e.target.value))}
        />
        <label>Mismanaged Plastic Waste: {plasticWasteOpacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={plasticWasteOpacity}
          onChange={(e) => setPlasticWasteOpacity(parseFloat(e.target.value))}
        />

        <label>Social Media Analysis for Flood Risk: {smfrOpacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={smfrOpacity}
          onChange={(e) => setSmfrOpacity(parseFloat(e.target.value))}
        />
        <label>
          Affected Critical Infrastructure Assets: {criticalInfraOpacity}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={criticalInfraOpacity}
          onChange={(e) => setCriticalInfraOpacity(parseFloat(e.target.value))}
        />
        <label>Forecast Skill: {forecastSkillOpacity}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={forecastSkillOpacity}
          onChange={(e) => setForecastSkillOpacity(parseFloat(e.target.value))}
        />
        <label>
          Hydrological Model Performance: {hydrologicalPerformanceOpacity}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={hydrologicalPerformanceOpacity}
          onChange={(e) =>
            setHydrologicalPerformanceOpacity(parseFloat(e.target.value))
          }
        />

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
