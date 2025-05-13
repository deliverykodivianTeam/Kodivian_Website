import React, { useState, useEffect, useRef } from "react";
import "../styles/Services.css";

// Import your new images from the assets folder
import image2 from "../assets/intro_1.png";
import intro_2 from "../assets/intro_2.png";
import intro_3 from "../assets/intro_3.png";
import intro_5 from "../assets/intro_5.png";
import circle from "../assets/circle.png";
import tick from "../assets/tick.png";
import square from "../assets/square.png";
import banner_image from "../assets/banner.svg";
// Import the new Belowbar component
import Belowbar from "../components/Belowbar"; // Adjust the path if necessary

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
        <div className="services_page_info">
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
              <div className="service-us-top">
                <ul>
                  <li>Focus on simplifying complexity</li>
                  <li>Highlighting their expertise</li>
                  <li>Emphasizing their comprehensive approach</li>
                  <li>Direct and benefit-oriented</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* REMOVED SLIDER SECTION */}

      <h2 className="head-2" id="learn-more">
        Taking Your Business to the Next Level
      </h2>
      <div className="services-container">
        <div className="service-card">
          <div className="service-image-wrapper">
            <img
              src={circle}
              alt="Digital Transformation Strategy"
              className="animated-element service-image"
            />
          </div>
          <h3 className="services_floating_heading">Digital Transformation Strategy</h3>
          <p className="service-description">
            Empowering businesses to embrace cutting-edge technology for
            enhanced growth and efficiency.
          </p>
        </div>
        <div className="service-card">
          <div className="service-image-wrapper">
            <img
              src={tick}
              alt="Cloud Integration Solutions"
              className="animated-element service-image"
            />
          </div>
          <h3 className="services_floating_heading">Cloud Integration Solutions</h3>
          <p className="service-description">
            Seamlessly migrate your operations to the cloud, ensuring
            scalability, security, and optimized performance.
          </p>
        </div>
        <div className="service-card">
          <div className="service-image-wrapper">
            <img
              src={square}
              alt="AI-Powered Process Automation"
              className="animated-element service-image"
            />
          </div>
          <h3 className="services_floating_heading">AI-Powered Process Automation</h3>
          <p className="service-description">
            Leveraging AI and automation to streamline operations, reduce manual
            effort.
          </p>
        </div>
      </div>

      <div className="cloudSupportContainer" id="call">
        <div className="leftSection">
          <p className="cloudSupportTitle">Support for every cloud.</p>
        </div>
        <div className="rightSection">
          <div className="cloudProviderLogos">
            <div className="cloudProviderItem">
              <BiLogoGoogleCloud size={250} style={{ color: "#4285F4" }} />
            </div>
            <div className="cloudProviderItem">
              <FaAws size={250} />
            </div>
            <div className="cloudProviderItem">
              <GrOracle size={250} style={{ color: "#F80000" }} />
            </div>
            <div className="cloudProviderItem">
              <VscAzure size={250} style={{ color: "#0078D4" }} />
            </div>
          </div>
        </div>
      </div>

      <div className="content-with-image-2" style={{ background: "black" }}>
        <img
          src={intro_3} // Use the second imported image
          alt="Description of image 2"
          className="content-image"
        />
        <p className="large-text" style={{ color: "white" }}>
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

      <div className="content-with-image">
        <div className="buildScaleGrowContainer">
          <p className="buildScaleGrowText">Build.</p>
          <p className="buildScaleGrowText">Scale.</p>
          <p className="buildScaleGrowText">Grow.</p>
        </div>
        <img
          src={banner_image} // Use the second imported image
          alt="banner_image"
          className="animated-element-1"
        />
      </div>

      <div className="content-with-image-3">
        <img
          src={intro_2} // Use the second imported image
          alt="Description of image 2"
          className="content-image"
        />
        <p className="large-text">
          Unlock the Future of Software Development with AI in the Cloud. This
          dynamic illustration showcases the transformative power of integrating
          Artificial Intelligence with cloud services. Imagine intelligent
          systems seamlessly interacting with cloud infrastructure, analyzing
          vast datasets, and automating complex development processes. From
          AI-powered tools enhancing code creation to cloud platforms providing
          scalable resources, this synergy is revolutionizing how software is
          built, deployed, and managed.
        </p>
      </div>

      <div
        className="content-with-image-4"
        style={{ backgroundColor: "black" }}
      >
        <p className="large-text" style={{ color: "white" }}>
          Strategize Your Digital Transformation for Growth and Efficiency. This
          visual encapsulates the key elements of a successful digital
          transformation strategy. Picture a clear target with focused
          objectives, alongside the financial resources and strategic leadership
          (symbolized by the chess king) necessary to achieve them. Data-driven
          insights, represented by the charts on the clipboard and laptop,
          inform your decisions, while technology empowers seamless execution.
          Embrace a future where digital tools drive efficiency, unlock new
          opportunities, and propel your business towards its goals.
        </p>
        <img
          src={intro_5} // Use the second imported image
          alt="Description of image 2"
          className="content-image"
        />
      </div>

      <div className="cloudSupportContainer">
        <div className="leftSection">
          <p className="cloudSupportTitle">No error is the best message.</p>
        </div>
        <div className="rightSection">
          <div className="cloudProviderLogos">
            <div className="cloudProviderItem">
              <FaPython size={250} style={{ color: "#3776AB" }} />
            </div>
            <div className="cloudProviderItem">
              <FaJava size={250} style={{ color: "#007396" }} />
            </div>
            <div className="cloudProviderItem">
              <BiLogoJavascript size={250} style={{ color: "#F7DF1E" }} />
            </div>
            <div className="cloudProviderItem">
              <FaHtml5 size={250} style={{ color: "#E34F26" }} />
            </div>
          </div>
        </div>
      </div>
      {/* Render the new Belowbar component here */}
      <Belowbar />
    </div>
  );
};

export default Services;
