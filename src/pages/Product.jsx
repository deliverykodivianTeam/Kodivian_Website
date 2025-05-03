import "../styles/Product.css";
 import WaveImage from '../assets/WaveImage.png';
 import SampleImage from '../assets/Scanify.png'
 import underbanner from '../assets/banner34.png';
 import intellidocs from '../assets/intellidocs.png';
 import processbuilder from '../assets/process_builder.png';
 import rpa from '../assets/rpa.png';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaLocationArrow, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link if you still need it

 const Product = () => {

  return (
    <div>
    <div className="hero-section">
      <div className="hero-content">
        <img src={WaveImage} alt="Wave Banner" className="w-full block transition-opacity duration-500 opacity-90 hover:opacity-100" style={{ height: '588px' }} />
        <div
          className="absolute"
          style={{ width: '100%' }}
        >
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

    </div>
  );
 };
 export default Product;