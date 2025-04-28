import React from "react";
import { Link } from "react-router-dom";
import "../index.css"; // Import global styles
import logo from "../assets/company_logo.png"; // Import your logo image

const Navbar = () => {
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
            <Link to="/services">Services</Link>
          </li>
          <li className="navbar-button">
            <Link to="/product">Product</Link>
          </li>
          <li className="navbar-button">
            <Link to="/contact">Contact</Link>
          </li>
        </div>
        <div className="navbar-right">
          <Link to="/contact" className="get-in-touch">
            Get in touch
          </Link>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
