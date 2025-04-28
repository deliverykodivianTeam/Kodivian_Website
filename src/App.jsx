import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Product from './pages/Product';
import Contact from './pages/Contact';
import ScanifyDetail from './pages/ScanifyDetail';
import Processbuilder from './pages/Processbuilder';
import './index.css'; // Import global styles


function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/product" element={<Product />} />
            <Route path="/scanify" element={<ScanifyDetail />} />
            <Route path="/processbuilder" element={<Processbuilder />} />
            <Route path="/contact" element={<Contact />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;