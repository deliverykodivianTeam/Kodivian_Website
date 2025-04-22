import React, { useState, useEffect, useRef } from "react";
import "../styles/Services.css";

// Import your new images from the assets folder
import image1 from "../assets/intro_0.png"; // Replace with your image paths
import image2 from "../assets/intro_1.png";
import cloudServicesImage from "../assets/cloud_services.png"; // Import the cloud services image
import databaseServicesImage from "../assets/database_services.png";
import rpaServicesImage from "../assets/rpa_nocode.png";
import Front_Backend_ServicesImage from "../assets/frontend_backend.png";
import Ai_Agents_Mobile_Apps_ServicesImage from "../assets/ai_agents_mobile_apps.png";
import underbanner from "../assets/purple-geometric.jpg";
import PurpleWave from "../assets/purple-wave.png";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaLocationArrow, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const slides = [
    {
      title: "Cloud Services",
      image: cloudServicesImage, // Use the imported image variable
      alt: "Cloud Services",
      link: "../assets/cloud_services.png",
    },
    {
      title: "Database Services",
      image: databaseServicesImage, // Make sure this image exists in your assets or is correctly linked
      alt: "Database Services",
      link: "../assets/database_services.png",
    },
    {
      title: "RPA & No Code Low Code",
      image: rpaServicesImage, // Make sure this image exists in your assets or is correctly linked
      alt: "RPA & No Code Low Code",
      link: "../assets/rpa_nocode.png",
    },
    {
      title: "Front-End & Back-End",
      image: Front_Backend_ServicesImage, // Make sure this image exists in your assets or is correctly linked
      alt: "Front-End & Back-End",
      link: "../assets/frontend_backend.png",
    },
    {
      title: "AI Agents & Mobile Applications",
      image: Ai_Agents_Mobile_Apps_ServicesImage, // Make sure this image exists in your assets or is correctly linked
      alt: "AI Agents & Mobile Applications",
      link: "../assets/ai_agents_mobile_apps.png",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <div>
      <div className="service-image">
        <button className="slider-button prev" onClick={handlePrev}>
          &lt;
        </button>
        <ul
          className="slider"
          ref={sliderRef}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <li className="slider-item" key={index}>
              <div className="service-box">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="service-image"
                />
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
                <a href={slide.link} className="explore-link">
                  Explore →
                </a>
              </div>
            </li>
          ))}
        </ul>
        <button className="slider-button next" onClick={handleNext}>
          &gt;
        </button>
      </div>

      <div className="content-with-image">
        <p className="large-text">
          Kodivian Technologies LLP, based in Chennai, specializes in digital
          transformation and enterprise automation solutions.
        </p>
        <img
          src={image1} // Use the first imported image
          alt="Description of image 1"
          className="content-image"
        />
      </div>

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

      <div className="services-page">
        <div className="services-content">
          <h2>Core Services</h2>
          <div className="services-boxes">
            {/* Box 1: Digital Workplace Automation */}
            <div className="service-box">
              <h3>Digital Workplace Automation with Kodivian Scanify:</h3>
              <ul>
                <li>
                  <strong className="bold">Document Capture & Indexing:</strong>
                  Efficiently captures and manages information from various
                  sources.
                </li>
                <li>
                  <strong className="bold">Workflow Automation:</strong>
                  Implements workflows to automate business processes.
                </li>
                <li>
                  <strong className="bold">Customizable Forms:</strong> Allows
                  creation of tailored forms with e-signatures.
                </li>
                <li>
                  <strong className="bold">Advanced Search & Retrieval:</strong>
                  Provides secure access to information for quick
                  decision-making.
                </li>
                <li>
                  <strong className="bold">Integration Capabilities:</strong>
                  Integrates with CRMs, ERPs, DocuSign, Adobe Sign, and Google
                  Workspace.
                </li>
                <li>
                  <strong className="bold">AI-Powered Bots:</strong> Deploys AI
                  bots for workflow optimizations and process interactions.
                </li>
              </ul>
            </div>

            {/* Box 2: Product Engineering Services */}
            <div className="service-box">
              <h3>Product Engineering Services:</h3>
              <ul>
                <li>
                  <strong className="bold">Conceptualization & Design:</strong>
                  Assists in preparing product specifications and creating
                  ideas.
                </li>
                <li>
                  <strong className="bold">Agile Development:</strong> Develops
                  solutions using agile methodology for timely delivery.
                </li>
                <li>
                  <strong className="bold">Testing & Launch:</strong> Conducts
                  thorough testing and delivers the product within the
                  timeframe.
                </li>
              </ul>
            </div>

            {/* Box 3: Technology Competencies */}
            <div className="service-box">
              <h3>Technology Competencies:</h3>
              <ul>
                <li>
                  <strong className="bold">Programming Languages:</strong>
                  Python, Ruby, PHP, Java, C, C++, C#.
                </li>
                <li>
                  <strong className="bold">Databases:</strong> Oracle, MySQL,
                  NoSQL, Microsoft SQL Server, IBM DB2, MongoDB, PostgreSQL.
                </li>
                <li>
                  <strong className="bold">Middleware & Frameworks:</strong>
                  WebLogic, WebSphere, Apache, Django.
                </li>
                <li>
                  <strong className="bold">Analytics Tools:</strong> Oracle
                  Analytic Cloud, Power BI, Tableau, Spark, QlikView.
                </li>
                <li>
                  <strong className="bold">Cloud Infrastructure:</strong> AWS,
                  Azure, Google Cloud Platform, Oracle Cloud.
                </li>
                <li>
                  <strong className="bold">IoT Platforms:</strong> Node-RED,
                  Eclipse IoT, OpenHAB, Zetta, Arduino.
                </li>
              </ul>
            </div>

            {/* Box 4: Industry-Specific Solutions */}
            <div className="service-box">
              <h3>Industry-Specific Solutions:</h3>
              <ul>
                <li>
                  <strong className="bold">IT Solutions:</strong> Tailored
                  solutions for IT professionals.
                </li>
                <li>
                  <strong className="bold">Logistics:</strong> Systems to
                  optimize logistics and supply chain.
                </li>
                <li>
                  <strong className="bold">Educational Institutions:</strong>
                  Platforms to enhance education.
                </li>
                <li>
                  <strong className="bold">Manufacturing & Telecom:</strong>
                  Solutions to streamline processes.
                </li>
              </ul>
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

export default Services;
