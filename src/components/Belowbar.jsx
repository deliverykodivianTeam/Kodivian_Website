// src/components/Bottom.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
    FaInstagram,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaLocationArrow,
    FaPhone,
    FaEnvelope,
} from "react-icons/fa";
import underbanner from "../assets/underbanner.jpg"; // Make sure the path is correct relative to Bottom.jsx

const Belowbar = () => {
    return (
        <div className="relative w-full overflow-hidden">
            <img
                src={underbanner}
                alt="Wave Banner"
                className="w-full block transition-opacity duration-500 opacity-90 hover:opacity-100"
            />
            <div className="absolute top-0 left-0 w-full p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-start mb-2">
                {/* Left Side Content */}
                <div className="mb-2 top-0">
                    <h3 className="text-xl text-white-900 hover:text-pink-400 font-bold mb-3">
                        <p>
                            Design better and spend less time <br />
                            without restricting tools creative freedom.
                        </p>
                    </h3>
                    <h6 className="text-white-900 hover:text-pink-400 uppercase text-xs mb-2">
                        Sign-up to get interesting updates
                    </h6>
                    <div className="text-gray-900 flex flex-col sm:flex-row mb-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-gray-300 text-white border border-pink-700 rounded-md py-2 px-3 text-sm w-full sm:w-auto mb-2 sm:mb-0 sm:mr-2 focus:outline-none hover:bg-purple-400 focus:border-pink-500"
                        />
                        <button className="bg-purple-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors duration-300">
                            Send
                        </button>
                    </div>
                    <div className="flex space-x-4">
                        {/* Add your social media icons/links here */}
                        <Link
                            to="https://www.linkedin.com/company/kodivian-technologies/posts/?feedView=all"
                            className="bg-purple-900 hover:bg-pink-600 hover:text-white mb-3"
                        >
                            <FaLinkedin className="w-5 h-5 fill-current" />
                        </Link>{" "}
                        {/* Linkdin*/}
                        <Link
                            to="https://x.com/i/flow/login?redirect_after_login=%2Fkodivian_tech"
                            className="text-white-900  hover:bg-pink-600 m hover:text-white"
                        >
                            <FaTwitter className="w-5 h-5 fill-current" />
                        </Link>{" "}
                        {/* Twitter */}
                        <Link
                            to="https://www.instagram.com/kodivian_tech/"
                            className="text-white-900  hover:bg-pink-600 hover:text-white"
                        >
                            <FaInstagram className="w-5 h-5 fill-current" />
                        </Link>{" "}
                        {/*INstagram */}
                        <Link
                            to="https://www.facebook.com/p/Kodivian-Technology-100075879827039"
                            className="text-white-900 hover:bg-pink-600 hover:text-white"
                        >
                            <FaFacebook className="w-5 h-5  fill-current" />
                        </Link>{" "}
                        {/* Facebook */}
                        <br />
                    </div>
                    <div className="flex  bottom-0">
                        <div className="flex flex-col bottom-0 space-y-3 pr-4 ">
                            {" "}
                            {/* Added pr-4 for spacing between icon and text */}
                            <div className="flex items-center">
                                <Link
                                    to="https://maps.google.com/?q=Meenakshi+Towers,No.13+Rajamannar+St,T+Nagar,+Chennai,+600017" // Corrected Google Maps link
                                    className="text-white-900 hover:bg-pink-600 hover:text-white "
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaLocationArrow className="w-5 h-4" />
                                </Link>
                            </div>
                            <div className="flex items-center">
                                <Link
                                    to="tel:+918870435343" // Corrected phone number format
                                    className="text-white-900 hover:bg-pink-600 hover:text-white"
                                >
                                    <FaPhone className="w-5 h-4" />
                                </Link>
                            </div>
                            <div className="flex items-center">
                                <Link
                                    to="mailto:vijaysabari.m@kodivian.com?subject=Enquiry"
                                    className="ttext-white-900 hover:bg-pink-600 hover:text-white"
                                    title="Opens your default email" // Added a title attribute
                                >
                                    <FaEnvelope className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-col bottom-0 space-y-0  pr-4">
                            <p className="text-white-900 hover:text-pink-400 mb-0">
                                Meenakshi Towers, No.13 Rajamannar St, T Nagar, Chennai,
                                600017
                            </p>
                            <p className="text-white-900 hover:text-pink-400">+91 8870435343</p>
                            <p className="text-white-900 hover:text-pink-400 ">vijaysabari.m@kodivian.com</p>
                        </div>
                    </div>
                </div>

                {/* Right Side Navigation Links */}
                <div className="flex">
                    <div className="flex-1 flex flex-col space-y-4 space-x-4">
                        <h3 className="text-violet-300 hover:text-white font-bold ">
                            OVERALL
                        </h3>
                        <a
                            href="#welcome"
                            className="text-white-300 hover:text-pink-200 duration-300 font-semibold"
                        >
                            Home
                        </a>
                        <a
                            href="#search"
                            className="text-white-300 hover:text-pink-200 duration-300 font-semibold"
                        >
                            Search
                        </a>
                        <a
                            href="#optimizeStrength"
                            className="text-white-300 hover:text-pink-200 duration-300 font-semibold"
                        >
                            Strength
                        </a>
                        <a
                            href="#frame"
                            className="text-white-300 hover:text-pink-200 duration-300 font-semibold"
                        >
                            Framework
                        </a>
                    </div>
                    <div className="flex-1 flex flex-col space-y-4 space-x-4">
                        <h3 className="text-violet-300 hover:text-white font-bold ">
                            PRODUCT
                        </h3>
                        <a
                            href="#link2-1"
                            className="text-white-300 hover:text-pink-200 duration-300 font-semibold"
                        >
                            Scanify
                        </a>
                        <a
                            href="#link2-2"
                            className="text-white-300 hover:text-pink-200 duration-300 font-semibold"
                        >
                            Intellidocs
                        </a>
                        <a
                            href="#link2-3"
                            className="text-white-300 hover:text-pink-200 font-semibold"
                        >
                            Process Builder
                        </a>
                        <a
                            href="#link2-4"
                            className="text-white-300 hover:text-pink-200 duration-300 font-semibold"
                        >
                            RPA
                        </a>
                    </div>
                    <div className="flex-1 flex flex-col space-y-5 space-x-0">
                        <h3 className="text-violet-300 hover:text-white font-bold ">
                            SERVICES
                        </h3>
                        <a
                            href="#ai"
                            className="text-white-300 hover:text-pink-200 duration-300 font-semibold"
                        >
                            Artificial Intelligence
                        </a>
                        <a
                            href="#bpm"
                            className="text-white-300 hover:text-pink-200 duration-300 font-semibold"
                        >
                            Business Process Management
                        </a>
                        <a
                            href="#rpa"
                            className="text-white-300 hover:text-pink-200 duration-300 font-semibold"
                        >
                            Robotic Process Automation
                        </a>
                    </div>
                </div>
            </div>
            {/* Copyright and Design Info */}
            <div className="absolute bottom-0 font-semibold  w-full text-white hover:text-pink-900 p-1 text-center text-xs">
                Copyright © 2025 All Right Reserved & Designed By KodivianTechnologies
            </div>
        </div>
    );
};

export default Belowbar;