import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

import "./index.css";
import "./styles/ChatBox.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // 🔹 Only show splash for a very short time (0.8 sec)
    const timer = setTimeout(() => {
      // Smooth fade-out animation
      const el = document.getElementById("loading-screen");
      if (el) {
        el.style.opacity = "0";
        el.style.transition = "opacity 0.4s ease-out";
        setTimeout(() => setShowSplash(false), 400); // Remove after fade
      } else {
        setShowSplash(false);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen bg-gradient-to-b from-white via-violet-50 to-purple-100 overflow-hidden">
        {/* ✅ Show splash as overlay only once, no full reload */}
        {showSplash && <LoadingPage />}

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
          </Routes>
        </div>

        <Belowbar />
        <Chatbox />
      </div>
    </Router>
  );
}

export default App;
