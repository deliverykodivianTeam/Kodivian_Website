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
    <div className="w-100 overflow-hidden">
      {/* Custom styles */}
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

        /* Background image for the content section */
        .content-with-background {
            background-image: url(${under}); /* Use the imported image here */
            background-size: cover; /* Cover the entire area */
            background-position: center; /* Center the image */
            background-repeat: no-repeat; /* Do not repeat the image */
        }

        /* Dark overlay on top of the image for text readability */
        .content-with-background::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.75); /* Dark overlay */
            z-index: -1; /* Place behind content */
        }
        `}
      </style>

      <div className="container-fluid p-4 text-white content-with-background position-relative">
        <div className="row justify-content-between align-items-start">
          {/* Left Side Content */}
          <div className="mb-4 col-12 col-md-6">
            {" "}
            {/* Using col-md-6 for left half on medium and larger screens */}
            <h3 className="fs-4 text-custom-white-900 fw-bold mb-3">
              Design better and spend less time <br />
              without restricting tools creative freedom.
            </h3>
            <h6 className="text-custom-white-900 text-uppercase fs-6 mb-2">
              Sign-up to get interesting updates
            </h6>
            <div className="d-flex flex-column flex-sm-row mb-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control bg-light text-dark input-custom-border-pink rounded py-2 px-3 fs-6 w-100 w-sm-auto mb-2 mb-sm-0 me-sm-2 focus-outline-none"
              />
              <button className="btn btn-custom-purple fw-semibold py-2 px-4 rounded fs-6">
                Send
              </button>
            </div>
            <div className="d-flex gap-3 mb-3">
              {/* Social media icons */}
              <Link
                to="https://www.linkedin.com/company/kodivian-technologies/posts/?feedView=all"
                className="btn btn-sm btn-outline-light d-flex align-items-center justify-content-center text-custom-white-900 hover-bg-custom-pink-600 hover-text-white rounded"
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
                    className="text-custom-white-900 hover-text-white me-2 rounded"
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
                    className="text-custom-white-900 hover-text-white me-2 rounded"
                    aria-label="Call phone number"
                  >
                    <FaPhone className="fs-5" />
                  </Link>
                </div>
                <div className="d-flex align-items-center">
                  <Link
                    to="mailto:vijaysabari.m@kodivian.com?subject=Enquiry"
                    className="text-custom-white-900 hover-text-white me-2 rounded"
                    title="Opens your default email client"
                    aria-label="Send an email"
                  >
                    <FaEnvelope className="fs-5" />
                  </Link>
                </div>
              </div>
              <div className="d-flex flex-column gap-1">
                <p className="text-custom-white-900 mb-0">
                  Meenakshi Towers, No.13 Rajamannar St, T Nagar, Chennai,
                  600017
                </p>
                <p className="text-custom-white-900 mb-0">
                  +91 8870435343
                </p>
                <p className="text-custom-white-900 mb-0">
                  vijaysabari.m@kodivian.com
                </p>
              </div>
            </div>
          </div>

          {/* Right Side Navigation Links */}
          <div className="d-flex flex-wrap justify-content-start col-12 col-md-6 mt-4 mt-md-0">
            {" "}
            {/* Using col-md-6 for right half, and added mt-4 for mobile spacing */}
            {/* Overall */}
            <div className="d-flex flex-column gap-3 mb-4 col-6 col-sm-4 col-md-auto me-md-5">
              {" "}
              {/* Added me-md-5 here for more space */}
              <h3 className="text-custom-violet-300 fw-bold hover-text-white">
                OVERALL
              </h3>
              <a
                href="/"
                className="text-custom-white-300 text-decoration-none fw-semibold hover-text-custom-pink-200"
              >
                Home
              </a>
              <a
                href="/product"
                className="text-custom-white-300 text-decoration-none fw-semibold hover-text-custom-pink-200"
              >
                product
              </a>
              <a
                href="/strength"
                className="text-custom-white-300 text-decoration-none fw-semibold hover-text-custom-pink-200"
              >
                Strength
              </a>
              <a
                href="/contact"
                className="text-custom-white-300 text-decoration-none fw-semibold hover-text-custom-pink-200"
              >
                contact
              </a>
            </div>
            {/* PRODUCT */}
            <div className="d-flex flex-column gap-3 mb-4 col-6 col-sm-4 col-md-auto me-md-5">
              {" "}
              {/* Added me-md-5 here for more space */}
              <h3 className="text-custom-violet-300 fw-bold hover-text-white">
                PRODUCT
              </h3>
              <a
                href="/scanify"
                className="text-custom-white-300 text-decoration-none fw-semibold hover-text-custom-pink-200"
              >
                Scanify
              </a>
             <a
                href="/processbuilder"
                className="text-custom-white-300 text-decoration-none fw-semibold hover-text-custom-pink-200"
              >
                Process Builder
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
          <div className="w-100 fw-semibold text-white p-1 text-center small bg-opacity-75">
            Copyright © 2025 All Right Reserved & Designed By Kodivian
            Technologies
          </div>
        </div>
      </div>
    </div>
  );
};

export default Belowbar;
