import React from "react";
import "./FloodMap.css";
const Legend = () => {
    return (
      <div className="legend" style={{ maxHeight: "195px", overflowY: "auto" }}>
        <h4>Map Legend</h4>
        <p>
          <span
            className="legend-color"
            style={{ backgroundColor: "#0000FF", opacity: 0.6 }}
          ></span>{" "}
          Accumulated Rainfall
        </p>
        <p>
          <span
            className="legend-color"
            style={{ backgroundColor: "#800080", opacity: 0.6 }}
          ></span>{" "}
          Rapid Flood Mapping
        </p>
        <p>
          <span
            className="legend-color"
            style={{ backgroundColor: "#FFD700", opacity: 0.6 }}
          ></span>{" "}
          Flood Hazard 100-Year
        </p>
        <p>
          <span
            className="legend-color"
            style={{ backgroundColor: "#FF69B4", opacity: 0.6 }}
          ></span>{" "}
          Rapid Impact Assessment
        </p>
        <p>
          <span
            className="legend-color"
            style={{ backgroundColor: "#00FF00", opacity: 0.6 }}
          ></span>{" "}
          Critical Infrastructure
        </p>
        <p>
          <span
            className="legend-color"
            style={{ backgroundColor: "#8B4513", opacity: 0.6 }}
          ></span>{" "}
          Major River Basins
        </p>
        <p>
          <span
            className="legend-color"
            style={{ backgroundColor: "#00FFFF", opacity: 0.6 }}
          ></span>{" "}
          Lakes and Reservoirs
        </p>
        <p>
          <span
            className="legend-color"
            style={{ backgroundColor: "#FF4500", opacity: 0.6 }}
          ></span>{" "}
          Reservoir Impact
        </p>
        <p>
          <span
            className="legend-color"
            style={{ backgroundColor: "#FFFF00", opacity: 0.6 }}
          ></span>{" "}
          Upstream Area
        </p>
        <p>
          <span
            className="legend-color"
            style={{ backgroundColor: "#FF6347", opacity: 0.6 }}
          ></span>{" "}
          Reporting Points
        </p>
        <p>
          <span
            className="legend-color"
            style={{ backgroundColor: "#0000FF", opacity: 0.6 }}
          ></span>{" "}
          Medium-Range Forecast
        </p>
        <p>
          <span
            className="legend-color"
            style={{ backgroundColor: "#FFD700", opacity: 0.6 }}
          ></span>{" "}
          Seasonal Outlook
        </p>
        <p>
          <span
            className="legend-color"
            style={{ backgroundColor: "#FF69B4", opacity: 0.6 }}
          ></span>{" "}
          Rapid Risk Assessment
        </p>
        <p>
          <span
            className="legend-color"
            style={{ backgroundColor: "#ADD8E6", opacity: 0.6 }}
          ></span>{" "}
          Seasonal Outlook - Basin Overview
        </p>
        <p>
          <span
            className="legend-color"
            style={{ backgroundColor: "#9400D3", opacity: 0.6 }}
          ></span>{" "}
          Flood Summary (Days 1-3)
        </p>
        <p>
          <span
            className="legend-color"
            style={{ backgroundColor: "#FF4500", opacity: 0.6 }}
          ></span>{" "}
          Flood Summary (Days 4-10)
        </p>
      </div>
    );
  };

export default Legend;
