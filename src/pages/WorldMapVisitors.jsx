import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // <-- for navigation
import axios from "axios";
import worldMap from "../assets/world-map.png";
import pinIcon from "../assets/location-pin.png";

const BASE_URL = "https://kodivian-website-5.onrender.com";

function WorldMapVisitors() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVisitors = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/visitors`);
      setVisitors(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching visitors:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
    const interval = setInterval(fetchVisitors, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  // Convert lat/lon to percentage for positioning on map
const latLonToPercents = (lat, lon) => {
  // X (longitude)
  const x = ((lon + 180) / 360) * 100;

  // Clamp latitude to Mercator safe range
  lat = Math.max(-85, Math.min(85, lat));

  // Y (latitude using Mercator projection)
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = (1 - mercN / Math.PI) * 50;

  return { x, y };
};


  // Create curved SVG path between points
  const createArcPath = (x1, y1, x2, y2, width, height) => {
    const startX = (x1 / 100) * width;
    const startY = (y1 / 100) * height;
    const endX = (x2 / 100) * width;
    const endY = (y2 / 100) * height;

    const curveHeight = Math.abs(endX - startX) * 0.18 + 25;
    const controlX = (startX + endX) / 2;
    const controlY = Math.min(startY, endY) - curveHeight;

    return `M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`;
  };

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        padding: "2rem",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          fontWeight: "600",
          color: "#222",
        }}
      >
        🌍 Website Visitor Dashboard
      </h2>

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1100,
          margin: "0 auto",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
          backgroundColor: "#fff",
        }}
      >
        {/* World Map Image */}
        <img
          src={worldMap}
          alt="World Map"
          style={{
            width: "100%",
            display: "block",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />

        {/* SVG Curved Lines */}
        <svg
          viewBox="0 0 1000 500"
          preserveAspectRatio="xMidYMid meet"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {visitors.map((v, i) => {
            if (i === 0 || !v.lat || !v.lon) return null;
            const prev = visitors[i - 1];
            if (!prev.lat || !prev.lon) return null;

            const curr = latLonToPercents(Number(v.lat), Number(v.lon));
            const prevPos = latLonToPercents(Number(prev.lat), Number(prev.lon));

            const pathD = createArcPath(prevPos.x, prevPos.y, curr.x, curr.y, 1000, 500);

            return (
              <path
                key={i}
                d={pathD}
                stroke="rgba(0,0,0,0.6)"
                strokeWidth="1.3"
                fill="none"
                strokeLinecap="round"
                style={{ opacity: 0.7 }}
              />
            );
          })}
        </svg>

        {/* Visitor Pins */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {visitors
            .filter((v) => v.lat && v.lon)
            .map((v, i) => {
              const pos = latLonToPercents(Number(v.lat), Number(v.lon));
              return (
                <img
                  key={i}
                  src={pinIcon}
                  alt="pin"
                  title={`${v.city || "Unknown"}, ${v.country || "Unknown"}`}
                  style={{
                    position: "absolute",
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    width: "22px",
                    height: "22px",
                    transform: "translate(-50%, -100%)",
                    zIndex: 10,
                  }}
                />
              );
            })}
        </div>
      </div>

   
    </div>
  );
}

export default WorldMapVisitors;
