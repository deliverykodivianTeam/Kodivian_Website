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
          transformation and enterprise automation solutions
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
    </div>
  );
};

export default Services;
