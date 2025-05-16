import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../index.css"; // Import global styles
import logo from "../assets/company_logo.png"; // Import your logo image
import DemoBookingPopup from '../components/DemoBookingPopup';

const Navbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <nav className="navbar">
      <ul>
        <div className="navbar-left">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Your Logo" className="company_logo" />
          </Link>
        </div>
        <div className="navbar-center">
          <li className="navbar-button">
            <Link to="/" className={activePath === "/" ? "active-glow" : ""}>Home</Link>
          </li>
          <li className="navbar-button">
            <Link to="/about" className={activePath === "/about" ? "active-glow" : ""}>About</Link>
          </li>
          <li className="navbar-button">
            <Link to="/product" className={activePath === "/product" ? "active-glow" : ""}>Product</Link>
          </li>
          <li className="navbar-button">
            <Link to="/services" className={activePath === "/services" ? "active-glow" : ""}>Services</Link>
          </li>
          <li className="navbar-button">
            <Link to="/contact" className={activePath === "/contact" ? "active-glow" : ""}>Contact</Link>
          </li>
            <button onClick={handleOpenPopup} className="demo-button">Request a Demo</button>
            <DemoBookingPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;