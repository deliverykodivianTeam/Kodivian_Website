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
import under from "../assets/under.png";

const Belowbar = () => {
  return (
    <div className="w-100 overflow-hidden">

      {/* Background + Overlay */}
      <div
        className="container-fluid p-4 text-white position-relative"
        style={{
          backgroundImage: `url(${under})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
        ></div>

        <div className="position-relative row justify-content-between">

          {/* LEFT SECTION */}
          <div className="col-12 col-md-6 mb-4">

            <h3 className="fw-bold mb-3">
              Design better and spend less time <br />
              without restricting tools creative freedom.
            </h3>

            <h6 className="text-uppercase mb-2">
              Sign-up to get interesting updates
            </h6>

            {/* FIXED: EMAIL + BUTTON MOBILE ALIGNMENT */}
            <div className="row g-2 mb-3">
              <div className="col-12 col-sm-8">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-control py-2"
                />
              </div>
              <div className="col-12 col-sm-4">
                <button className="btn w-100 py-2 text-white"
                  style={{ backgroundColor: "#8b5cf6" }}>
                  Send
                </button>
              </div>
            </div>

            {/* FIXED: SOCIAL ICONS CENTERED IN MOBILE */}
            <div className="d-flex gap-3 mb-3 flex-wrap">
              <a href="#" className="btn btn-outline-light rounded-circle p-2">
                <FaLinkedin />
              </a>
              <a href="#" className="btn btn-outline-light rounded-circle p-2">
                <FaTwitter />
              </a>
              <a href="#" className="btn btn-outline-light rounded-circle p-2">
                <FaInstagram />
              </a>
              <a href="#" className="btn btn-outline-light rounded-circle p-2">
                <FaFacebook />
              </a>
            </div>

            {/* FIXED: ADDRESS BLOCK ALIGNMENT */}
            <div className="d-flex mt-4">
              <div className="me-3">
                <p><FaLocationArrow /> </p>
                <p><FaPhone /> </p>
                <p><FaEnvelope /> </p>
              </div>

              <div>
                <p className="mb-1">
                  Meenakshi Towers, No.13 Rajamannar St, T Nagar, Chennai-600017
                </p>
                <p className="mb-1">+91 8870435343</p>
                <p className="mb-1">vijaysabari.m@kodivian.com</p>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION (NAV LINKS) */}
          <div className="col-12 col-md-6 mt-4 mt-md-0">

            <div className="row">

              {/* OVERALL */}
              <div className="col-6 col-md-4 mb-4">
                <h5 className="text-light fw-bold">OVERALL</h5>
                <a href="/" className="d-block text-white-50">Home</a>
                <a href="/about" className="d-block text-white-50">About</a>
                <a href="/product" className="d-block text-white-50">Product</a>
                <a href="/services" className="d-block text-white-50">Services</a>
                <a href="/contact" className="d-block text-white-50">Contact</a>
              </div>

              {/* PRODUCT */}
              <div className="col-6 col-md-4 mb-4">
                <h5 className="text-light fw-bold">PRODUCT</h5>
                <a href="/scanify" className="d-block text-white-50">Scanify</a>
                <a href="/processbuilder" className="d-block text-white-50">Process Builder</a>
                <a href="/supportforge" className="d-block text-white-50">Support Forge</a>
              </div>

              {/* SERVICES */}
              <div className="col-12 col-md-4 mb-4">
                <h5 className="text-light fw-bold">SERVICES</h5>
                <a href="#" className="d-block text-white-50">Artificial Intelligence</a>
                <a href="#" className="d-block text-white-50">Business Process Management</a>
                <a href="#" className="d-block text-white-50">Robotic Process Automation</a>
              </div>

            </div>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="text-center p-2 mt-3">
          Copyright © 2025 Kodivian Technologies — All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default Belowbar;
