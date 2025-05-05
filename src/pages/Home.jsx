import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import DemoBookingPopup from '../components/DemoBookingPopup';
import WaveImage from "../assets/WaveImage.png";
import underbanner from "../assets/underbanner.png";
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

import image1 from "../assets/image7.jpeg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/family.png";
import image6 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image4 from "../assets/image8.jpeg";

const images = [image1, image2, image3, image4, image5, image6];

const products = [
  {
    id: 1,
    name: "Scanify",
    description: "Revolutionize your document management with intelligent scanning.",
    link: "/scanify",
    image: image1,
  },
  {
    id: 2,
    name: "Intellidocs",
    description: "Smart document processing for enhanced efficiency.",
    link: "/document",
    image: image2,
  },
  {
    id: 3,
    name: "Process Builder",
    description: "Design and automate your business processes visually.",
    link: "/processbuilder",
    image: image3,
  },
  {
    id: 4,
    name: "RPA Automation",
    description: "Automate repetitive tasks with robotic process automation.",
    link: "/robort",
    image: image4,
  },
];

const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const [currentImage, setCurrentImage] = useState(images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [productVisibility, setProductVisibility] = useState(
    products.map(() => false)
  );
  const [productsContainerVisible, setProductsContainerVisible] = useState(false);

  const handleGoBack = () => {
    setSelectedFile(null);
  };

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setCurrentImage(images[currentIndex]);
    }, 5000);

    return () => clearInterval(imageInterval);
  }, [currentIndex, images]);

  useEffect(() => {
    // Fade in the entire product container first
    const containerTimer = setTimeout(() => {
      setProductsContainerVisible(true);
      // Then fade in each product with a delay
      products.forEach((_, index) => {
        setTimeout(() => {
          setProductVisibility((prevVisibility) => {
            const newVisibility = [...prevVisibility];
            newVisibility[index] = true;
            return newVisibility;
          });
        }, 1000 * (index + 1)); // Adjust the delay (300ms) as needed
      });
    }, 8); // Adjust the initial delay as needed

    return () => clearTimeout(containerTimer);
  }, []);

  return (
    <div
      id="welcome"
      className="min-h-screen flex flex-col justify-between bg-white p-0"
    >
      {/* Top Wave Image */}
      <div className="relative w-full overflow-hidden" style={{ height: "948px" }}>
        <img
          src={WaveImage}
          alt="Wave Banner"
          className="w-full block transition-opacity duration-500 opacity-90 hover:opacity-100"
          style={{ height: "588px" }}
        />

        {selectedFile && (
          <div
            className="absolute top-1/3 left-1/3 bg-white shadow-lg rounded-md p-8"
            style={{
              top: "70%",
              left: "55%",
              zIndex: 11,
            }}
          >
            <h3>{selectedFile} Content</h3>
            <p>This is the content for {selectedFile}.</p>
            <button
              onClick={handleGoBack}
              className="bg-purple-500 text-white rounded-md px-4 py-2 mt-4"
            >
              Go Back
            </button>
          </div>
        )}
       <div
  className="absolute top-1/3 top-80 left-10 transform -translate-y-1/2 text-white md:text-left md:max-w-md p-8"
  style={{ width: "100%" }}
>
  <div style={{ display: "flex", alignItems: "center" }}>
    <h1
      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-colors duration-300 text-purple-700"
      style={{ marginRight: "10px", whiteSpace: "nowrap" }} // Added whiteSpace: "nowrap"
    >
      Welcome to{" "}
      <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 transition-colors duration-300">
        Kodivian Technology
      </span>
    </h1>
  </div>
  <p
  className="text-lg md:text-xl text-gray-600 mb-8 transition-colors duration-300 hover:text-gray-500"
  style={{ whiteSpace: "nowrap" }}
>
  Welcome to Kodivian is a friendly invitation to explore everything Kodivian offers — <br />
  from innovative products and smart solutions to creative digital experiences,<br />
   all designed to simplify and enhance your business journey.
</p>

          <div className="flex flex-col sm:flex-row items-center md:justify-start gap-4">
            <input
              type="text"
              placeholder="Search your target"
              className="bg-white border border-gray-300 text-gray-700 rounded-full px-6 py-3 w-full sm:w-auto focus:ring-2 focus:ring-purple-500 transition-shadow duration-300 shadow-md"
            />
            <button
              id="search"
              className="bg-purple-600 text-white rounded-full px-8 py-3 font-semibold hover:bg-purple-500 transition-transform duration-300 hover:scale-105"
            >
              Search
            </button>
          </div>
        </div>
        {/* Product Review Section */}
        <div
          className={`absolute top-46 left-0 w-full h-full flex items-center justify-center transition-opacity duration-500 ${
            productsContainerVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-none bg-opacity-70 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Our Range of Products </h2>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`rounded-md  shadow-20g  p-4 transition-opacity duration-500 ${
                    productVisibility[index] ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className=" w-full h-32 object-cover rounded-md mb-2"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <Link
                    to={product.link}
                    className="inline-block bg-purple-500 text-white rounded-full px-4 py-2 text-sm hover:bg-purple-600 transition-colors duration-300"
                  >
                    Learn More
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Optimize Your Strength Section - Added an ID for navigation */}
      <div id="optimizeStrength" className="bg-white py-0">
        <div className="container mx-auto px-4 text-center">
          <h2 id="frame" className="text-3xl font-bold text-purple-700 mb-6">
            Optimize Your Strength with Our Key Processing Framework
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div
                id="Cloud"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-50 text-purple-700 font-bold mb-4"
              >
                🚀
              </div>
              <h3 className="text-xl font-semibold text-black-600 mb-2">
                Open Source Cloud & Cloud Center of Excellence (CoE)
              </h3>
              <p className="text-gray-600">
                Leverage the flexibility of open-source cloud solutions combined
                with our expert-driven Cloud CoE to drive innovation,
                scalability, and efficiency.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div
                id="Service"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-50 text-purple-700 font-bold mb-4"
              >
                🔧
              </div>
              <h3 className="text-xl font-semibold text-black-600 mb-2">
                Managed Service Model
              </h3>
              <p className="text-gray-600">
                Focus on scaling your business while we take care of the
                day-to-day operations through our Managed Service Model—ensuring
                24/7 expert support
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div
                id="Process"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-50 text-purple-700 font-bold mb-4"
              >
                🔄
              </div>
              <h3 className="text-xl font-semibold text-black-600 mb-2">
                Process-Centric Organization
              </h3>
              <p className="text-gray-600">
                We build systems with your processes at the core. Our approach
                ensures operational excellence, seamless workflows, and
                outcome-based transformation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Building AI Section */}
      <div id="buildingAI" className="bg-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-purple-700 mb-6">
            Building a better tomorrow with Artificial Intelligence (AI)
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Intelligent automation is comprised of three cognitive technologies.
            The integration of these components to create a solution that powers
            business and technology transformation
          </p>
          <div id="ai" className="flex justify-center gap-8">
            <div className="p-6 rounded-lg shadow-md border border-purple-200">
              <h3 className="text-xl font-semibold text-black-600 mb-2">
                Artificial Intelligence (AI)
              </h3>
              <p className="text-gray-600">
                AI uses machine learning to understand your data and make smart,
                predictive decisions that drive business growth.
              </p>
            </div>
            <div
              id="bpm"
              className="p-6 rounded-lg shadow-md border border-purple-200"
            >
              <h3 className="text-xl font-semibold text-black-600 mb-2">
                Business Process Management (BPM)
              </h3>
              <p className="text-gray-600">
                BPM streamlines workflows to boost agility, ensure consistency,
                and scale your business with structured processes.
              </p>
            </div>
            <div
              id="rpa"
              className="p-6 rounded-lg shadow-md border border-purple-200"
            >
              <h3 className="text-xl font-semibold text--600 mb-2">
                Robotic Process Automation (RPA)
              </h3>
              <p className="text-gray-600">
                RPA automates repetitive tasks, like data extraction, while
                working with AI to handle more complex processes.
              </p>
            </div>
          </div>
          <button  className="bg-purple-600 text-white rounded-full px-8 py-3 mt-8 font-semibold hover:bg-purple-500 transition-transform duration-300 hover:scale-105" onClick={handleOpenPopup} 
          >
          Schedule Your Free Live Demo Today
          </button>
          <DemoBookingPopup isOpen={isPopupOpen} onClose={handleClosePopup} />  

        </div>
      </div>

      {/* New Hero Section */}
      <div className="bg-white py-16 container mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between">
        <div className="md:w-1/2 lg:w-5/12">
          <h4 className="uppercase text-purple-700 font-semibold mb-2">
            SIGN UP
          </h4>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get started with our{" "}
            <span className="text-purple-700">AI platform</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Partner with us, work with us, or grow with us, we turn ideas into
            impact through intelligent innovation.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300">
            Get Started
          </button>
        </div>
        <div className="hidden md:block md:w-1/2 lg:w-5/12">
          <div className="rounded-lg shadow-lg overflow-hidden">
            <img
              src={currentImage}
              alt="AI Platform"
              className="w-full h-auto object-cover"
            />
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

export default Home;
