import React, { useState } from "react";
import "../styles/Contact.css"; // Import global styles
import PurpleWave from "../assets/purple-wave.png"; // Import the image
import underbanner from "../assets/purple-geometric.jpg";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { LiaPhoneSolid } from "react-icons/lia";
import { MdOutlineMailOutline, MdOutlineLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const Contact = () => {
  const locationData = [
    {
      id: "location1",
      name: "Kodivian Technologies",
      addressLine1: "13, Rajamannar St, T. Nagar",
      cityStateZip: "Chennai, Tamil Nadu 600017",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242.92973951242084!2d80.23888550478041!3d13.043574691425363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5f3fb05b35ea96e4!2zMTPCsDAyJzM2LjkiTiA4MMKwMTQnMjAuNSJF!5e0!3m2!1sen!2sin!4v1640775126699!5m2!1sen!2sin", // Replace
    },
    {
      id: "location2",
      name: "UK",
      addressLine1: "Old Hermitage, Hermitage Ln, Windsor SL4 4AZ",
      cityStateZip: "Little Acre, United Kngdom",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2485.3227336071814!2d-0.6309265238748242!3d51.47059011339233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48767b0ca81ae9e1%3A0xe9f53d72bd8c4611!2sLittle%20Acre!5e0!3m2!1sen!2sin!4v1744976516549!5m2!1sen!2sin", // Replace
    },
    {
      id: "location3",
      name: "AUSTRALIA",
      addressLine1: "38 Cope St, Lane Cove NSW 2066",
      cityStateZip: "Australia",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.734224969694!2d151.15122247543505!3d-33.81917111648948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12af6f31553f99%3A0x18ccda6143319c56!2sUnit%2029%2F38%20Cope%20St%2C%20Lane%20Cove%20NSW%202066%2C%20Australia!5e0!3m2!1sen!2sin!4v1744976611255!5m2!1sen!2sin", // Replace
    },
    {
      id: "location4",
      name: "USA",
      addressLine1: "16192 Coastal Hwy, Lewes, DE 19958",
      cityStateZip: "United States Of America",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3110.93682376122!2d-75.2117057!3d38.765153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b8b9ee12ce8257%3A0x3122963d2d6d3bc5!2s16192%20Coastal%20Hwy%2C%20Lewes%2C%20DE%2019958%2C%20USA!5e0!3m2!1sen!2sin!4v1744976743561!5m2!1sen!2sin", // Replace
    },
  ];

  const [selectedLocationId, setSelectedLocationId] = useState(
    locationData[0].id
  );

  const handleLocationChange = (event) => {
    setSelectedLocationId(event.target.value);
  };

  const currentLocation = locationData.find(
    (location) => location.id === selectedLocationId
  );

  const currentMapEmbedUrl = currentLocation ? currentLocation.mapEmbedUrl : "";

  return (
    <div className="contact-page-layout">
      {/* Hero Section with Contact Info */}
      <div className="hero-section relative w-full overflow-hidden">
        <img
          src={PurpleWave}
          alt="Purple Wave Design"
          className="wave-header"
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-start p-8 md:p-16 text-white">
          <div className="hero-contact-info">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className="mb-2">
              Feel free to use the form or drop us an email. Old-fashioned phone
              calls work too.
            </p>
            <div className="flex items-center mb-2">
              <a href="#call-1">
                <LiaPhoneSolid className="mr-2 text-purple-300" />
              </a>
              <span>+91 88704 35343</span>
            </div>
            <div className="flex items-center mb-2">
              <a href="#call-1">
                <MdOutlineMailOutline className="mr-2 text-purple-300" />
              </a>
              <span>vijaysabari.m@kodivian.com</span>
            </div>
            <div className="flex items-start">
              <a href="#call">
                <MdOutlineLocationOn className="mr-2 text-purple-300 mt-0.5" />
              </a>
              <span>Kodivian Technologies</span>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-form-container" id="call-1">
        {/* The contact form will remain here */}
        <h1>Send us a Message</h1>
        <p>We'd love to hear from you! Please fill out the form below.</p>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number (Optional):</label>
            <input type="tel" id="phone" name="phone" />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input type="text" id="subject" name="subject" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </div>

      <div className="contact-map" id="call">
        <div className="location-header">
          <h2 className="locations-holder">OUR LOCATIONS</h2>
          <div className="location-selector">
            <label htmlFor="location-select">SELECT LOCATION :</label>
            <select
              id="location-select"
              value={selectedLocationId}
              onChange={handleLocationChange}
            >
              {locationData.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="map-container">
          <iframe
            src={currentMapEmbedUrl}
            width="100%"
            height="630"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        {currentLocation && (
          <>
            <p>{currentLocation.name}</p>
            <p>{currentLocation.addressLine1}</p>
            <p>{currentLocation.cityStateZip}</p>
          </>
        )}
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
                    <MdOutlineLocationOn className="w-5 h-4" />
                  </Link>
                </div>
                <div className="flex items-center">
                  <Link
                    to="tel:+918870435343" // Corrected phone number format
                    className="text-gray-400 hover:text-white"
                  >
                    <LiaPhoneSolid className="w-5 h-4" />
                  </Link>
                </div>
                <div className="flex items-center">
                  <Link
                    to="mailto:vijaysabari.m@kodivian.com?subject=Enquiry"
                    className="text-gray-400 hover:text-white"
                    title="Opens your default email" // Added a title attribute
                  >
                    <MdOutlineMailOutline className="w-4 h-4" />
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

export default Contact;