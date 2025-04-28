import React, { useState, useEffect, useRef } from "react";
import "../styles/About.css";
import {
  ClockIcon,
  UserGroupIcon,
  HeartIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import ponpureLogo from "../assets/ponpure.png";
import tiCycleLogo from "../assets/ti-cycle.png";
import murugappaLogo from "../assets/murugappa.png";
import khazanaLogo from "../assets/khazana.png";
import sharatIndustriesLogo from "../assets/sharat-industries.png";
import dabicoLogo from "../assets/dabico.png";
import dmccLogo from "../assets/dmcc.png";
import aavaBrandsLogo from "../assets/aava-brands.png";
import tiMedicallogo from "../assets/ti_medical.png";
import Innoventure_logo from "../assets/3xper_innoventure_limited_logo.png";
import shanthigearslogo from "../assets/shanthi-gears.png";
import underbanner from "../assets/purple-geometric.jpg";
import PurpleWave from "../assets/purple-wave.png";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaLocationArrow,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { RxFontRoman } from "react-icons/rx";

const About = () => {
  const solutions = ["IntelliDocs", "Scanify", "RPA", "Process Builder"];
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
  const scrollingLogosRef = useRef(null);
  const [typingText, setTypingText] = useState("");
  const fullText = "We grow your business";
  const typingSpeed = 100; // milliseconds per character
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    let timer;
    if (typingText.length < fullText.length) {
      timer = setTimeout(() => {
        setTypingText(fullText.substring(0, typingText.length + 1));
      }, typingSpeed);
    } else {
      setTypingComplete(true);
      clearTimeout(timer); // Ensure timer is cleared when typing is complete
    }
    return () => clearTimeout(timer);
  }, [typingText, fullText]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSolutionIndex(
        (prevIndex) => (prevIndex + 1) % solutions.length
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, [solutions.length]);

  const handleMouseEnter = () => {
    if (scrollingLogosRef.current) {
      scrollingLogosRef.current.style.animationPlayState = "paused";
    }
  };

  const handleMouseLeave = () => {
    if (scrollingLogosRef.current) {
      scrollingLogosRef.current.style.animationPlayState = "running";
    }
  };

  return (
    <div>
      <div className="about-page">
        <img
          src={PurpleWave}
          alt="Purple Wave Design"
          className="wave-header"
        />
        <div
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-start p-8 md:p-16 text-black ${
              typingComplete ? "typing-complete" : ""
            }`}
          >
            <div className="hero-services-info">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {typingText}
                {!typingComplete && (
                  <span className="typed-cursor typed-cursor--blink">|</span>
                )}
                {typingComplete}
              </h1>
              <p className="para">
                Start with a plan and finish with results
              </p>
              <div className="flex mt-6">
                <a href="#call-1">
                <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-md mr-4 transition-colors duration-300">
                  Read More
                </button>
                </a>
              </div>
            </div>
          </div>
        <div className="rotating-solution-text" id="call-1">
          Shaping the future through innovative products{" "}
          <span className="colored-solution">
            {solutions[currentSolutionIndex]}
          </span>
        </div>

        <div className="about-stats-container">
          <div className="about-stat-box">
            <div className="stat-icon">
              <ClockIcon className="w-8 h-8 text-purple-500" />
            </div>
            <div className="stat-number">3</div>
            <div className="stat-label">Years Experience</div>
          </div>

          <div className="about-stat-box">
            <div className="stat-icon">
              <UserGroupIcon className="w-8 h-8 text-purple-500" />
            </div>
            <div className="stat-number">30</div>
            <div className="stat-label">Team Members</div>
          </div>

          <div className="about-stat-box">
            <div className="stat-icon">
              <HeartIcon className="w-8 h-8 text-purple-500" />
            </div>
            <div className="stat-number">25</div>
            <div className="stat-label">Satisfied Clients</div>
          </div>

          <div className="about-stat-box">
            <div className="stat-icon">
              <CheckCircleIcon className="w-8 h-8 text-purple-500" />
            </div>
            <div className="stat-number">50</div>
            <div className="stat-label">Complete Projects</div>
          </div>
        </div>

        <div className="scrolling-logos-container">
          <h1 className="framer-text">
            Innovation. Trust. Delivered with excellence
          </h1>
          <div
            ref={scrollingLogosRef}
            className="scrolling-logos"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="logos-set">
              <img src={ponpureLogo} alt="Ponpure Logo" className="logo" />
              <img src={tiCycleLogo} alt="TI Cycle Logo" className="logo" />
              <img src={murugappaLogo} alt="Murugappa Logo" className="logo" />
              <img src={khazanaLogo} alt="Khazana Logo" className="logo" />
              <img
                src={sharatIndustriesLogo}
                alt="Sharat Industries Logo"
                className="logo"
              />
              <img src={dabicoLogo} alt="Dabico Logo" className="logo" />
              <img src={dmccLogo} alt="DMCC Logo" className="logo" />
              <img
                src={aavaBrandsLogo}
                alt="Aava Brands Logo"
                className="logo"
              />
              <img src={tiMedicallogo} alt="Ti Medical" className="logo" />
              <img
                src={Innoventure_logo}
                alt="Innoventure Logo"
                className="logo"
              />
              <img
                src={shanthigearslogo}
                alt="Shanthi Gears Logo"
                className="logo"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Wave Image with Overlay Content */}
      <div className="relative w-full overflow-hidden">
        <img
          src={underbanner}
          alt="Wave Banner"
          className="w-full block transition-opacity duration-500 opacity-90 hover:opacity-100"
        />
        <div className="absolute top-0 left-0 w-full p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-start ">
          {/* Left Side Content */}
          <div className="mb-6 md:mb-0 top-0">
            <h3 className="text-xl text-gray-800 hover:text-purple-700 font-bold mb-2">
              <p>
                Design better and spend less time <br />
                without restricting tools creative freedom.
              </p>
            </h3>
            <h6 className="text-gray-800 uppercase text-xs mb-2">
              Sign-up to get interesting updates
            </h6>
            <div className="flex flex-col sm:flex-row mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white text-sm w-full sm:w-auto mb-2 sm:mb-0 sm:mr-2 focus:outline-none focus:border-purple-500"
              />
              <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors duration-300">
                Send
              </button>
            </div>
            <div className="flex space-x-4">
              {/* Add your social media icons/links here */}
              <Link
                to="https://www.linkedin.com/company/kodivian-technologies/posts/?feedView=all"
                className="text-gray-400 hover:text-white"
              >
                <FaLinkedin className="w-5 h-5 fill-current" />
              </Link>{" "}
              {/* Linkdin*/}
              <Link
                to="https://x.com/i/flow/login?redirect_after_login=%2Fkodivian_tech"
                className="text-gray-400 hover:text-white"
              >
                <FaTwitter className="w-5 h-5 fill-current" />
              </Link>{" "}
              {/* Twitter */}
              <Link
                to="https://www.instagram.com/kodivian_tech/"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram className="w-5 h-5 fill-current" />
              </Link>{" "}
              {/*INstagram */}
              <Link
                to="https://www.facebook.com/p/Kodivian-Technology-100075879827039"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebook className="w-5 h-5  fill-current" />
              </Link>{" "}
              {/* Facebook */}
              <br />
            </div>
            <div className="flex  bottom-0">
              <div className="flex flex-col bottom-0 space-y-3 pr-4">
                {" "}
                {/* Added pr-4 for spacing between icon and text */}
                <div className="flex items-center">
                  <Link
                    to="https://maps.google.com/?q=Meenakshi+Towers,No.13+Rajamannar+St,T+Nagar,+Chennai,+600017" // Corrected Google Maps link
                    className="text-gray-400 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLocationArrow className="w-5 h-4" />
                  </Link>
                </div>
                <div className="flex items-center">
                  <Link
                    to="tel:+918870435343" // Corrected phone number format
                    className="text-gray-400 hover:text-white"
                  >
                    <FaPhone className="w-5 h-4" />
                  </Link>
                </div>
                <div className="flex items-center">
                  <Link
                    to="mailto:vijaysabari.m@kodivian.com?subject=Enquiry"
                    className="text-gray-400 hover:text-white"
                    title="Opens your default email" // Added a title attribute
                  >
                    <FaEnvelope className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="flex flex-col bottom-0 space-y-0 pr-4">
                <p className="text-gray-900 ">
                  Meenakshi Towers, No.13 Rajamannar St, T Nagar, Chennai,
                  600017
                </p>
                <p className="text-gray-900 ">+91 8870435343</p>
                <p className="text-gray-900 ">vijaysabari.m@kodivian.com</p>
              </div>
            </div>
          </div>

          {/* Right Side Navigation Links */}
          <div className="flex">
            <div className="flex-1 flex flex-col space-y-4 space-x-4">
              <h3 className="text-purple-700 hover:text-gray-900 font-bold ">
                OVERALL
              </h3>
              <a
                href="#welcome"
                className="text-gray-800 hover:text-purple-700 duration-300 font-semibold"
              >
                Home
              </a>
              <a
                href="#search"
                className="text-gray-800 hover:text-purple-700 duration-300 font-semibold"
              >
                Search
              </a>
              <a
                href="#optimizeStrength"
                className="text-gray-800 hover:text-purple-700 duration-300 font-semibold"
              >
                Strength
              </a>
              <a
                href="#frame"
                className="text-gray-800 hover:text-purple-700 duration-300 font-semibold"
              >
                Framework
              </a>
            </div>
            <div className="flex-1 flex flex-col space-y-4 space-x-4">
              <h3 className="text-purple-700 hover:text-gray-900 font-bold ">
                PRODUCT
              </h3>
              <a
                href="#link2-1"
                className="text-gray-800 hover:text-purple-700 duration-300 font-semibold"
              >
                Scanify
              </a>
              <a
                href="#link2-2"
                className="text-gray-800 hover:text-purple-700 duration-300 font-semibold"
              >
                Intellidocs
              </a>
              <a
                href="#link2-3"
                className="text-gray-800 hover:text-purple-700 duration-300 font-semibold"
              >
                Process Builder
              </a>
              <a
                href="#link2-4"
                className="text-gray-800 hover:text-purple-700 duration-300 font-semibold"
              >
                RPA
              </a>
            </div>
            <div className="flex-1 flex flex-col space-y-5 space-x-0">
              <h3 className="text-purple-700 hover:text-gray-900 font-bold ">
                SERVICES
              </h3>
              <a
                href="#ai"
                className="text-gray-800 hover:text-purple-700 duration-300 font-semibold"
              >
                Artificial Intelligence
              </a>
              <a
                href="#bpm"
                className="text-gray-800 hover:text-purple-700 duration-300 font-semibold"
              >
                Business Process Management
              </a>
              <a
                href="#rpa"
                className="text-gray-800 hover:text-purple-700 duration-300 font-semibold"
              >
                Robotic Process Automation
              </a>
            </div>
          </div>
        </div>
        {/* Copyright and Design Info */}
        <div className="absolute bottom-0 font-semibold mb-6 md:mb-0 w-full text-white p-4 text-center text-xs">
          Copyright © 2025 All Right Reserved & Designed By KodivianTechnologies
        </div>
      </div>
    </div>
  );
};

export default About;
