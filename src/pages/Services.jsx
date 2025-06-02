import '@fontsource/roboto/300.css'; // Light
import '@fontsource/roboto/400.css'; // Regular
import '@fontsource/roboto/500.css'; // Medium
import '@fontsource/roboto/700.css'; // Bold

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap'; // Added Button
import "../styles/Services.css"; // Your custom CSS for additional styling

// Import Heroicons for a clean look
import {
    CloudIcon,
    CubeTransparentIcon,
    Cog6ToothIcon,
    ChartBarIcon,
    ServerStackIcon,
    ClipboardDocumentCheckIcon,
    CheckCircleIcon,
    LightBulbIcon
} from "@heroicons/react/24/outline";

// Corrected Cloud Icons (using react-icons for variety and specific logos)
import { FaAws } from "react-icons/fa"; // For AWS (Font Awesome)
import { VscAzure } from "react-icons/vsc"; // For Azure (VS Code Icons)
import { SiGooglecloud } from "react-icons/si"; // For Google Cloud (Simple Icons)
import { GrOracle } from "react-icons/gr"; // For Oracle (Grommet Icons)
import { MdOutlineAutoAwesome } from "react-icons/md"; // MdOutlineAutoAwesome for RPA/Software Development

// Import custom images (ensure these paths are correct relative to your project structure)
// REMEMBER: You need to download and place these images in src/assets/
import supportImage from "../assets/banner-img.png"; // Changed image names to be more generic if paths are not exact
import processImage from "../assets/intro_2.png"; // Changed image names to be more generic if paths are not exact

// Import Belowbar component (assuming it's in your components folder)
import Belowbar from "../components/Belowbar";

const Services = () => {
    // Typing effect for the hero section
    const [typingText, setTypingText] = useState("");
    const fullText = "Empowering Your Business Through Innovation";
    const typingSpeed = 70; // milliseconds per character
    const [typingComplete, setTypingComplete] = useState(false);

    useEffect(() => {
        let timer;
        if (typingText.length < fullText.length) {
            timer = setTimeout(() => {
                setTypingText(fullText.substring(0, typingText.length + 1));
            }, typingSpeed);
        } else {
            setTypingComplete(true);
            clearTimeout(timer);
        }
        return () => clearTimeout(timer);
    }, [typingText, fullText]);

    return (
        <div className="services-page-wrapper"> {/* Added a wrapper for overall styling */}
            {/* Hero Section */}
            <div className="services-hero-section mt-5 text-white text-center py-5">
                <Container>
                    <Row className="align-items-center mt-5 justify-content-center">
                        <Col lg={8}>
                           <h1 className="display-3 fw-bold mb-3 text-black">
    {typingText}
    {!typingComplete && (
        <span className="typed-cursor typed-cursor--blink">|</span>
    )}
</h1>
<p className="lead mb-4 px-lg-5 text-black">
    We partner with you to navigate complex challenges, streamline operations, and drive growth with cutting-edge solutions.
</p>

                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Section 1: Support Every Cloud */}
           <Container fluid className="py-5 bg-light" id="cloud-support">
   <Row className="gx-0 mx-0 text-center mb-5">
  <Col lg={12} className="px-0">
    <h2 className="display-4 fw-bold mb-3 text-primary-purple">
      Cloud Agnostic, Your Success is Our Focus
    </h2>
    <p className="lead text-black">
      Seamlessly integrate and optimize your infrastructure across major cloud providers. We're where your data thrives.
    </p>
  </Col>
</Row>

   <Row className="justify-content-center g-4">
  <Col xs={6} sm={4} md={3} lg={2} className="text-center">
    <Card className="h-100 p-3 border border-violet-600 shadow-sm custom-card">
      <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        <FaAws size={80} className="mb-3 cloud-icon text-orange" />
        <Card.Title className="h6 mb-0 text-black">Amazon Web Services</Card.Title>
      </Card.Body>
    </Card>
  </Col>
  <Col xs={6} sm={4} md={3} lg={2} className="text-center">
    <Card className="h-100 p-3 border border-violet-600 shadow-sm custom-card">
      <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        <VscAzure size={80} className="mb-3 cloud-icon text-azure-blue" />
        <Card.Title className="h6 mb-0 text-black">Microsoft Azure</Card.Title>
      </Card.Body>
    </Card>
  </Col>
  <Col xs={6} sm={4} md={3} lg={2} className="text-center">
    <Card className="h-100 p-3 border border-violet-600 shadow-sm custom-card">
      <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        <SiGooglecloud size={80} className="mb-3 cloud-icon text-google-green" />
        <Card.Title className="h6 mb-0 text-black">Google Cloud Platform</Card.Title>
      </Card.Body>
    </Card>
  </Col>
  <Col xs={6} sm={4} md={3} lg={2} className="text-center">
    <Card className="h-100 p-3 border border-violet-600 shadow-sm custom-card">
      <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        <GrOracle size={80} className="mb-3 cloud-icon text-oracle-red" />
        <Card.Title className="h6 mb-0 text-black">Oracle Cloud</Card.Title>
      </Card.Body>
    </Card>
  </Col>
</Row>

</Container>


            {/* Section 2: Work on AI Processes, RPA, Cloud Integration, Digital Transformation, Software Development */}
            <Container className="py-5" id="ai-processes">
                <Row className="align-items-center justify-content-center mb-5">
                    <Col lg={6} className="mb-4 mb-lg-0 order-lg-2"> {/* Image on right for large screens */}
                        <Image src={processImage} alt="AI Processes & Automation" fluid rounded className="shadow-lg services-section-image" />
                    </Col>
                    <Col lg={6} className="order-lg-1"> {/* Text on left for large screens */}
                        <h2 className="display-4 fw-bold mb-3 text-black">Intelligent Automation & Development</h2>
                        <p className="lead mb-4 text-muted">
                            Harness the power of AI to transform your business processes and accelerate your digital journey.
                        </p>
                        <ul className="list-unstyled m-0 p-0">
  <li className="d-flex align-items-start mb-3">
    <CubeTransparentIcon className="feature-icon-no-padding" />
    <div className="ms-2">
      <h5 className="fw-bold mb-1 text-primary-purple">AI-Powered Processes & RPA</h5>
      <p className="text-muted mb-0">Automate repetitive tasks, improve efficiency, and reduce operational costs with intelligent Robotic Process Automation.</p>
    </div>
  </li>
  <li className="d-flex align-items-start mb-3">
    <CloudIcon className="feature-icon-no-padding" />
    <div className="ms-2">
      <h5 className="fw-bold mb-1 text-primary-purple">Cloud Integration</h5>
      <p className="text-muted mb-0">Seamlessly connect your applications and data across various cloud environments for a unified ecosystem.</p>
    </div>
  </li>
  <li className="d-flex align-items-start mb-3">
    <Cog6ToothIcon className="feature-icon-no-padding" />
    <div className="ms-2">
      <h5 className="fw-bold mb-1 text-primary-purple">Digital Transformation</h5>
      <p className="text-muted mb-0">Reimagine your business models and customer experiences through strategic digital adoption and innovation.</p>
    </div>
  </li>
  <li className="d-flex align-items-start">
    <MdOutlineAutoAwesome className="feature-icon-no-padding" />
    <div className="ms-2">
      <h5 className="fw-bold mb-1 text-primary-purple">Software Development</h5>
      <p className="text-muted mb-0">Custom-tailored software solutions, built with modern technologies and agile methodologies to meet your unique needs.</p>
    </div>
  </li>
</ul>

                    </Col>
                </Row>
            </Container>

            {/* Section 3: Technology Offerings - Digital Product Engineering, Data Analytics, Cloud Interface, Enterprise Solution */}
            <Container fluid className="py-5 bg-light-purple text-black" id="technology-offerings">
                <Row className="justify-content-center text-center mb-5">
                    <Col lg={8}>
                        <h2 className="display-4 text-black fw-bold mb-3">Our Core Technology Expertise</h2>
                        <p className="lead text-black">
                            Leveraging cutting-edge technologies to build robust, scalable, and future-proof solutions for your business.
                        </p>
                    </Col>
                </Row>
                <Row className="justify-content-center g-4">
                    <Col md={6} lg={3}>
                        <Card className="h-100 bg-secondary-purple text-white border-0 shadow custom-card">
                            <Card.Body className="text-center p-4">
                                <LightBulbIcon className="mb-3 tech-icon text-black" />
                                <Card.Title className="h5 fw-bold text-violet mb-2">Digital Product Engineering</Card.Title>
                                <Card.Text className="text-black">
                                    From concept to launch, we engineer innovative digital products that stand out.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} lg={3}>
                        <Card className="h-100 bg-secondary-purple text-white border-0 shadow custom-card">
                            <Card.Body className="text-center p-4">
                                <ChartBarIcon className="mb-3 tech-icon text-black" />
                                <Card.Title className="h5 fw-bold text-violet mb-2">Data Analytics</Card.Title>
                                <Card.Text className="text-black">
                                    Transform raw data into actionable insights for smarter business decisions.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} lg={3}>
                        <Card className="h-100 bg-secondary-purple text-white border-0 shadow custom-card">
                            <Card.Body className="text-center p-4">
                                <CloudIcon className="mb-3 tech-icon text-black" />
                                <Card.Title className="h5 fw-bold text-violet mb-2">Cloud Interface Development</Card.Title>
                                <Card.Text className="text-black">
                                    Intuitive and efficient interfaces for seamless interaction with cloud services.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} lg={3}>
                        <Card className="h-100 bg-secondary-purple text-white border-0 shadow custom-card">
                            <Card.Body className="text-center p-4">
                                <ServerStackIcon className="mb-3 tech-icon text-black" />
                                <Card.Title className="h5 fw-bold text-violet mb-2">Enterprise Solutions</Card.Title>
                                <Card.Text className="text-black">
                                    Robust and scalable solutions to meet the complex demands of large organizations.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Section 4: Product Support & Project Lifecycle */}
            <Container className="py-5" id="product-support">
                <Row className="align-items-center justify-content-center mb-5">
                    <Col lg={2} className="mb-4 mb-lg-0">
                        <Image src={supportImage} alt="Product Support & Project Lifecycle" fluid rounded className="shadow-lg services-section-image" />
                    </Col>
                    <Col lg={10}>
                        <h2 className="display-4 fw-bold mb-3 text-black">Comprehensive Product & Project Support</h2>
                        <p className="lead mb-4 text-muted">
                            From initial concept to successful deployment and beyond, we provide hands-on, proactive support at every stage.
                        </p>
                        <Row className="g-3">
                            <Col md={6}>
                                <div className="d-flex align-items-start mb-3">
                                    <ClipboardDocumentCheckIcon className="flex-shrink-0 me-3 process-icon text-black" />
                                    <div>
                                        <h5 className="fw-bold mb-1 text-black">Project Planning & Discovery</h5>
                                        <p className=" text-primary-purple mb-0">Laying a strong foundation with detailed planning and thorough requirement gathering.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="d-flex align-items-start mb-3">
                                    <ClipboardDocumentCheckIcon className="flex-shrink-0 me-3 process-icon text-black" />
                                    <div>
                                        <h5 className="fw-bold mb-1 text-black">Development & Reporting</h5>
                                        <p className=" text-primary-purple mb-0">Iterative development with transparent progress reporting.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="d-flex align-items-start">
                                    <CheckCircleIcon className="flex-shrink-0 me-3 process-icon text-black" />
                                    <div>
                                        <h5 className="fw-bold mb-1 text-black">UAT & Go-Live</h5>
                                        <p className=" text-primary-purple mb-0">Ensuring quality through user acceptance testing and smooth product launch.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="d-flex align-items-start">
                                    <CheckCircleIcon className="flex-shrink-0 me-3 process-icon text-black" />
                                    <div>
                                        <h5 className="fw-bold mb-1 text-black">Proactive Hands-on Support</h5>
                                        <p className=" mb-0  text-primary-purple">Continuous monitoring, maintenance, and expert assistance post-launch.</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            {/* Concluding Section */}
        <Container fluid className="py-5 bg-primary-purple text-white text-center mb-3">
  <Row className="align-items-center justify-content-center flex-column-reverse flex-lg-row">
    <h2 className="display-4 fw-bold">Let's Build the Future Together.</h2>
    <p className="lead mb-4">Ready to transform your business? Contact us today!</p>
    <Button variant="outline-light" className="btn-small">
      Get Started
    </Button>
  </Row>
</Container>


        </div>
    );
};

export default Services;