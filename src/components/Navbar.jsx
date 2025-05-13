import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css"; // Import global styles
import logo from "../assets/company_logo.png"; // Import your logo image
import DemoBookingPopup from '../components/DemoBookingPopup';

const Navbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
            <Link to="/">Home</Link>
          </li>
          <li className="navbar-button">
            <Link to="/about">About</Link>
          </li>
          <li className="navbar-button">
            <Link to="/product">Product</Link>
          </li>
          <li className="navbar-button">
            <Link to="/services">Services</Link>
          </li>
          <li className="navbar-button">
            <Link to="/contact">Contact</Link>
          </li>
            <button onClick={handleOpenPopup} className="demo-button">Request a Demo</button>
            <DemoBookingPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
