<<<<<<< HEAD
import React, { useState } from "react";
import scanify from "../assets/scanify.png";
import intellidocsLogo from "../assets/intellidocs.png";
import rpa from "../assets/rpa.png";
import process_builder from "../assets/process_builder.png";
import "../styles/Product.css";
import PurpleGeometric from "../assets/purple-geometric.jpg";
import PurpleWave from "../assets/purple-wave.png";

const Product = () => {
  const [showAll, setShowAll] = useState(true);
  const [showScanifyDetails, setShowScanifyDetails] = useState(false);
  const [showRpaDetails, setShowRpaDetails] = useState(false);
  const [showIntelliDocsDetails, setShowIntelliDocsDetails] = useState(false);
  const [showProcessBuilderDetails, setShowProcessBuilderDetails] =
    useState(false);

  const handleScanifyClick = () => {
    setShowAll(false);
    setShowScanifyDetails(true);
    setShowRpaDetails(false);
    setShowIntelliDocsDetails(false);
    setShowProcessBuilderDetails(false);
  };

  const handleRpaClick = () => {
    setShowAll(false);
    setShowScanifyDetails(false);
    setShowRpaDetails(true);
    setShowIntelliDocsDetails(false);
    setShowProcessBuilderDetails(false);
  };

  const handleIntelliDocsClick = () => {
    setShowAll(false);
    setShowScanifyDetails(false);
    setShowRpaDetails(false);
    setShowIntelliDocsDetails(true);
    setShowProcessBuilderDetails(false);
  };

  const handleProcessBuilderClick = () => {
    setShowAll(false);
    setShowScanifyDetails(false);
    setShowRpaDetails(false);
    setShowIntelliDocsDetails(false);
    setShowProcessBuilderDetails(true);
  };

  const handleBackToProductsClick = () => {
    setShowAll(true);
    setShowScanifyDetails(false);
    setShowRpaDetails(false);
    setShowIntelliDocsDetails(false);
    setShowProcessBuilderDetails(false);
  };
=======
import "../styles/Product.css";
 import WaveImage from '../assets/WaveImage.png';
 import SampleImage from '../assets/Scanify.png'
 import underbanner from '../assets/underbanner.png';
 import rpa from '../assets/rpa.png';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaLocationArrow, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link if you still need it
>>>>>>> c0e9173f02849dbd3341553454796999845de7f8

 const Product = () => {
  return (
<<<<<<< HEAD
    <div className="product-page">
      <img src={PurpleWave} alt="Purple Wave Design" className="wave-header" />
      <h1>Our Products</h1>
      <p>
        Explore our innovative solutions designed to streamline your business
        processes.
      </p>
      <div className="feature-boxes-container">
        {showAll && (
          <>
            <div
              className="feature-box scanify-box"
              onClick={handleScanifyClick}
            >
              <h2>Scanify</h2>
              <div className="image-container">
                <img
                  src={scanify}
                  alt="Scanify Illustration"
                  className="product-image"
                />
              </div>
              <button className="learn-more-button" style={{ display: "none" }}>
                Learn More
              </button>
            </div>
            <div
              className="feature-box intellidocs-box"
              onClick={handleIntelliDocsClick}
            >
              <h2>IntelliDocs</h2>
              <div className="image-container">
                <img
                  src={intellidocsLogo}
                  alt="IntelliDocs Illustration"
                  className="product-image"
                />
              </div>
              <button className="learn-more-button" style={{ display: "none" }}>
                Learn More
              </button>
            </div>
            <div className="feature-box rpa-box" onClick={handleRpaClick}>
              <h2>RPA</h2>
              <div className="image-container">
                <img
                  src={rpa}
                  alt="RPA Illustration"
                  className="product-image"
                />
              </div>
              <button className="learn-more-button" style={{ display: "none" }}>
                Learn More
              </button>
            </div>
            <div
              className="feature-box process-builder-box"
              onClick={handleProcessBuilderClick}
            >
              <h2>Process Builder</h2>
              <div className="image-container">
                <img
                  src={process_builder}
                  alt="Process Builder Illustration"
                  className="product-image"
                />
              </div>
              <button className="learn-more-button" style={{ display: "none" }}>
                Learn More
              </button>
            </div>
          </>
        )}
        {showScanifyDetails && (
          <div className="feature-box scanify-box scanify-details">
            <h2>Scanify Details</h2>
            <p>
              <strong>Scanify :</strong>
              <br />
              <br />
              🔄 Invoice Processing Options
              <br />
              ✅ Manual Invoice Processing
              <br />
              Process invoices one by one with full control and flexibility.
              This approach allows for a detailed review and tailored
              customization of each invoice, ideal for handling complex or
              unique billing formats.
              <br />
              <br />
              🔁 Batch Invoice Processing
              <br />
              Function:
              <br />
              Manage and process multiple invoices simultaneously.
              <br />
              <br />
              Benefits:
              <br />
              Saves time by eliminating repetitive manual tasks.
              <br />
              Increases consistency and minimizes human errors by grouping
              similar invoices.
              <br />
              Ideal for businesses with recurring formats like monthly service
              charges or vendor payments.
              <br />
              <br />
              Use Cases:
              <br />
              Monthly utility or subscription invoices
              <br />
              Vendor or supplier invoices with consistent layouts
              <br />
              Recurring service billing (e.g., cleaning, maintenance)
              <br />
              <br />
              🧠 Smart OCR Engine for Invoice Extraction
              <br />
              Our Invoice OCR API is built for intelligent automation and global
              adaptability.
              <br />
              <br />
              Core Features:
              <br />
              Seamless integration with your existing ERP, CRM, or custom
              workflows
              <br />
              Multi-language support for global invoice formats
              <br />
              <br />
              Upload invoices via:
              <br />
              Email
              <br />
              API
              <br />
              Desktop/Drive
              <br />
              Dropbox
              <br />
              RPA Bots
              <br />
              Cloud Storage
              <br />
              <br />
              Data Handling:
              <br />
              Automatically extract key fields (e.g., Vendor Name, Invoice
              Number, Date, Amount, Table Items)
              <br />
              Built-in verification interface for quick and accurate reviews
              <br />
              Custom field mapping for personalized output formats
              <br />
              <br />
              🔗 Easy Integration & Customization
              <br />
              Plug-and-play API for fast implementation
              <br />
              Adapts to your existing infrastructure
              <br />
              Dedicated support to optimize and scale with your business needs
              <br />
              Transition smoothly with minimal setup or training
            </p>
            <button className="back-button" onClick={handleBackToProductsClick}>
              Back to Products
            </button>
          </div>
        )}
        {showRpaDetails && (
          <div className="feature-box rpa-box rpa-details">
            <h2>RPA Details</h2>
            <p>
              <strong>Robotic Process Automation (RPA)</strong> is a
              cutting-edge technology that uses software bots to automate
              repetitive and rule-based tasks. These bots mimic human
              actions—clicks, typing, navigation, and data handling—to
              streamline business processes and boost productivity.
              <br />
              <br />
              ⏱️ <strong>Faster Operations</strong> – Automate time-consuming
              tasks
              <br />
              <br />
              🎯 <strong>Error Reduction</strong> – Eliminate manual mistakes
              <br />
              <br />
              💰 <strong>Cost Efficiency</strong> – Reduce operational costs
              <br />
              <br />
              🔗 <strong>System Integration</strong> – Seamlessly work with
              existing software
              <br />
              <br />
              📈 <strong>Scalability</strong> – Scale processes without hiring
              more people
              <br />
              <br />
              📊 <strong>Data Insights</strong> – Gain better visibility through
              process data
              <br />
              <br />
              Robotic Process Automation (RPA) is revolutionizing the way
              businesses operate by automating routine, repetitive tasks that
              were traditionally performed by humans. Through intelligent
              software bots, RPA mimics human actions like data entry, form
              filling, file movement, and system integration—across
              applications—without altering existing infrastructure. This leads
              to faster operations, reduced errors, and significant cost
              savings. Whether it’s processing invoices, onboarding employees,
              or extracting data from documents, RPA empowers organizations to
              improve efficiency, enhance accuracy, and focus human efforts on
              strategic decision-making.
            </p>
            <button className="back-button" onClick={handleBackToProductsClick}>
              Back to Products
            </button>
          </div>
        )}
        {showIntelliDocsDetails && (
          <div className="feature-box intellidocs-box intellidocs-details">
            <h2>IntelliDocs Details</h2>
            <p>
              <strong>Our Document Management System</strong> offers a flexible
              and secure platform to create, manage, and organize documents with
              complete control. Users can easily generate documents such as
              contracts, invoices, agreements, and internal forms, and structure
              them using a branch-based hierarchy for better organization across
              teams, departments, or locations.
              <br />
              <br />
              Each document can be fully customized by assigning specific
              fields—such as text inputs, signature field—depending on the
              document type and purpose. Users can define which fields are
              visible, editable, or required at each stage of the process.
              <br />
              <br />
              Integrated digital signature support allows authorized personnel
              to securely sign documents directly within the platform, ensuring
              legal compliance and streamlining the workflow. For invoices and
              approval-based documents, you can define a multi-step approval
              process, assigning approvers at each stage. Each step can trigger
              notifications, updates, and status changes, providing complete
              traceability and accountability.
            </p>
            <button className="back-button" onClick={handleBackToProductsClick}>
              Back to Products
            </button>
          </div>
        )}
        {showProcessBuilderDetails && (
          <div className="feature-box process-builder-box process-builder-details">
            <h2>Process Builder Details</h2>
            <p>
              <strong>Our Process Builder</strong> allows users to easily design
              custom workflows using a simple drag-and-drop interface. Without
              writing any code, you can create dynamic forms, add multiple
              fields, and define workflow stages tailored to your business
              needs. Once a form is submitted, it automatically moves through
              predefined approval stages, with access granted to managers for
              review and approval. Each stage can include custom actions,
              notifications, and conditional logic. A dedicated user portal
              ensures that every user sees only their relevant tasks and
              progress, making the entire process seamless, efficient, and fully
              trackable.
              <br />
              <br />
              Our powerful Process Builder transforms the way businesses manage
              and automate their internal workflows. With an intuitive
              drag-and-drop interface, users can create custom forms tailored to
              specific processes—whether it's data collection, document
              submission, or task tracking. Each form can include a wide variety
              of field types such as text inputs, dropdowns, file uploads,
              checkboxes, tables, and more.
              <br />
              <br />
              Once the form is created, you can easily define a multi-step
              workflow, assigning roles and permissions for each stage. Managers
              and decision-makers are given secure access to review, approve, or
              reject submissions, ensuring every process moves forward in a
              controlled and traceable manner. Approval logic can be customized,
              supporting both sequential and parallel approval paths.
              <br />
              <br />
              The system supports real-time updates, notifications, and
              conditional routing based on the input data. Every user has access
              to a personalized user portal where they can track their
              submissions, monitor approval status, and receive messages or
              feedback from reviewers.
              <br />
              <br />
              Whether you're automating HR requests, purchase orders, client
              onboarding, or internal audits, our Process Builder makes it easy
              to digitize, streamline, and scale your operations—without writing
              a single line of code.
            </p>
            <button className="back-button" onClick={handleBackToProductsClick}>
              Back to Products
            </button>
          </div>
        )}
      </div>
      <img
        src={PurpleGeometric}
        alt="Purple Geometric Design"
        className="geometric-footer"
      />
=======
    <div className="hero-section">
      <div className="hero-content">
        <img src={WaveImage} alt="Wave Banner" className="w-full block transition-opacity duration-500 opacity-90 hover:opacity-100" style={{ height: '588px' }} />
         <div
                    className="absolute "
                    style={{ width: '100%' }} >
        <p className="hero-subtitle">AI-powered productivity</p>
        <h1 className="hero-title">Work <br /> smarter, <br /> finish faster</h1>
        <p className="hero-description">Take control of your tasks, automate workflows and stay focused with our all-in-one AI-driven platform.</p>
        <button className="hero-button">Get started for free</button>
      </div>
      <div className="hero-image">
        {/* You would typically include an image here */}
      </div>
      </div>
      <div className="sample-section">
        <div className="sample-image-container">
          <img src={SampleImage} alt="Sample Productivity" className="sample-image" />
        </div>
        <div className="sample-content">
          <h2 className="sample-title">Automated task management</h2>
          <p className="sample-description">Stay organized without the hassle. Clara intelligently sorts your tasks, sets priorities and automates workflows so you can focus on what matters most.</p>
          <button className="sample-button">Get started for free</button>
        </div>
      </div>

       {/* New section with left side image */}
       <div className="left-image-section">
        <div className="left-image-container">
          <img src={rpa} alt="Left Section" className="left-image" />
        </div>
        <div className="left-content">
          <h2 className="left-title">Unlock powerful insights</h2>
          <p className="left-description">Transform raw data into actionable intelligence. Our platform provides comprehensive analytics and reporting to help you make informed decisions and drive growth.</p>
          <button className="left-button">Learn more</button>
        </div>
      </div>
      

      {/* Bottom Wave Image with Overlay Content */}
      <div className="relative w-full overflow-hidden">
        <img src={underbanner} alt="Wave Banner" className="w-full block transition-opacity duration-500 opacity-90 hover:opacity-100" />
        <div className="absolute top-0 left-0 w-full p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-start ">
          {/* Left Side Content */}
          <div className="mb-6 md:mb-0 top-0">
            <h3 className="text-xl text-gray-800 hover:text-purple-700 font-bold mb-2">
                <p>
                  Design better and spend less time <br />
                  without restricting tools creative freedom.
                </p>
            </h3>
            <h6 className="text-gray-800 uppercase text-xs mb-2">Sign-up to get interesting updates</h6>
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
              <Link to="https://www.linkedin.com/company/kodivian-technologies/posts/?feedView=all" className="text-gray-400 hover:text-white">
              <FaLinkedin className="w-5 h-5 fill-current" />
              </Link> {/* Linkdin*/}
              <Link to="https://x.com/i/flow/login?redirect_after_login=%2Fkodivian_tech" className="text-gray-400 hover:text-white">
              <FaTwitter className="w-5 h-5 fill-current" />
              </Link> {/* Twitter */}
              <Link to="https://www.instagram.com/kodivian_tech/" className="text-gray-400 hover:text-white">
              <FaInstagram className="w-5 h-5 fill-current" />
              </Link> {/*INstagram */}
              <Link to="https://www.facebook.com/p/Kodivian-Technology-100075879827039" className="text-gray-400 hover:text-white">
              <FaFacebook className="w-5 h-5  fill-current" />
              </Link> {/* Facebook */}
              <br />
            </div>
            <div className="flex  bottom-0">
  <div className="flex flex-col bottom-0 space-y-3 pr-4"> {/* Added pr-4 for spacing between icon and text */}
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
    <p className="text-gray-900 ">Meenakshi Towers, No.13 Rajamannar St, T Nagar, Chennai, 600017</p>
    <p className="text-gray-900 ">+91 8870435343</p>
    <p className="text-gray-900 ">vijaysabari.m@kodivian.com</p>
  </div>
</div> 
          </div>

          {/* Right Side Navigation Links */}
          <div className="flex">
  <div className="flex-1 flex flex-col space-y-4 space-x-4">
  <h3 className="text-purple-700 hover:text-gray-900 font-bold ">OVERALL</h3>
    <a href="#welcome" className="text-gray-800 hover:text-purple-700 duration-300 font-semibold">Home</a>
    <a href="#search" className="text-gray-800 hover:text-purple-700 duration-300 font-semibold">Search</a>
    <a href="#optimizeStrength" className="text-gray-800 hover:text-purple-700 duration-300 font-semibold">Strength</a>
    <a href="#frame" className="text-gray-800 hover:text-purple-700 duration-300 font-semibold">Framework</a>
  </div>
  <div className="flex-1 flex flex-col space-y-4 space-x-4">
  <h3 className="text-purple-700 hover:text-gray-900 font-bold ">PRODUCT</h3>
    <a href="#link2-1" className="text-gray-800 hover:text-purple-700 duration-300 font-semibold">Scanify</a>
    <a href="#link2-2" className="text-gray-800 hover:text-purple-700 duration-300 font-semibold">Intellidocs</a>
    <a href="#link2-3" className="text-gray-800 hover:text-purple-700 duration-300 font-semibold">Process Builder</a>
    <a href="#link2-4" className="text-gray-800 hover:text-purple-700 duration-300 font-semibold">RPA</a>
  </div>
  <div className="flex-1 flex flex-col space-y-5 space-x-0">
  <h3 className="text-purple-700 hover:text-gray-900 font-bold ">SERVICES</h3>
    <a href="#ai" className="text-gray-800 hover:text-purple-700 duration-300 font-semibold">Artificial Intelligence</a>
    <a href="#bpm" className="text-gray-800 hover:text-purple-700 duration-300 font-semibold">Business Process Management</a>
    <a href="#rpa" className="text-gray-800 hover:text-purple-700 duration-300 font-semibold">Robotic Process Automation</a>
  </div>
</div>
</div>
{/* Copyright and Design Info */}
<div className="absolute bottom-0 font-semibold mb-6 md:mb-0 w-full text-white p-4 text-center text-xs">
    Copyright © 2025 All Right Reserved & Designed By KodivianTechnologies
  </div>
      </div>


>>>>>>> c0e9173f02849dbd3341553454796999845de7f8
    </div>
  );
 };

<<<<<<< HEAD
export default Product;
=======
 export default Product;
>>>>>>> c0e9173f02849dbd3341553454796999845de7f8
