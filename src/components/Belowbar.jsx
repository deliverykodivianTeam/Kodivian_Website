// src/components/Bottom.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaLocationArrow,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import under from "../assets/under.png"; // Make sure the path is correct relative to Bottom.jsx

const Belowbar = () => {
  return (
    // Ensure Bootstrap CSS is imported in your main App.js or index.js
    // For example: import 'bootstrap/dist/css/bootstrap.min.css';

    <div className="position-relative w-100 overflow-hidden">
      {/* Custom styles for specific colors and hover effects that don't have direct Bootstrap equivalents */}
      <style>
        {`
        /* Custom Colors (approximating Tailwind colors) */
        .text-custom-pink-400 { color: #f06292; } /* Equivalent to Tailwind's pink-400 */
        .text-custom-violet-300 { color: #c4b5fd; } /* Equivalent to Tailwind's violet-300 */
        .text-custom-white-900 { color: #ffffff; } /* Assuming white-900 is pure white */
        .text-custom-white-300 { color: #d1d5db; } /* Lighter white/gray for general links */

        /* Custom Button */
        .btn-custom-purple {
            background-color: #8b5cf6; /* Equivalent to Tailwind's purple-500 */
            border-color: #8b5cf6;
            color: #fff;
        }
        .btn-custom-purple:hover {
            background-color: #ec4899; /* Equivalent to Tailwind's pink-600 */
            border-color: #ec4899;
            color: #fff;
        }

        /* Custom Input Styling */
        .input-custom-border-pink {
            border-color: #db2777; /* Equivalent to Tailwind's pink-700 */
        }
        .input-custom-border-pink:focus {
            border-color: #ec4899; /* Equivalent to Tailwind's pink-500 */
            box-shadow: 0 0 0 0.25rem rgba(236, 72, 153, 0.25); /* Bootstrap-like focus ring */
        }
        .input-custom-hover-purple:hover {
            background-color: #a78bfa !important; /* Equivalent to Tailwind's purple-400 */
            color: #fff !important; /* Text color on hover */
        }

        /* Custom Social Icon Background */
        .bg-custom-purple-900 { background-color: #5b21b6; } /* Equivalent to Tailwind's purple-900 */

        /* Custom Hover Effects for text and background */
        .hover-text-custom-pink-400:hover { color: #f06292 !important; }
        .hover-text-white:hover { color: #ffffff !important; }
        .hover-bg-custom-pink-600:hover { background-color: #db2777 !important; }
        .hover-text-custom-pink-200:hover { color: #fbcfe8 !important; }
        .hover-text-custom-pink-900:hover { color: #831843 !important; } /* A darker pink for copyright text */
        `}
      </style>

      <img
        src={under}
        alt="Wave Banner"
        className="img-fluid w-100" // `img-fluid` makes image responsive, `w-100` ensures it takes full width
      />
      <div className="position-absolute top-0 start-0 w-100 p-4 p-md-5 text-white d-flex flex-column flex-md-row justify-content-between align-items-start mb-2">
        {/* Left Side Content */}
        <div className="mb-4 col-12 col-md-5 me-md-4">
          <h3 className="fs-4 text-custom-white-900 fw-bold mb-3 hover-text-custom-pink-400">
            Design better and spend less time <br />
            without restricting tools creative freedom.
          </h3>
          <h6 className="text-custom-white-900 text-uppercase fs-6 mb-2 hover-text-custom-pink-400">
            Sign-up to get interesting updates
          </h6>
          <div className="d-flex flex-column flex-sm-row mb-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control bg-light text-dark input-custom-border-pink rounded py-2 px-3 fs-6 w-100 w-sm-auto mb-2 mb-sm-0 me-sm-2 focus-outline-none input-custom-hover-purple"
            />
            <button className="btn btn-custom-purple fw-semibold py-2 px-4 rounded fs-6">
              Send
            </button>
          </div>
          <div className="d-flex gap-3 mb-3">
            {/* Social media icons */}
            <Link
              to="https://www.linkedin.com/company/kodivian-technologies/posts/?feedView=all"
              className="btn btn-sm btn-outline-light d-flex align-items-center justify-content-center bg-custom-purple-900 hover-bg-custom-pink-600 hover-text-white rounded"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="fs-5" />
            </Link>{" "}
            <Link
              to="https://x.com/i/flow/login?redirect_after_login=%2Fkodivian_tech"
              className="btn btn-sm btn-outline-light d-flex align-items-center justify-content-center text-custom-white-900 hover-bg-custom-pink-600 hover-text-white rounded"
              aria-label="Twitter Profile"
            >
              <FaTwitter className="fs-5" />
            </Link>{" "}
            <Link
              to="https://www.instagram.com/kodivian_tech/"
              className="btn btn-sm btn-outline-light d-flex align-items-center justify-content-center text-custom-white-900 hover-bg-custom-pink-600 hover-text-white rounded"
              aria-label="Instagram Profile"
            >
              <FaInstagram className="fs-5" />
            </Link>{" "}
            <Link
              to="https://www.facebook.com/p/Kodivian-Technology-100075879827039"
              className="btn btn-sm btn-outline-light d-flex align-items-center justify-content-center text-custom-white-900 hover-bg-custom-pink-600 hover-text-white rounded"
              aria-label="Facebook Page"
            >
              <FaFacebook className="fs-5" />
            </Link>{" "}
          </div>
          <div className="d-flex align-items-start mt-4">
            <div className="d-flex flex-column gap-3 pe-3">
              {" "}
              <div className="d-flex align-items-center">
                <Link
                  to="https://www.google.com/maps/search/Meenakshi+Towers,+No.13+Rajamannar+St,+T+Nagar,+Chennai,+600017" // More specific Google Maps search link
                  className="text-custom-white-900 hover-bg-custom-pink-600 hover-text-white me-2 rounded"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View location on Google Maps"
                >
                  <FaLocationArrow className="fs-5" />
                </Link>
              </div>
              <div className="d-flex align-items-center">
                <Link
                  to="tel:+918870435343"
                  className="text-custom-white-900 hover-bg-custom-pink-600 hover-text-white me-2 rounded"
                  aria-label="Call phone number"
                >
                  <FaPhone className="fs-5" />
                </Link>
              </div>
              <div className="d-flex align-items-center">
                <Link
                  to="mailto:vijaysabari.m@kodivian.com?subject=Enquiry"
                  className="text-custom-white-900 hover-bg-custom-pink-600 hover-text-white me-2 rounded"
                  title="Opens your default email client"
                  aria-label="Send an email"
                >
                  <FaEnvelope className="fs-5" />
                </Link>
              </div>
            </div>
            <div className="d-flex flex-column gap-1">
              <p className="text-custom-white-900 hover-text-custom-pink-400 mb-0">
                Meenakshi Towers, No.13 Rajamannar St, T Nagar, Chennai, 600017
              </p>
              <p className="text-custom-white-900 hover-text-custom-pink-400 mb-0">+91 8870435343</p>
              <p className="text-custom-white-900 hover-text-custom-pink-400 mb-0">vijaysabari.m@kodivian.com</p>
            </div>
          </div>
        </div>

        {/* Right Side Navigation Links */}
        <div className="d-flex flex-wrap justify-content-around col-12 col-md-7 mt-4 mt-md-0">
          {/* Overall */}
          <div className="d-flex flex-column gap-3 mb-4 col-6 col-sm-4 col-md-auto">
            <h3 className="text-custom-violet-300 fw-bold hover-text-white">
              OVERALL
            </h3>
            <a
              href="#welcome"
              className="text-custom-white-300 text-decoration-none fw-semibold hover-text-custom-pink-200"
            >
              Home
            </a>
            <a
              href="#search"
              className="text-custom-white-300 text-decoration-none fw-semibold hover-text-custom-pink-200"
            >
              Search
            </a>
            <a
              href="#optimizeStrength"
              className="text-custom-white-300 text-decoration-none fw-semibold hover-text-custom-pink-200"
            >
              Strength
            </a>
            <a
              href="#frame"
              className="text-custom-white-300 text-decoration-none fw-semibold hover-text-custom-pink-200"
            >
              Framework
            </a>
          </div>
          {/* PRODUCT */}
          <div className="d-flex flex-column gap-3 mb-4 col-6 col-sm-4 col-md-auto">
            <h3 className="text-custom-violet-300 fw-bold hover-text-white">
              PRODUCT
            </h3>
            <a
              href="#link2-1"
              className="text-custom-white-300 text-decoration-none fw-semibold hover-text-custom-pink-200"
            >
              Scanify
            </a>
            <a
              href="#link2-2"
              className="text-custom-white-300 text-decoration-none fw-semibold hover-text-custom-pink-200"
            >
              Intellidocs
            </a>
            <a
              href="#link2-3"
              className="text-custom-white-300 text-decoration-none fw-semibold hover-text-custom-pink-200"
            >
              Process Builder
            </a>
            <a
              href="#link2-4"
              className="text-custom-white-300 text-decoration-none fw-semibold hover-text-custom-pink-200"
            >
              RPA
            </a>
          </div>
          {/* SERVICES */}
          <div className="d-flex flex-column gap-3 mb-4 col-12 col-sm-4 col-md-auto">
            <h3 className="text-custom-violet-300 fw-bold hover-text-white">
              SERVICES
            </h3>
            <a
              href="#ai"
              className="text-custom-white-300 text-decoration-none fw-semibold hover-text-custom-pink-200"
            >
              Artificial Intelligence
            </a>
            <a
              href="#bpm"
              className="text-custom-white-300 text-decoration-none fw-semibold hover-text-custom-pink-200"
            >
              Business Process Management
            </a>
            <a
              href="#rpa"
              className="text-custom-white-300 text-decoration-none fw-semibold hover-text-custom-pink-200"
            >
              Robotic Process Automation
            </a>
          </div>
        </div>
      </div>
      {/* Copyright and Design Info */}
      <div className="position-absolute bottom-0 start-0 w-100 fw-semibold text-white hover-text-custom-pink-900 p-1 text-center small">
        Copyright © 2025 All Right Reserved & Designed By KodivianTechnologies
      </div>
    </div>
  );
};

export default Belowbar;