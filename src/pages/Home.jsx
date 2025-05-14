import "../styles/Home.css";
import React, { useState, useEffect, useRef } from "react";
// ... other imports
import ScanifyContent from '../pages/ScanifyDetail'; // Adjust the path as needed
// ... rest of your imports
import DemoBookingPopup from '../components/DemoBookingPopup';
import { Link, useNavigate } from "react-router-dom";

// Image imports for signupage slider
import image1 from "../assets/image7.jpeg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/family.png";
import image6 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image4 from "../assets/image8.jpeg";

// Icon imports for product tabs
import icon1 from "../assets/scanifyprocess.png";
import icon2 from "../assets/docimg.jpg";
import icon3 from "../assets/rpaimg.png";
import icon4 from "../assets/proimg.png";

// Updated imports for the scrolling client logos
// YOU MUST ENSURE THESE IMAGE FILES ARE IN YOUR 'src/assets/' FOLDER
import ponpureLogo from "../assets/ponpure.png";
import tiCycleLogo from "../assets/ti-cycle.png";
import murugappaLogo from "../assets/murugappa.png";
import khazanaLogo from "../assets/khazana.png";
import sharatIndustriesLogo from "../assets/sharat-industries.png";
import dabicoLogo from "../assets/dabico.png";
import dmccLogo from "../assets/dmcc.png";
import aavaBrandsLogo from "../assets/aava-brands.png";
import tiMedicallogo from "../assets/ti_medical.png";
import Innoventure_logo from "../assets/3xper_innoventure_limited_logo.png";
import shanthigearslogo from "../assets/shanthi-gears.png";
import ezcloud from "../assets/ezcloud.png";
import ionidea from "../assets/ionidea.png";
import eastman from "../assets/eastman.png";


// Import the new Bottom component (ensure this path is correct for your project structure)
import Bottombar from '../components/Belowbar';


const images = [image1, image2, image3, image4, image5, image6]; // Used for signupage slider


const products = [
    {
        id: 1,
        name: "Scanify",
        title: "Revolutionize Your Document Management",
        description: "Leverage intelligent scanning to transform physical documents into searchable, actionable digital assets. Streamline your workflow and reduce manual data entry errors.",
        link: "/scanify",
        image: icon1,
    },
    {
        id: 2,
        name: "Intellidocs",
        title: "Smart Document Processing for Enhanced Efficiency",
        description: "Our AI-powered Intellidocs solution automates the extraction, categorization, and validation of data from various document types, ensuring accuracy and rapid processing.",
        link: "/document",
        image: icon2,
    },
    {
        id: 3,
        name: "Process Builder",
        title: "Visually Design and Automate Business Processes",
        description: "With Process Builder, you can intuitively map out, design, and automate complex business workflows. Reduce bottlenecks and achieve end-to-end process automation with ease.",
        link: "/processbuilder",
        image: icon4,
    },
    {
        id: 4,
        name: "RPA Automation",
        title: "Automate Repetitive Tasks with Robotic Process Automation",
        description: "Implement RPA bots to handle mundane, rule-based tasks across different applications. Free up your human workforce to focus on strategic initiatives and complex problem-solving.",
        link: "/robort",
        image: icon3,
    },
];

// Client logos for the new scrolling section
const originalClientLogos = [
    ponpureLogo,
    tiCycleLogo,
    murugappaLogo,
    khazanaLogo,
    sharatIndustriesLogo,
    dabicoLogo,
    dmccLogo,
    aavaBrandsLogo,
    tiMedicallogo,
    Innoventure_logo,
    shanthigearslogo,
    ezcloud,
    ionidea,
    eastman,
];

// Duplicate the original set multiple times for a truly seamless scrolling effect.
// This increases the length of the content being scrolled, making the loop reset
// less noticeable as it happens further off-screen.
const clientLogos = [
    ...originalClientLogos,
    ...originalClientLogos,
    ...originalClientLogos,
    ...originalClientLogos,
    ...originalClientLogos,
    ...originalClientLogos,
    // Add more duplicates here if you need an even longer perceived seamless scroll.
    // The more logos in the set, the more convincing the infinite scroll will appear.
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

    // State for active tab and its content
    const [activeTab, setActiveTab] = useState(products[0].id); // Start with the first product tab active
    const activeProduct = products.find(p => p.id === activeTab);

    // State to store the interval ID for auto-advancement of tabs
    const [autoAdvanceIntervalId, setAutoAdvanceIntervalId] = useState(null);

    // Ref for scrolling logos - RENAMED
    const homeScrollingLogosRef = useRef(null);
    const [isScrollingPaused, setIsScrollingPaused] = useState(false);


    // Effect for image slider in signupage (remains unchanged)
    useEffect(() => {
        const imageInterval = setInterval(() => {
            setCurrentImage(images[(currentIndex + 1) % images.length]); 
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(imageInterval);
    }, [currentIndex, images]); 


    // Effect for automatic tab advancement (remains unchanged in logic)
   useEffect(() => {
    let intervalId;

    const startAutoAdvance = () => {
        intervalId = setInterval(() => {
            setActiveTab(prevTabId => {
                const currentIdx = products.findIndex(p => p.id === prevTabId);
                const nextIdx = (currentIdx + 1) % products.length;
                return products[nextIdx].id;
            });
        }, 10000);
    };

    startAutoAdvance();

    return () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
    };
}, [products.length, setActiveTab]); // Add setActiveTab to dependencies if it's defined outside the effect

// Make sure setActiveTab is stable if defined outside the component,
// otherwise, you might need to include it in the dependency array.
// If setActiveTab is the standard useState setter, it's safe to include. // Handle manual tab clicks - clear interval and restart
    const handleTabClick = (productId) => {
        if (autoAdvanceIntervalId) {
            clearInterval(autoAdvanceIntervalId);
            setAutoAdvanceIntervalId(null);
        }
        setActiveTab(productId);
    };

    // Handlers for scrolling logos - RENAMED
    const handleHomeLogosMouseEnter = () => {
        setIsScrollingPaused(true);
    };

    const handleHomeLogosMouseLeave = () => {
        setIsScrollingPaused(false);
    };

    // Apply/remove animation class based on hover state - UPDATED REF NAME
    useEffect(() => {
        if (homeScrollingLogosRef.current) {
            if (isScrollingPaused) {
                homeScrollingLogosRef.current.style.animationPlayState = 'paused';
            } else {
                homeScrollingLogosRef.current.style.animationPlayState = 'running';
            }
        }
    }, [isScrollingPaused]);


    return (
        <div
            id="home-main-wrapper"
            className="homemain fade-up"
        >
            {/* NEW: Top Introduction Section */}
            <div className="intro-hero-section">
                <div className="intro-content">
                    <div className="welcomestyle">
                        <h1>
                            Empowering Your Business with{" "}
                            <span>
                                Next-Gen Solutions 
                            </span>
                        </h1>
                    </div>
                    <p>
                        Kodivian is at the forefront of AI and RPA technology. Our products automate tasks, optimize workflows, and deliver innovative solutions that enable businesses to thrive in an increasingly automated world.

                    </p>

                    <button className="bg-purple-600 text-white rounded-full px-8 py-3 mt-8 font-semibold hover:bg-purple-500 transition-transform duration-300 hover:scale-105" onClick={handleOpenPopup}
                    >
                        Schedule Your Free Live Demo Today
                    </button>
                    <DemoBookingPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
                </div>
            </div>

            {/* Existing: Tabbed Product Section (now sits below the intro) */}
            <div className="welcomepage-tabbed">
                {/* Tab Navigation Bar */}
                <div className="tab-navigation">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className={`tab-item ${activeTab === product.id ? 'active-tab' : ''}`}
                            onClick={() => handleTabClick(product.id)}
                        >
                            {product.name}
                            {/* Blue line indicator */}
                            {activeTab === product.id && <div className="active-tab-line"></div>}
                        </div>
                    ))}
                </div>

                {/* Content Display Area for the Active Tab */}
<div className="tab-content-display">
    <div className="tab-content-left">
        {/* Display active product's dynamic title and description */}
        <div className="tab-content-heading">
            <h1>
                Accelerate your business with {" "}
                <span>
                    {activeProduct.name}
                </span>
            </h1>
        </div>
       
    </div>

    {/* Right side content - Active Product Image (or other related visuals) */}
    <div className="tab-content-right">
        <img src={activeProduct.image} alt={activeProduct.name} className="product-display-image" />
    </div>
</div>
            </div>

            {/* NEW: Scrolling Logos Section - CLASSNAMES AND HANDLERS RENAMED */}
            <div className="home-scrolling-logos-container">
                <h2 className="home-framer-text">
                    Trusted by thousands of agencies and consulting firms
                </h2>
                <div
                    ref={homeScrollingLogosRef}
                    className={`home-scrolling-logos ${isScrollingPaused ? 'paused' : ''}`}
                    onMouseEnter={handleHomeLogosMouseEnter}
                    onMouseLeave={handleHomeLogosMouseLeave}
                >
                    {/* Duplicate the logos-set for seamless scrolling */}
                    <div className="home-logos-set">
                        {clientLogos.map((logo, index) => (
                            <img key={index} src={logo} alt={`Client Logo ${index}`} className="home-logo" />
                        ))}
                    </div>
                    <div className="home-logos-set" aria-hidden="true"> {/* aria-hidden for accessibility */}
                        {clientLogos.map((logo, index) => (
                            <img key={index + clientLogos.length} src={logo} alt={`Client Logo ${index} (duplicate)`} className="home-logo" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Sign Up Page Section - Remains after tabbed section */}
            <div className="signupage">
                <div className="page1">
                    <h4>
                        SIGN UP
                    </h4>
                    <h2>
                        Get started with our{" "}
                        <span>
                            AI platform
                        </span>
                    </h2>
                    <p className="welcome-text">
                        Partner with us, work with us, or grow with us, we turn ideas into
                        impact through intelligent innovation.
                    </p>
                    <button>
                        Get Started 
                    </button>
                </div>
                <div className="imagewel">
                    <div className="imagewelcome">
                        <img
                            src={currentImage}
                            alt="AI Platform"
                            className="companyimgwel"
                        />
                    </div>
                </div>
            </div>
            
            {/* Process Section */}
            <div className="process-section">
               
                <div className="process-header">
                      <h4 className="process-subheading">Process</h4>
                        <h1 className="process-main-heading">
                           We Follow An Excellent{" "}
                            <span>
                                Work Process
                            </span>
                        </h1>
                        <p className="process-description">
                        Our services and solutions are always based on proven methodologies such as lean six sigma practices.
                    </p>
                    </div>
                <div className="process-steps-container">
                    <div className="process-step">
                        <div className="step-number">1</div>
                        <h3>Discover & Consult</h3>
                        <p>We pre-engage well with the stake holders.</p>
                    </div>
                    <div className="process-step">
                        <div className="step-number">2</div>
                        <h3>Test & Deploy</h3>
                        <p>Our POCs are custom tested in each environment.</p>
                    </div>
                    <div className="process-step">
                        <div className="step-number">3</div>
                        <h3>Monitor & Report</h3>
                        <p>We continuously monitor the results and report</p>
                    </div>
                    <div className="process-step">
                        <div className="step-number">4</div>
                        <h3>Deliver & Optimize</h3>
                        <p>We deliver and constantly improve</p>
                    </div>
                </div>
            </div>
            
            {/* Render the new Bottom component here */}
            <Bottombar />
        </div>
    );
};

export default Home;