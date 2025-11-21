import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import ScanifyDetail from "./pages/ScanifyDetail";
import Processbuilder from "./pages/Processbuilder";
import Document from "./pages/Document";
import Robort from "./pages/Robort";
import Belowbar from "./components/Belowbar";
import ScrollToTop from "./components/ScrollToTop";
import Chatbox from "./components/Chatbox";

import LoadingPage from "./components/LoadingPage";

import Adminlogin from "./pages/Adminlogin";
import VisitorDetails from "./pages/VisitorDetails";

import "./index.css";
import "./styles/ChatBox.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const BASE_URL = "http://127.0.0.1:5000";


// Wrapper component to conditionally render Belowbar/Chatbox
function AppContent() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);

  // Splash screen
  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.getElementById("loading-screen");
      if (el) {
        el.style.transition = "opacity 0.6s ease";
        el.style.opacity = "0";
        setTimeout(() => setShowSplash(false), 600);
      } else {
        setShowSplash(false);
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Visitor tracking
useEffect(() => {
  if (location.pathname !== "/") return;

  const track = async () => {
    try {
      // Get FULL GEOLOCATION from ipapi
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();

      await axios.post(`${BASE_URL}/track`, {
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country_name,
        lat: data.latitude,
        lon: data.longitude,
        timezone: data.timezone
      });
    } catch (err) {
      console.error("Tracking failed:", err);
    }
  };

  track();
}, [location.pathname]);




  const hideFooterRoutes = ["/admin", "/visitors-list"]; // routes to hide Belowbar and Chatbox

  const showFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-violet-50 to-purple-100 overflow-hidden">
      {showSplash && <LoadingPage />}
      {!showSplash && (
        <>
          <ScrollToTop />
          <AppNavbar />
          <div className="content pt-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/product" element={<Product />} />
              <Route path="/scanify" element={<ScanifyDetail />} />
              <Route path="/processbuilder" element={<Processbuilder />} />
              <Route path="/document" element={<Document />} />
              <Route path="/robort" element={<Robort />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Adminlogin />} />
              <Route path="/visitors-list" element={<VisitorDetails />} />
            </Routes>
          </div>
          {showFooter && <Belowbar />}
          {showFooter && <Chatbox />}
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
async function getClientIP() {
  const res = await fetch("https://api64.ipify.org?format=json");
  const data = await res.json();
  return data.ip; 
}


export default App;
