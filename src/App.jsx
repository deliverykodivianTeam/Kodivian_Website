import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import axios from "axios";

import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import ScanifyDetail from "./pages/ScanifyDetail";
import Processbuilder from "./pages/Processbuilder";
import Document from "./pages/Document";
import SupportForge from "./pages/SupportForge";
import Robort from "./pages/Robort";
import ScanifyBookingPage from "./pages/ScanifyBookingPage";
import ShortDemoPage from "./pages/ShortDemoPage";
import Belowbar from "./components/Belowbar";
import ScrollToTop from "./components/ScrollToTop";
import Chatbox from "./components/Chatbox";

import LoadingPage from "./components/LoadingPage";
import AnniversaryPopup from "./components/AnniversaryPopup";
import Adminlogin from "./pages/Adminlogin";
import VisitorDetails from "./pages/VisitorDetails";
import Certifications from "./pages/Certifications";
import Iso9001 from "./pages/Iso9001";
import Iso27001 from "./pages/Iso27001";

import "./index.css";
import "./styles/ChatBox.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// You can move this to .env later
const BASE_URL = "https://kodivian-website-5.onrender.com";


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
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // -------------------------------
  // ★ Visitor Tracking Logic
  // -------------------------------
  useEffect(() => {
    // Track ONLY when user visits home page ("/")
    if (location.pathname !== "/") return;

    const track = async () => {
      try {
        // 1) First get IP-based data
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        // 2) Use IP-based coordinates to avoid prompting the user for location permission
        const lat = data.latitude || null;
        const lon = data.longitude || null;

        // 3) Send final tracking data to backend
        await axios.post(`${BASE_URL}/track`, {
          ip: data.ip,
          city: data.city,
          region: data.region,
          country: data.country_name,
          lat,
          lon,
          timezone: data.timezone,
        });
      } catch (err) {
        console.error("Tracking failed:", err);
      }
    };

    // ❗ IMPORTANT: CALL THE FUNCTION
    track();
  }, [location.pathname]);

  // Hide footer on specific pages
  const hideFooterRoutes = ["/admin", "/visitors-list", "/scanify-booking", "/demo"];
  const showFooter = !hideFooterRoutes.some(route => location.pathname.startsWith(route));

  // Global toggle for Anniversary banner
  const ENABLE_ANNIVERSARY = true;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-violet-50 to-purple-100">
      {showSplash && <LoadingPage />}
      {!showSplash && (
        <>
          {ENABLE_ANNIVERSARY && <AnniversaryPopup />}
          <ScrollToTop />
          <AppNavbar />
          <div className="content" style={{ paddingTop: location.pathname === "/scanify-booking" ? "0px" : "90px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/certifications/iso-9001" element={<Iso9001 />} />
              <Route path="/certifications/iso-27001" element={<Iso27001 />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/demo" element={<ShortDemoPage />} />
              <Route path="/scanify-booking" element={<ScanifyBookingPage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/scanify" element={<ScanifyDetail />} />
              <Route path="/processbuilder" element={<Processbuilder />} />
              <Route path="/supportforge" element={<SupportForge />} />
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

export default App;
