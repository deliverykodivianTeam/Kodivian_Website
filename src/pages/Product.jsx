import "../styles/Product.css";
import WaveImage from '../assets/WaveImage.png';
import SampleImage from '../assets/Scanify.png'
// import underbanner from '../assets/underbanner.png'; // REMOVE this import
import intellidocs from '../assets/intellidocs.png';
import processbuilder from '../assets/process_builder.png';
import DemoBookingPopup from '../components/DemoBookingPopup';
import rpa from '../assets/rpa.png';
// import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaLocationArrow, FaPhone, FaEnvelope } from 'react-icons/fa'; // REMOVE these imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import the new Belowbar component
import Belowbar from '../components/Belowbar'; // Adjust the path if necessary

const Product = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div>
            <div className="hero-section">
                        <p className="hero-subtitle">AI-powered productivity</p>
                        <h1 className="hero-title">Work <br /> smarter, <br /> finish faster</h1>
                        <p className="hero-description">Take control of your tasks, automate workflows and stay focused with our all-in-one AI-driven platform.</p>
                        <button onClick={handleOpenPopup} className="hero-button">Get started for free</button>
                        <DemoBookingPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
                </div>
                <div className="sample-section">
                    <div className="sample-image-container">
                        <img src={SampleImage} alt="Scanify" className="sample-image" />
                    </div>
                    <div className="sample-content">
                        <h2 className="sample-title">Conquering Your Invoicing Challenges with Scanify</h2>
                        <p className="sample-description">Scanify is a powerful solution designed to simplify your invoice management process. It scans invoices with high accuracy, automatically extracts key data, and converts it into structured JSON and Excel formats. This data can be seamlessly pushed into SAP for efficient processing, eliminating the need for manual entry and reducing the risk of errors.Whether you're handling a few invoices or managing high volumes, Scanify scales with your business, helping you stay organized, compliant, and in control.</p>
                        <Link to="/scanify" className="sample-button"> Explore features </Link>
                    </div>
                </div>

                {/* New Section 2: Image Left, Text Right - Opposite of sample-section */}
                <div className="sample2-section">
                    <div className="sample2-content">
                        <h2 className="sample3-title"> Turn Processes Into Powerful Applications with Process Builder</h2>
                        <p className="sample3-description">Process Builder empowers you to create fully functional workflows and forms using an intuitive drag-and-drop interface—no coding required. In just seconds, you can design custom applications, assign them to specific clients or users, and instantly generate user pages, dashboards, reports, and charts. Whether you're automating internal processes or building client-facing solutions, Process Builder makes it incredibly easy, fast, and efficient. Bring your ideas to life and streamline your operations like never before.</p>
                        <Link to="/processbuilder" className="sample-button"> Explore features </Link>
                    </div>
                    <div className="sample2-image-container">
                        <img src={processbuilder} alt="Intellidocs" className="sample2-image" />
                    </div>
                </div>


                {/* New Section 3: Image Left, Text Right - Opposite of sample-section */}
                <div className="sample1-section">
                    <div className="sample1-image-container">
                        <img src={rpa} alt="Scanify" className="sample1-image" />
                    </div>
                    <div className="sample1-content">
                        <h2 className="sample2-title">Automating Repetitive Tasks with RPA</h2>
                        <p className="sample2-description">Our RPA (Robotic Process Automation) solution is built to handle repetitive, rule-based tasks with speed and precision. Whether it's data entry, report generation, or invoice processing, RPA takes over these time-consuming processes and executes them automatically—no manual effort required. Just set the schedule, and RPA performs the task on time, every time, reducing human error and freeing up valuable manpower. It's the perfect tool for businesses looking to boost productivity, cut operational costs, and focus on strategic growth.</p>
                        <Link to="/robort" className="sample-button"> Explore features </Link>
                    </div>
                </div>



                {/* New Section 4: Image Left, Text Right - Opposite of sample-section */}
                <div className="sample3-section">
                    <div className="sample3-content">
                        <h2 className="sample1-title">Smarter Document Management with IntelliDoc</h2>
                        <p className="sample1-description">IntelliDoc is your all-in-one solution for smart document handling and automation. It allows you to manage, process, and organize documents .With IntelliDoc, you can assign signature marks, apply approval status watermarks, and automate every step required for document completion. Whether you're managing contracts, invoices, or internal approvals, IntelliDoc ensures each file is processed accurately and moves through the workflow without delays. Say goodbye to manual follow-ups and hello to seamless, scheduled document automation.</p>
                        <Link to="/document" className="sample-button"> Explore features </Link>
                    </div>
                    <div className="sample3-image-container">
                        <img src={intellidocs} alt="Intellidocs" className="sample2-image" />
                    </div>
                </div>
           
            {/* Render the new Belowbar component here */}
            <Belowbar />
         </div>

    );
};
export default Product;