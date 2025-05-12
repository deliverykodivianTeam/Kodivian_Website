import React, { useState, useEffect, useRef } from "react";
import "../styles/Services.css";

// Import your new images from the assets folder
import image2 from "../assets/intro_1.png";
import intro_2 from "../assets/intro_2.png";
import intro_3 from "../assets/intro_3.png";
import intro_4 from "../assets/intro_4.png";
import circle from "../assets/circle.png";
import tick from "../assets/tick.png";
import square from "../assets/square.png";
import banner_image from "../assets/banner.svg";
// Import the new Belowbar component
import Belowbar from '../components/Belowbar'; // Adjust the path if necessary

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
              <div className="flex mt-6">
                <a href="#learn-more">
                  <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-md mr-4 transition-colors duration-300">
                    Learn More
                  </button>
                </a>
              </div>
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between", // Changed to space-between
          padding: "20px",
          backgroundColor: "white",
          gap: "5px", // Added gap of 5px between the direct children
        }}
      >
        <div style={{ textAlign: "center", flex: 1 }}>
          <div
            style={{
              position: "relative",
              width: "250px", // Increased width to 250px
              height: "250px", // Increased height to 250px
              margin: "0 auto",
            }}
          >
            <img
              src={circle}
              alt="Business Plans"
              className="animated-element"
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
          <h3>Digital Transformation Strategy</h3>
          <p style={{ color: "#777" }}>
            Empowering businesses to embrace cutting-edge technology for
            enhanced growth and efficiency.
          </p>
        </div>
        <div style={{ textAlign: "center", flex: 1 }}>
          <div
            style={{
              position: "relative",
              width: "250px", // Increased width to 250px
              height: "250px", // Increased height to 250px
              margin: "0 auto",
            }}
          >
            <img
              src={tick}
              alt="Business Plans"
              className="animated-element"
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
          <h3>Cloud Integration Solutions</h3>
          <p style={{ color: "#777" }}>
            Seamlessly migrate your operations to the cloud, ensuring
            scalability, security, and optimized performance.
          </p>
        </div>
        <div style={{ textAlign: "center", flex: 1 }}>
          <div
            style={{
              position: "relative",
              width: "250px", // Increased width to 250px
              height: "250px", // Increased height to 250px
              margin: "0 auto",
            }}
          >
            <img
              src={square}
              alt="Business Plans"
              className="animated-element"
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
          <h3>AI-Powered Process Automation</h3>
          <p style={{ color: "#777" }}>
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

      <div className="content-with-image-2">
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
        <div className="rightSection">
          <p className="cloudSupportTitle">Systems fade, but data remains.</p>
        </div>
        <div className="leftSection">
          <div className="cloudProviderLogos">
            <div className="cloudProviderItem">
              <GrMysql size={250} style={{ color: "#F29111" }} />
            </div>
            <div className="cloudProviderItem">
              <BiLogoPostgresql size={250} style={{ color: "#336791" }} />
            </div>
            <div className="cloudProviderMongoDB">
              <BiLogoMongodb size={250} style={{ color: "#47A248" }} />
            </div>
          </div>
        </div>
      </div>

      <div className="content-with-image-4">
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
