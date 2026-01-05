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
import under from "../assets/under.png";

const Belowbar = () => {
  return (
    <div className="w-100 overflow-hidden">

      {/* INLINE CSS FIXES */}
      <style>
        {`
        .contact-row {
          display: flex !important;
          flex-direction: row !important;
          align-items: flex-start !important;
          gap: 15px !important;
          margin-top: 20px;
        }

        .contact-icons {
          display: flex;
          flex-direction: column;
          gap: 27px;
          min-width: 26px;
          color: #ffffff !important;
        }

        .contact-texts {
          display: flex;
          flex-direction: column;
          gap: 16px;
          color: #ffffff !important;
        }

        @media (max-width: 768px) {
          .contact-row {
            flex-direction: row !important;
            align-items: flex-start !important;
          }
          .contact-texts {
            font-size: 14px !important;
            gap: 13px;
            color: #ffffff !important;
          }
        }

        .content-with-background {
          background-image: url(${under});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
        }

        .content-with-background::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: -1;
        }

        .text-custom-white-900 { color: #ffffff; }
        .text-custom-white-300 { color: #d1d5db; }
        .btn-custom-purple {
          background-color: #8b5cf6;
          border-color: #8b5cf6;
          color: #fff;
        }
        `}
      </style>

      {/* MAIN FOOTER */}
      <div className="container-fluid p-4 text-white content-with-background position-relative">
        <div className="row justify-content-between align-items-start">

          {/* LEFT SIDE */}
          <div className="mb-4 col-12 col-md-6">

            <h3 className="fs-4 text-custom-white-900 fw-bold mb-3">
              Design better and spend less time <br /> without restricting tools creative freedom.
            </h3>

            <h6 className="text-custom-white-900 text-uppercase fs-6 mb-2">
              Sign-up to get interesting updates
            </h6>

            <div className="d-flex flex-column flex-sm-row mb-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control bg-light text-dark rounded py-2 px-3 fs-6 w-100 mb-2 mb-sm-0 me-sm-2"
              />
              <button className="btn btn-custom-purple fw-semibold py-2 px-4 rounded fs-6">
                Send
              </button>
            </div>

            {/* SOCIAL ICONS */}
            <div className="d-flex gap-3 mb-3">
              <Link to="https://www.linkedin.com/company/kodivian-technologies/posts/?feedView=all" className="btn btn-sm btn-outline-light">
                <FaLinkedin className="fs-5" />
              </Link>
              <Link to="https://x.com/i/flow/login?redirect_after_login=%2Fkodivian_tech" className="btn btn-sm btn-outline-light">
                <FaTwitter className="fs-5" />
              </Link>
              <Link to="https://www.instagram.com/kodivian_tech/" className="btn btn-sm btn-outline-light">
                <FaInstagram className="fs-5" />
              </Link>
              <Link to="https://www.facebook.com/p/Kodivian-Technology-100075879827039" className="btn btn-sm btn-outline-light">
                <FaFacebook className="fs-5" />
              </Link>
            </div>

            {/* ⭐ CONTACT ROW FIXED ⭐ */}
            <div className="contact-row">

              <div className="contact-icons">
                <FaLocationArrow className="fs-5" />
                <FaPhone className="fs-5" />
                <FaEnvelope className="fs-5" />
              </div>

              <div className="contact-texts">
                <p className="mb-0 text-white">Meenakshi Towers, No.13 Rajamannar St, T Nagar, Chennai, 600017</p>
                <p className="mb-0 text-white">+91 8870435343</p>
                <p className="mb-0 text-white">vijaysabari.m@kodivian.com</p>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE — MENUS */}
          <div className="col-12 col-md-6 mt-4 mt-md-0 d-flex flex-wrap">

            <div className="col-6 col-sm-4 mb-4">
              <h3 className="text-custom-white-900 fw-bold">OVERALL</h3>
              <a href="/" className="text-custom-white-300 d-block">Home</a>
              <a href="/about" className="text-custom-white-300 d-block">About</a>
              <a href="/product" className="text-custom-white-300 d-block">Product</a>
              <a href="/services" className="text-custom-white-300 d-block">Services</a>
              <a href="/contact" className="text-custom-white-300 d-block">Contact</a>
            </div>

            <div className="col-6 col-sm-4 mb-4">
              <h3 className="text-custom-white-900 fw-bold">PRODUCT</h3>
              <a href="/scanify" className="text-custom-white-300 d-block">Scanify</a>
              <a href="/processbuilder" className="text-custom-white-300 d-block">Process Builder</a>
              <a href="/supportforge" className="text-custom-white-300 d-block">Support Forge</a>
            </div>

            <div className="col-12 col-sm-4 mb-4">
              <h3 className="text-custom-white-900 fw-bold">SERVICES</h3>
              <a className="text-custom-white-300 d-block" href="/scanify">Artificial Intelligence</a>
              <a className="text-custom-white-300 d-block"  href="/processbuilder">Business Process Management</a>
              <a className="text-custom-white-300 d-block"  href="/services">Robotic Process Automation</a>
            </div>

          </div>

          <div className="w-100 fw-semibold text-white p-1 text-center small">
            Copyright © 2025 All Right Reserved & Designed By Kodivian Technologies
          </div>

        </div>
      </div>

    </div>
  );
};

export default Belowbar;
