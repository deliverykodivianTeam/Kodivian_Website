import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/company_logo.png";
import DemoBookingPopup from '../components/DemoBookingPopup';

const Navbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 flex items-center font-sans py-2">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Left section: Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Your Logo"
                className="h-20 mr-4 transition-transform duration-100 ease-in-out hover:scale-110"
              />
            </Link>
          </div>

          {/* Center section: Desktop Nav links */}
          <div className="hidden lg:flex flex-grow justify-center items-center">
            <ul className="flex list-none p-0 m-0 space-x-6">
              <li>
                <Link
                  to="/"
                  className={`text-black font-bold no-underline px-4 py-2 rounded-full transition-colors duration-300 ease-in-out hover:text-primary-purple hover:scale-105 transform ${activePath === "/" ? "text-primary-purple" : ""}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`text-black font-bold no-underline px-4 py-2 rounded-full transition-colors duration-300 ease-in-out hover:text-primary-purple hover:scale-105 transform ${activePath === "/about" ? "text-primary-purple" : ""}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/product"
                  className={`text-black font-bold no-underline px-4 py-2 rounded-full transition-colors duration-300 ease-in-out hover:text-primary-purple hover:scale-105 transform ${activePath === "/product" ? "text-primary-purple" : ""}`}
                >
                  Product
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className={`text-black font-bold no-underline px-4 py-2 rounded-full transition-colors duration-300 ease-in-out hover:text-primary-purple hover:scale-105 transform ${activePath === "/services" ? "text-primary-purple" : ""}`}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`text-black font-bold no-underline px-4 py-2 rounded-full transition-colors duration-300 ease-in-out hover:text-primary-purple hover:scale-105 transform ${activePath === "/contact" ? "text-primary-purple" : ""}`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Right section: Request a Demo Button */}
          {/* Added mt-1 to push the button down slightly */}
          <div className="hidden lg:flex items-center flex-shrink-0 mt-1"> 
            <button
              onClick={handleOpenPopup}
              className="bg-black text-white font-bold px-8 py-3 rounded-full cursor-pointer
                         transition-all duration-300 ease-in-out
                         hover:bg-primary-purple hover:scale-110"
            >
              Request a Demo
            </button>
          </div>

          {/* Mobile Menu Button (Hamburger) - visible on small screens */}
          <div className="lg:hidden">
            <button
              className="text-black focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop Overlay (Click to close menu) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 lg:hidden
                    ${isMobileMenuOpen ? "opacity-100 block" : "opacity-0 hidden"}`}
        onClick={toggleMobileMenu}
      ></div>

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white z-40 transform transition-transform duration-300 ease-in-out
                    w-3/4 sm:w-1/2 md:w-1/3 lg:hidden`}
        style={{ transform: isMobileMenuOpen ? "translateX(0%)" : "translateX(-100%)" }}
      >
        <div className="absolute top-4 right-4">
          <button
            className="text-black focus:outline-none p-2"
            onClick={toggleMobileMenu}
            aria-label="Close mobile menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <ul className="flex flex-col items-start pt-20 px-6 space-y-6 text-xl font-bold h-full">
          <li>
            <Link
              to="/"
              className={`text-black no-underline transition-colors duration-300 ease-in-out hover:text-primary-purple ${activePath === "/" ? "text-primary-purple" : ""}`}
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`text-black no-underline transition-colors duration-300 ease-in-out hover:text-primary-purple ${activePath === "/about" ? "text-primary-purple" : ""}`}
              onClick={toggleMobileMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/product"
              className={`text-black no-underline transition-colors duration-300 ease-in-out hover:text-primary-purple ${activePath === "/product" ? "text-primary-purple" : ""}`}
              onClick={toggleMobileMenu}
            >
              Product
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={`text-black no-underline transition-colors duration-300 ease-in-out hover:text-primary-purple ${activePath === "/services" ? "text-primary-purple" : ""}`}
              onClick={toggleMobileMenu}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`text-black no-underline transition-colors duration-300 ease-in-out hover:text-primary-purple ${activePath === "/contact" ? "text-primary-purple" : ""}`}
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
          </li>
          <li className="mt-8">
            <button
              onClick={handleOpenPopup}
              className="bg-black text-white font-bold px-8 py-3 rounded-full cursor-pointer
                         transition-all duration-300 ease-in-out text-base
                         hover:bg-primary-purple hover:scale-105"
            >
              Request a Demo
            </button>
          </li>
        </ul>
      </div>

      <DemoBookingPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </>
  );
};

export default Navbar;