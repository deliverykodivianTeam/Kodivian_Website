import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import VisitorsList from "./pages/VisitorsList";

import "./index.css";
import "./styles/ChatBox.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // 🟣 Show loading screen for 2.5 seconds
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

  // 🌍 Track visitor
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        await axios.post("http://127.0.0.1:5000/track", { ip: "" });
      } catch (err) {
        console.error("Visitor tracking failed:", err);
      }
    };
    trackVisitor();
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen bg-gradient-to-b from-white via-violet-50 to-purple-100 overflow-hidden">
        {/* 🟣 Show splash only while loading */}
        {showSplash && <LoadingPage />}

        {/* Main Content */}
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
                <Route path="/visitors" element={<VisitorsList />} />
              </Routes>
            </div>
            <Belowbar />
            <Chatbox />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
