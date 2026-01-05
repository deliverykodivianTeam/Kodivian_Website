// WorldMapVisitors.jsx
import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import pinIconUrl from "../assets/location-pin.png"; // fallback icon; optional

const BASE_URL = "https://kodivian-website-5.onrender.com";


// Custom marker icon to avoid missing icon issues in CRA/Vite
const createIcon = (size = [28, 28]) =>
  new L.Icon({
    iconUrl: pinIconUrl,
    iconRetinaUrl: pinIconUrl,
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1]],
    popupAnchor: [0, -size[1]],
  });

function FitBoundsToMarkers({ markers }) {
  const map = useMap();
  useEffect(() => {
    const pts = markers
      .filter((m) => m.lat !== null && m.lon !== null)
      .map((m) => [m.lat, m.lon]);

    if (pts.length === 0) return;
    if (pts.length === 1) {
      map.setView(pts[0], 10); // zoom default
      return;
    }
    const bounds = L.latLngBounds(pts);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [markers, map]);
  return null;
}

export default function WorldMapVisitors() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

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
    const id = setInterval(fetchVisitors, 30000);
    return () => clearInterval(id);
  }, []);

  // draw polyline between last N visitors (most recent sequential route)
  const polyPoints = visitors
    .filter((v) => v.lat !== null && v.lon !== null)
    .slice(0, 40) // show last up to 40
    .map((v) => [v.lat, v.lon])
    .reverse(); // reverse so oldest -> newest

  return (
    <div style={{ padding: "1.5rem", maxWidth: 1100, margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: 16 }}>🌍 Live Visitors</h2>

      <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 6px 20px rgba(0,0,0,0.12)" }}>
        <MapContainer
          center={[20, 0]}
          zoom={2}
          minZoom={2}
          maxZoom={18} 
          style={{ height: "580px", width: "100%" }}
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        >
          <TileLayer
            attribution='© OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FitBoundsToMarkers markers={visitors} />

          {/* Polyline showing recent route */}
          {polyPoints.length > 1 && (
            <Polyline positions={polyPoints} weight={2} opacity={0.6} />
          )}

          {/* Markers */}
          {visitors
            .filter((v) => v.lat !== null && v.lon !== null)
            .map((v) => (
              <Marker
                key={v.id}
                position={[v.lat, v.lon]}
                icon={createIcon([26, 26])}
              >
                <Popup closeButton={true} autoPan={true}>
                  <div style={{ minWidth: 180 }}>
                    <strong>{v.city || "Unknown"}</strong>
                    <div>{v.state ? v.state + ", " : ""}{v.country}</div>
                    <div style={{ fontSize: 12, color: "#666", marginTop: 6 }}>
                      IP: {v.ip} <br />
                      Local: {v.timestamp_local}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>

      <div style={{ marginTop: 12, textAlign: "center", color: "#555" }}>
        {loading ? "Loading visitors…" : `${visitors.length} visitor(s) recorded`}
      </div>
    </div>
  );
}
