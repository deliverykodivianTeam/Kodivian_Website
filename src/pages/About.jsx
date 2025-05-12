import React, { useState, useEffect, useRef } from "react";
import "../styles/About.css";
// Import the new Belowbar component
import Belowbar from '../components/Belowbar'; // Adjust the path if necessary
import {
  ClockIcon,
  UserGroupIcon,
  HeartIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import constructionImage from "../assets/Animated-Isometric-Construction.gif";
import about_intro from "../assets/about_intro.png";
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
import ezcloud from "../assets/ezcloud.png";
import ionidea from "../assets/ionidea.png";
import eastman from "../assets/eastman.png";
import underbanner from "../assets/purple-geometric.jpg";
import Chairman from "../assets/chairman.jpeg";
import Director from "../assets/directer.jpeg";
import Raja from "../assets/Raja.jpeg";
import Anjana from "../assets/Anjana.jpeg";
import Mothi from "../assets/Mothi.jpeg";
import Suganthi from "../assets/Suganthi.jpeg";
import Kaviya from "../assets/Kaviya.jpeg";
import Preethi from "../assets/Preethi.jpeg";

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
        
        <div
          className={`absolute top-0 left-0 w-full h-full flex items-center justify-start p-8 md:p-16 text-black ${
            typingComplete ? "typing-complete" : ""
          }`}
        >
          <div className="hero-about-info">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {typingText}
              {!typingComplete && (
                <span className="typed-cursor typed-cursor--blink">|</span>
              )}
              {typingComplete}
            </h1>
            <p className="about-para">
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
        <img // Add the previous image here
          src={constructionImage}
          alt="Construction Animation"
          className="styling_class" // You can add a CSS class for styling
        />
        <div className="styling_class_content">
          It serves to build trust and connection by showcasing who they are,
          what drives them, and the people behind their solutions.
        </div>
        <div className="rotating-solution-text" id="call-1">
          Shaping the future through innovative products{" "}
          <span className="colored-solution">
            {solutions[currentSolutionIndex]}
          </span>
        </div>
        <div className="about_content_image">
          <p className="intro_about_banner">
            At the heart of our innovation lies a powerful suite of intelligent
            automation products — Scanify for seamless document scanning and
            data capture, Process Builder to streamline complex workflows with
            no-code logic, RPA to automate repetitive tasks and boost
            efficiency, and IntelliDocs to create, manage, and deliver smart,
            dynamic documents
          </p>
          <img
            src={about_intro}
            alt="about_intro"
            className="about_content_image"
          />
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
              <img src={ezcloud} alt="EZ Cloud Logo" className="logo" />
              <img src={ionidea} alt="Ionidea Logo" className="logo" />
              <img src={eastman} alt="Eastman Logo" className="logo" />
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

      <div className="rotating-solution-text-1">
        Where vision meets execution — get to know the team powering Kodivian.
      </div>

      <div className="flex justify-center gap-8 py-8">
        <div className="text-center">
          <img
            src={Chairman}
            alt="Kodivian Team Member 3"
            className="w-100 h-100 rounded-full object-cover mb-2"
          />
          <h4 className="font-semibold">Sridhar Kamakoti</h4>
          <p className="text-sm text-gray-600">Chairman</p>
        </div>
        <div className="text-center">
          <img
            src={Director}
            alt="Kodivian Team Member 3"
            className="w-100 h-100 rounded-full object-cover mb-2"
          />
          <h4 className="font-semibold">Vijay Sabari</h4>
          <p className="text-sm text-gray-600">Director</p>
        </div>
        <div className="text-center">
          <img
            src={Raja}
            alt="Kodivian Team Member 3"
            className="w-100 h-100 rounded-full object-cover mb-2"
          />
          <h4 className="font-semibold">Raja SM</h4>
          <p className="text-sm text-gray-600">Business Analyst</p>
        </div>
        <div className="text-center">
          <img
            src={Anjana}
            alt="Kodivian Team Member 3"
            className="w-100 h-100 rounded-full object-cover mb-2"
          />
          <h4 className="font-semibold">Anjana</h4>
          <p className="text-sm text-gray-600">Marketing & Branding Strategist</p>
        </div>
        <div className="text-center">
          <img
            src={Mothi}
            alt="Kodivian Team Member 3"
            className="w-100 h-100 rounded-full object-cover mb-2"
          />
          <h4 className="font-semibold">Mothi Kumaresan</h4>
          <p className="text-sm text-gray-600">Business Development Manager</p>
        </div>
        <div className="text-center">
          <img
            src={Suganthi}
            alt="Kodivian Team Member 3"
            className="w-100 h-100 rounded-full object-cover mb-2"
          />
          <h4 className="font-semibold">Suganthi</h4>
          <p className="text-sm text-gray-600">Technical Project Manager</p>
        </div>
        <div className="text-center">
          <img
            src={Kaviya}
            alt="Kodivian Team Member 3"
            className="w-100 h-100 rounded-full object-cover mb-2"
          />
          <h4 className="font-semibold">Kaviya</h4>
          <p className="text-sm text-gray-600">Global PMO Executive</p>
        </div>
        <div className="text-center">
          <img
            src={Preethi}
            alt="Kodivian Team Member 3"
            className="w-100 h-100 rounded-full object-cover mb-2"
          />
          <h4 className="font-semibold">Preethi JB</h4>
          <p className="text-sm text-gray-600">Technical Consultant</p>
        </div>
        <div className="text-center">
          <img
            src={Director}
            alt="Kodivian Team Member 3"
            className="w-100 h-100 rounded-full object-cover mb-2"
          />
          <h4 className="font-semibold">Rithish PG</h4>
          <p className="text-sm text-gray-600">Technical Consultant</p>
        </div>
      </div>
      {/* Render the new Belowbar component here */}
            <Belowbar />
      </div>
  );
};

export default About;
