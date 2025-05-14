import React, { useState, useEffect, useRef } from "react";
import "../styles/About.css";
// Import the new Belowbar component
import Belowbar from "../components/Belowbar"; // Adjust the path if necessary
import {
  ClockIcon,
  UserGroupIcon,
  HeartIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import constructionImage from "../assets/Animated-Isometric-Construction.gif";
import about_intro from "../assets/about_intro.png";
import about_intro1 from "../assets/about_intro1.jpg";
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
import Chairman from "../assets/chairman.jpeg";
import Director from "../assets/directer.jpeg";
import Raja from "../assets/Raja.jpeg";
import Rithish from "../assets/Rithish.jpg"
import Anjana from "../assets/Anjana.jpeg";
import Mothi from "../assets/Mothi.jpeg";
import Suganthi from "../assets/Suganthi.jpeg";
import Kaviya from "../assets/Kaviya.jpeg";
import Preethi from "../assets/Preethi.jpeg";

const About = () => {
  const solutions = ["IntelliDocs", "Scanify", "RPA", "Process Builder"];
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
  const scrollingLogosRef = useRef(null);

  // Dummy data for team members (replace with your actual data)
  const teamMembers = [
    {
      name: "Sridhar Kamakoti",
      role: "Chairman",
      image: Chairman, // Use your imported images
      linkedin: "https://www.linkedin.com/in/sridhar-kamakoti", // Replace with actual LinkedIn URLs
    },
    {
      name: "Vijay Sabari",
      role: "Managing Director",
      image: Director,
      linkedin: "https://www.linkedin.com/in/vijay-sabari",
    },
    {
      name: "Raja SM",
      role: "Business Analyst",
      image: Raja,
      linkedin: "https://www.linkedin.com/in/raja-sm",
    },
    {
      name: "Anjana",
      role: "Marketing & Branding Strategist",
      image: Anjana,
      linkedin: "https://www.linkedin.com/", // Add actual
    },
    {
      name: "Mothi Kumaresan",
      role: "Business Development Manager",
      image: Mothi,
      linkedin: "https://www.linkedin.com/", // Add actual
    },
    {
      name: "Suganthi",
      role: "Technical Project Manager",
      image: Suganthi,
      linkedin: "https://www.linkedin.com/", // Add actual
    },
    {
      name: "Kaviya",
      role: "Global PMO Executive",
      image: Kaviya,
      linkedin: "https://www.linkedin.com/", // Add actual
    },
    {
      name: "Preethi JB",
      role: "Technical Consultant",
      image: Preethi,
      linkedin: "https://www.linkedin.com/", // Add actual
    },
    {
      name: "Rithish PG",
      role: "Technical Consultant",
      image: Rithish, // Assuming you want to reuse Director's image here.
      linkedin: "https://www.linkedin.com/", // Add actual
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSolutionIndex(
        (prevIndex) => (prevIndex + 1) % solutions.length
      );
    }, 1000);

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
      <div className="about-page fade-up">
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
            <div className="stat-number">4</div>
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
      <div className="about_content_image">
        <img // Add the previous image here
          src={constructionImage}
          alt="Construction Animation"
          className="about_content_image" // You can add a CSS class for styling
        />
        <p className="intro_about_banner_1">
          Drive seamless operations and intelligent document management with our
          innovative automation suite. Featuring Scanify for streamlined data
          capture, Process Builder for codeless workflow creation, RPA for task
          automation, and IntelliDocs for dynamic document generation and
          delivery.
        </p>
      </div>
      <div className="about_content_image">
        <p className="intro_about_banner">
          At the heart of our innovation lies a powerful suite of intelligent
          automation products — Scanify for seamless document scanning and data
          capture, Process Builder to streamline complex workflows with no-code
          logic, RPA to automate repetitive tasks and boost efficiency, and
          IntelliDocs to create, manage, and deliver smart, dynamic documents
        </p>
        <img
          src={about_intro1}
          alt="about_intro"
          className="about_content_image_1"
        />
      </div>

      <div className="about_content_image" style={{ backgroundColor: "black" }}>
        <img
          src={about_intro}
          alt="about_intro"
          className="about_content_image"
        />
        <p className="intro_about_banner" style={{ color: "white" }}>
          Our innovation engine drives efficiency through a powerful suite of
          intelligent automation tools. From Scannify's effortless document
          scanning and data capture to Process Builder's intuitive no-code
          workflow automation, RPA's ability to handle repetitive tasks, and
          IntelliDocs' smart document lifecycle management, we offer
          comprehensive solutions to elevate your operations.
        </p>
      </div>

      <div className="rotating-solution-text-1">
        Where vision meets execution — get to know the team powering Kodivian.
      </div>

      <div className="team-members-grid">
        {teamMembers.map((member, index) => (
          <div className="team-member-card" key={index}>
            <img
              src={member.image}
              alt={member.name}
              className="member-image"
            />
            <h4 className="member-name">{member.name}</h4>
            <p className="member-role">{member.role}</p>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="learn-more-button"
            >
              Learn More
            </a>
          </div>
        ))}
      </div>
      {/* Render the new Belowbar component here */}
      <Belowbar />
    </div>
  );
};

export default About;
