import React, { useState, useEffect, useRef } from "react";
import "../styles/Services.css";

// Import your new images from the assets folder
import image2 from "../assets/intro_1.png";
import intro_2 from "../assets/intro_2.png";
import intro_3 from "../assets/intro_3.png";
import intro_4 from "../assets/intro_4.png";
import underbanner from "../assets/purple-geometric.jpg";
import PurpleWave from "../assets/purple-wave.png";

import { FaAws } from "react-icons/fa"; // For AWS
import { VscAzure } from "react-icons/vsc";
import { BiLogoGoogleCloud } from "react-icons/bi";
import { GrOracle } from "react-icons/gr";

import { GrMysql } from "react-icons/gr";
import { BiLogoMongodb } from "react-icons/bi";
import { BiLogoPostgresql } from "react-icons/bi";

import { FaPython } from "react-icons/fa";
import { BiLogoJavascript } from "react-icons/bi";
import { FaJava } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";

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

const Services = () => {
  const [typingText, setTypingText] = useState("");
  const fullText = "We simplify your infrastructure";
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

  return (
    <div>
      <div className="services-page-layout">
        {/* Hero Section with Services Info */}
        <div className="hero-section relative w-full overflow-hidden">
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
            <div className="hero-services-info fade-up">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {typingText}
                {!typingComplete && (
                  <span className="typed-cursor typed-cursor--blink">|</span>
                )}
                {typingComplete}
              </h1>
              <p className="mb-2">
                so you can focus on <span className="highlight">what</span>{" "}
                <span className="highlight">matters</span>.
              </p>
              <div className="flex mt-6">
                <a href="#call">
                  <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-md mr-4 transition-colors duration-300">
                    Learn More
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* REMOVED SLIDER SECTION */}
      <h2 className="head fade-up">Core Services</h2>
      <div className="content-with-image">
        <img
          src={image2} // Use the second imported image
          alt="Description of image 2"
          className="content-image"
        />
        <p className="large-text">
          We are an Amazon Web Services (AWS) Partnership company using the
          power of Cloud technology to build better futures for our customers.
          Kodivian Technologies helps business move forward, faster by combining
          deep industry expertise and frictionless technology delivery.
        </p>
      </div>
      <div className="cloudSupportContainer" id="call">
        <div className="leftSection">
          <p className="cloudSupportTitle">Support for every cloud.</p>
        </div>
        <div className="rightSection">
          <div className="cloudProviderLogos">
            <div className="cloudProviderItem">
              <BiLogoGoogleCloud size={250} style={{ color: '#4285F4' }} />
            </div>
            <div className="cloudProviderItem">
              <FaAws size={250} />
            </div>
            <div className="cloudProviderItem">
              <GrOracle size={250} style={{ color: '#F80000' }} />
            </div>
            <div className="cloudProviderItem">
              <VscAzure size={250} style={{ color: '#0078D4' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="content-with-image">
        <img
          src={intro_3} // Use the second imported image
          alt="Description of image 2"
          className="content-image"
        />
        <p className="large-text">
          Our Product Engineering Services provide comprehensive support
          throughout the entire product lifecycle. From the initial
          Conceptualization & Design phase, where we assist in preparing
          detailed product specifications and generating innovative ideas,
          through Agile Development, where we build robust solutions with timely
          delivery in mind, to rigorous Testing & Launch, ensuring thorough
          quality assurance and on-schedule product release. We are dedicated to
          bringing your product vision to life with expertise and efficiency.
        </p>
      </div>

      <div className="buildScaleGrowContainer">
        <p className="buildScaleGrowText">Build.</p>
        <p className="buildScaleGrowText">Scale.</p>
        <p className="buildScaleGrowText">Grow.</p>
      </div>

      <div className="content-with-image">
        <img
          src={intro_2} // Use the second imported image
          alt="Description of image 2"
          className="content-image"
        />
        <p className="large-text">
          Kodivian Scanify is our comprehensive solution for digital workplace
          automation, streamlining business processes through intelligent
          automation and efficient information management. Key features include
          effortless document capture and indexing, robust workflow automation,
          customizable forms with e-signatures, advanced search and retrieval,
          seamless integration with CRMs, ERPs, DocuSign, Adobe Sign, and Google
          Workspace, and AI-powered bots for workflow optimization. Designed to
          accelerate business progress through expert knowledge and smooth
          technology delivery, contact us to transform your digital workplace.
        </p>
      </div>

      <div className="cloudSupportContainer">
        <div className="leftSection">
          <div className="cloudProviderLogos">
            <div className="cloudProviderItem">
              <GrMysql size={250} style={{ color: '#F29111' }} />
            </div>
            <div className="cloudProviderItem">
              <BiLogoPostgresql size={250} style={{ color: '#336791' }} />
            </div>
            <div className="cloudProviderMongoDB">
              <BiLogoMongodb size={250} style={{ color: '#47A248' }} />
            </div>
          </div>
        </div>
        <div className="rightSection">
          <p className="cloudSupportTitle">Systems fade, but data remains.</p>
        </div>
      </div>

      <div className="content-with-image">
        <img
          src={intro_4} // Use the second imported image
          alt="Description of image 2"
          className="content-image"
        />
        <p className="large-text">
          Kodivian Scanify is our comprehensive solution for digital workplace
          automation, streamlining business processes through intelligent
          automation and efficient information management. Key features include
          effortless document capture and indexing, robust workflow automation,
          customizable forms with e-signatures, advanced search and retrieval,
          seamless integration with CRMs, ERPs, DocuSign, Adobe Sign, and Google
          Workspace, and AI-powered bots for workflow optimization. Designed to
          accelerate business progress through expert knowledge and smooth
          technology delivery, contact us to transform your digital workplace.
        </p>
      </div>

      <div className="cloudSupportContainer">
        <div className="leftSection">
          <p className="cloudSupportTitle">No error is the best message.</p>
        </div>
        <div className="rightSection">
          <div className="cloudProviderLogos">
            <div className="cloudProviderItem">
              <FaPython size={250} style={{ color: '#3776AB' }} />
            </div>
            <div className="cloudProviderItem">
              <FaJava size={250} style={{ color: '#007396' }} />
            </div>
            <div className="cloudProviderItem">
              <BiLogoJavascript size={250} style={{ color: '#F7DF1E' }} />
            </div>
            <div className="cloudProviderItem">
              <FaHtml5 size={250} style={{ color: '#E34F26' }} />
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
            <div className="flex-1 flex flex-col space-y-4 space-x -4">
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

export default Services;
