import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import DemoBookingPopup from '../components/DemoBookingPopup';import { Link, useNavigate } from "react-router-dom";

import image1 from "../assets/image7.jpeg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/family.png";
import image6 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image4 from "../assets/image8.jpeg";

import icon1 from "../assets/scanimg.png";
import icon2 from "../assets/docimg.jpg";
import icon3 from "../assets/rpaimg.png";
import icon4 from "../assets/proimg.png";

// Import the new Bottom component
import Bottombar from '../components/Belowbar'; // Adjust the path if necessary


const images = [image1, image2, image3, image4, image5, image6];


const products = [
    {
        id: 1,
        name: "Scanify",
        description: "Revolutionize your document management with intelligent scanning.",
        link: "/scanify",
        image: icon1,
    },
    {
        id: 2,
        name: "Intellidocs",
        description: "Smart document processing for enhanced efficiency.",
        link: "/document",
        image: icon2,
    },
    {
        id: 3,
        name: "Process Builder",
        description: "Design and automate your business processes visually.",
        link: "/processbuilder",
        image: icon4,
    },
    {
        id: 4,
        name: "RPA Automation",
        description: "Automate repetitive tasks with robotic process automation.",
        link: "/robort",
        image: icon3,
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
    

    useEffect(() => {
        const imageInterval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setCurrentImage(images[currentIndex]);
        }, 5000);

        return () => clearInterval(imageInterval);
    }, [currentIndex, images]);

    useEffect(() => {
        const containerTimer = setTimeout(() => {
            setProductsContainerVisible(true);
            products.forEach((_, index) => {
                setTimeout(() => {
                    setProductVisibility((prevVisibility) => {
                        const newVisibility = [...prevVisibility];
                        newVisibility[index] = true;
                        return newVisibility;
                    });
                }, 1000 * (index + 1));
            });
        }, 8);

        return () => clearTimeout(containerTimer);
    }, []);

    return (
        <div
            id="welcome"
            className="min-h-screen flex flex-col justify-between bg-white p-0"
        >
            {/* Top Wave Image */}
            <div className="relative w-full overflow-hidden" style={{ height: "948px" }}>
                <div
                    className="absolute top-0/1 top-86 left-10 transform -translate-y-1/2 text-white md:text-left md:max-w-md p-8"
                    style={{ width: "100%" }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-colors duration-300 text-black"
                            style={{ marginRight: "50px", whiteSpace: "nowrap" }}
                        >
                            Transforming Ideas{" "}
                            <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-700 mb-4 transition-colors duration-300">
                                Into Digital Solutions
                            </span>
                        </h1>
                    </div>
                    <p
                        className="text-lg md:text-xl text-gray-600 mb-8 transition-colors duration-300 hover:text-gray-500"
                        style={{ whiteSpace: "nowrap" }}
                    >
                        Your vision deserves more than just development. We craft innovative, high-impact digital solutions<br />
                        boost growth, streamline operations, and strengthen your brand.  <br />
                        From startups to enterprises, we deliver technology that is smart, scalable, and built to drive results.<br />
                    </p>

                    <button className="bg-purple-600 text-white rounded-full px-8 py-3 mt-8 font-semibold hover:bg-purple-500 transition-transform duration-300 hover:scale-105" onClick={handleOpenPopup}
                    >
                        Schedule Your Free Live Demo Today
                    </button>
                    <DemoBookingPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
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
            </div> {/* Closing div for the top section's overflow hidden */}

            {/* Render the new Bottom component here */}
            <Bottombar />
        </div>
    );
};

export default Home;