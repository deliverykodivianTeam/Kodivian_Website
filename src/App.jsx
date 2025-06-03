import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Product from './pages/Product';
import Contact from './pages/Contact';
import ScanifyDetail from './pages/ScanifyDetail';
import Processbuilder from './pages/Processbuilder';
import Document from './pages/Document';
import Robort from './pages/Robort';
import './index.css'; // Import global styles
import Belowbar from './components/Belowbar'; // Import the Belowbar component

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  return (
    <Router>
      <div className="app-container">
        <AppNavbar />
        
        {/* Added Bootstrap's pt-5 class to ensure content starts below the fixed Navbar */}
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
      </div>
    </Router>
  );
}

export default App;
