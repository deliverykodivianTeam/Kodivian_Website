import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 // Import useState
import { Carousel, Container, Row, Col, Card, Button } from 'react-bootstrap'; // Import Button
import '../styles/Home.css'; // Import the dedicated CSS file

import Belowbar from "../components/Belowbar"; // Adjust the path if necessary

// Import product images

import icon3 from  '../assets/scanify-logo.png';
import icon4 from  '../assets/low-code.png';
import icon5 from  '../assets/SFicon.png';
// Client Logo Imports
import ponpureLogo from '../assets/ponpure.png';
import tiCycleLogo from '../assets/tii-logo.png'; 
import murugappalogo from '../assets/murugappa.png';
import khazanaLogo from '../assets/khazana.png';
import sharatIndustriesLogo from '../assets/sharat-industries.png';
import dmccLogo from '../assets/dmcc.png';
import aavaBrandsLogo from '../assets/aava-logo.jpeg';
import tiMedicallogo from '../assets/ti-medical-logo.png';
import Innoventure_logo from '../assets/3xper_innoventure_limited_logo.png';
import shanthigearslogo from '../assets/shanthi-gears.png';
import ezcloud from '../assets/ezcloud.png';
import ionidea from '../assets/ionidea.png';
import eastman from '../assets/eastman.png';
import stedmanlogo from '../assets/stedman-logo.jpeg';
import teamlogo from '../assets/Team-logo.jpeg';
import lifecelllogo from '../assets/lifecell-logo.png';
import jkf from '../assets/JKF.png';
import svr from '../assets/SV&R.png';
import tafe from '../assets/TAFE.svg';


// Make sure this path is correct for your project structure
import DemoBookingPopup from "../components/DemoBookingPopup";

async function getClientIP() {
  const res = await fetch("https://api64.ipify.org?format=json");
  const data = await res.json();
  return data.ip;
}


const Home = () => {
    const navigate = useNavigate();
    // State to control the visibility of the demo booking popup
    const [isDemoPopupOpen, setIsDemoPopupOpen] = useState(false);

    // Function to open the booking page
    const handleOpenDemoPopup = () => {
        navigate('/scanify-booking');
    };

    // Function to close the popup
    const handleCloseDemoPopup = () => {
        setIsDemoPopupOpen(false);
    };

    // Combine all client logos into an array for easier mapping
    const clientLogos = [
        ponpureLogo, tiCycleLogo, murugappalogo, khazanaLogo, sharatIndustriesLogo,
         dmccLogo, aavaBrandsLogo, tiMedicallogo, Innoventure_logo,
        shanthigearslogo, ezcloud, ionidea, eastman, stedmanlogo,teamlogo,lifecelllogo,svr,jkf,tafe
    ];

    // ⭐ Track Website Visitor
useEffect(() => {
  const trackVisitor = async () => {
    try {
      const ip = await getClientIP();

      await fetch("https://kodivian-website-5.onrender.com/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip }),
      });
    } catch (err) {
      console.error("Visitor tracking failed:", err);
    }
  };

  trackVisitor();
}, []);


    return (
        <>
            {/* Introduction Section */}
            <section className="py-0 home-intro-section ">
                <Container className="py-5 mt-0">
                    <Row className="justify-content-center text-center">
                        <Col md={10}>
                            <h2 className="hero-title display-4 fw-bold mb-3 text-black">
                                KodiVian Technology: Your Trusted Partner in Digital Transformation
                            </h2>
                            <p className="lead text-black">
                                We help businesses go digital with smart automation and seamless integrations.
                                Our OCR engine accurately extracts data from scanned documents—eliminating manual input.
                                Files are stored securely with flexible system connectivity.
                                Use our intuitive drag-and-drop builder to create forms and applications effortlessly.
                                Automate entire workflows with our visual builder and built-in RPA to save time and reduce errors.
                                Partner with KodiVian to work smarter, faster, and more efficiently.
                            </p>
                        </Col>
                    </Row>

                    <Row className="mt-5 text-center">
                        <Col>
                            <p className="lead text-violet mb-5">
                                Ready to transform your business operations?
                            </p>
                            {/* This is the button that will now open the DemoBookingPopup */}
                           <div className="demo-button-wrapper">
  <Button
    type="button"
    className="btn-lg text-white demo-schedule-button"
    onClick={handleOpenDemoPopup}
    style={{
      backgroundColor: "#9400d3",
      borderColor: "#9400d3",
      color: "#fff",
    }}
  >
    Schedule a Free Demo
  </Button>
</div>

                        </Col>
                    </Row>
                </Container>
            </section>


            {/* Product Carousel Section */}
            <section className="product-carousel-section p-0">
                <Carousel controls={false} indicators={true} interval={3000} className="bg-light product-carousel-custom">
                    {/* Slide 1: Scanify */}
                    <Carousel.Item className="bg-light">
                        <Container fluid>
                            <Row className="align-items-center py-5">
                                <Col md={4} className="text-center">
                                    <img
                                        className="d-block mx-auto img-fluid product-icon"
                                        src={icon3}
                                        alt="Scanify Process Icon"
                                    />
                                </Col>

                                <Col md={7} className="text-center text-md-start">
                                    <h1 className="display-4 fw-bold text-violet text-center full-width-header ">Scanify: Intelligent Data Extraction via OCR</h1>
                                    <p className="lead product-description">
                                        Uses advanced OCR technology to scan documents and extract accurate data instantly. It eliminates the need for manual input by capturing information directly from scanned images or PDFs. Once extracted, the data can be automatically stored or sent to any connected system, making data handling faster, error-free, and efficient.
                                    </p>
                                </Col>
                            </Row> 
                        </Container>
                    </Carousel.Item>

                    {/* Slide 2: Process Builder */}
                    <Carousel.Item className="bg-light">
                        <Container fluid>
                            <Row className="align-items-center py-5">
                                 <Col md={4} className="text-center">
                                    <img
                                        className="d-block mx-auto img-fluid product-icon"
                                        src={icon4}
                                        alt="Scanify Process Icon"
                                    />
                                </Col>
                                
                                <Col md={7} className="text-center text-md-start">
                                    <h1 className="display-4 fw-bold text-violet text-center full-width-header">Process Builder: Low-Code No-Code Workflow Automation</h1>
                                    <p className="lead product-description">
                                        Uses a no-code platform that lets you drag, drop, and design customized forms effortlessly. Beyond form creation, you can build full workflows within the same interface, assign actions, automate steps, and launch entire applications in one go. It's designed for speed, simplicity, and powerful workflow automation.
                                    </p>
                                </Col>
                                
                            </Row>
                        </Container>
                    </Carousel.Item>
                    {/* Slide 3: Support Forge */}
                    <Carousel.Item className="bg-light">
                        <Container fluid>
                            <Row className="align-items-center py-5">
                                <Col md={4} className="text-center">
                                    <img
                                        className="d-block mx-auto img-fluid product-icon"
                                        src={icon5}
                                        alt="Support Forge Icon"
                                    />
                                </Col>

                                <Col md={7} className="text-center text-md-start">
                                    <h1 className="display-4 fw-bold text-violet text-center full-width-header ">Support Forge: Ticketing Tool Management System</h1>
                                    <p className="lead product-description">
                                      A smart, automated platform that streamlines service requests, approvals, escalations, and resolutions across departments. It ensures faster response times, complete transparency, and seamless workflow management from ticket creation to closure.
                                    </p>
                                </Col>
                            </Row> 
                        </Container>
                    </Carousel.Item>
                   

                </Carousel>
            </section>


            {/* Who We Are Section */}
            <section id="who-we-are" className="py-5 bg-white">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col md={10}>
                            <h2 className="display-5 fw-bold mb-4 text-violet">Who We Are: Our Solution-Driven Approach</h2>
                            <p className="lead mb-4 text-dark">
                                Kodivian Technology is a forward-thinking digital solutions company dedicated to solving real business challenges through innovation, automation, and simplicity. We believe technology should empower not complicate—so we’ve built smart tools that streamline complex workflows, reduce manual effort, and improve operational efficiency.
                            </p>
                            <p className="mb-0 text-dark">
                                At Kodivian, our mission is clear: Transform your processes, enhance your productivity, and help your team focus on what truly matters. Whether you're a small business or an enterprise, we’re here to guide you through your digital transformation journey.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>


            {/* Our Solution Delivery Process Section */}
            <section id="product-workflowsed" className="py-5 bg-light">
                <Container>
                    <h2 className="display-5 fw-bold text-center mb-5 text-violet">Our Solution Delivery Process</h2>
                    <Row className="justify-content-center g-4"> {/* Corrected typo: ijustify-content-center to justify-content-center */}
                        {/* Step 1: Project Target Definition */}
                        <Col md={6} lg={3}>
                            <Card className="h-100 shadow-sm border-0 text-center p-3 bg-white text-dark workflow-card">
                                <Card.Body>
                                    <i className="bi bi-bullseye fs-1 text-violet"></i>
                                    <Card.Title className="h5 mb-2 fw-bold">1. Project Target & Scope</Card.Title>
                                    <Card.Text>
                                        Our solution is designed to reduce manual effort, improve data accuracy, and accelerate business processes. The scope includes advanced OCR-based scanning, seamless document storage with integration support, intuitive form building, and end-to-end process automation.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Step 2: What We Are Selling - Solution Proposition */}
                        <Col md={6} lg={3}>
                            <Card className="h-100 shadow-sm border-0 text-center p-3 bg-white text-dark workflow-card">
                                <Card.Body>
                                    <i className="bi bi-lightbulb fs-1 text-violet"></i>
                                    <Card.Title className="h5 mb-2 fw-bold">2. Our Intelligent Solution</Card.Title>
                                    <Card.Text>
                                        Users can scan and extract data from documents with high accuracy, store them securely, and access them instantly when needed. With a user-friendly drag-and-drop interface, custom forms and workflows can be created in minutes.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Step 3: Design Freeze */}
                        <Col md={6} lg={3}>
                            <Card className="h-100 shadow-sm border-0 text-center p-3 bg-white text-dark workflow-card">
                                <Card.Body>
                                    <i className="bi bi-file-earmark-check fs-1 text-violet"></i>
                                    <Card.Title className="h5 mb-2 fw-bold">3. Design Freeze & Approval</Card.Title>
                                    <Card.Text>
                                        we finalize all visual and functional design elements of the platform based on client input and usability best practices. Once the design is reviewed and approved, no additional changes are made to ensure clarity and consistency moving into development.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Step 4: Documentation Live */}
                        <Col md={6} lg={3}>
                            <Card className="h-100 shadow-sm border-0 text-center p-3 bg-white text-dark workflow-card">
                                <Card.Body>
                                    <i className="bi bi-book fs-1 text-violet"></i>
                                    <Card.Title className="h5 mb-2 fw-bold">4. Deployment & Live Documentation</Card.Title>
                                    <Card.Text>
                                        the platform is deployed in the production environment for live use. Alongside the deployment, we deliver comprehensive and real-time documentation to guide users, administrators, and technical teams. This includes user manuals, API references, and workflow guides.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>


            {/* Our Valued Clients Section */}

<section id="our-cliented" className="py-5 bg-white overflow-hidden">
    <Container fluid>
        <h2 className="display-5 fw-bold text-center mb-5 text-violet">
            Our Valued Clients
        </h2>

        <div className="clients-grid">
  {clientLogos.map((logo, index) => {
    const isLastSingle =
      clientLogos.length % 3 === 1 &&
      index === clientLogos.length - 1;

    return (
      <div
        key={index}
        className={`client-logo-box ${isLastSingle ? "center-last-logo" : ""}`}
      >
        <img src={logo} alt={`Client ${index + 1}`} />
      </div>
    );
  })}
</div>
    </Container>
</section>



            {/* This is where the DemoBookingPopup component is rendered */}
            <DemoBookingPopup
                isOpen={isDemoPopupOpen} // Pass the state variable to the popup's isOpen prop
                onClose={handleCloseDemoPopup} // Pass the function to close the popup to its onClose prop
            />
        </>
    );
};

export default Home;