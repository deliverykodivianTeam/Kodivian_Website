import React from 'react';
import { Carousel, Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/Home.css'; // Import the dedicated CSS file

import Belowbar from "../components/Belowbar"; // Adjust the path if necessary

// Import product images
import icon1 from '../assets/scanifyprocess.png';
import icon2 from '../assets/processbuilderpro.png';
import icon3 from '../assets/rpapro.png';
import icon4 from '../assets/docpro.png'; // Assuming this is for IntelliDocs
// The whoWeAreImage import was not used in the provided JSX for the Who We Are section,
// so I'm commenting it out or suggesting to remove if it's not going to be used for consistency.
// import whoWeAreImage from '../assets/image7.jpeg'; // New import for the Who We Are image

// Client Logo Imports
import ponpureLogo from '../assets/ponpure.png';
import tiCycleLogo from '../assets/ti-cycle.png';
import murugappalogo from '../assets/murugappa.png';
import khazanaLogo from '../assets/khazana.png';
import sharatIndustriesLogo from '../assets/sharat-industries.png';
import dabicoLogo from '../assets/dabico.png';
import dmccLogo from '../assets/dmcc.png';
import aavaBrandsLogo from '../assets/aava-brands.png';
import tiMedicallogo from '../assets/ti_medical.png';
import Innoventure_logo from '../assets/3xper_innoventure_limited_logo.png';
import shanthigearslogo from '../assets/shanthi-gears.png';
import ezcloud from '../assets/ezcloud.png';
import ionidea from '../assets/ionidea.png';
import eastman from '../assets/eastman.png';

const Home = () => {
    // Combine all client logos into an array for easier mapping
    const clientLogos = [
        ponpureLogo, tiCycleLogo, murugappalogo, khazanaLogo, sharatIndustriesLogo,
        dabicoLogo, dmccLogo, aavaBrandsLogo, tiMedicallogo, Innoventure_logo,
        shanthigearslogo, ezcloud, ionidea, eastman
    ];

    return (
        <>
            {/* Introduction Section */}
      <section className="py-5 mt-5 home-intro-section hide-under-navbar">

  <Container className="py-5 mt-3">
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
                            <p className="lead text-violet">
                                Ready to transform your business operations?
                            </p>
                            <a
                                href="#contact"
                                className="btn btn-lg text-white bg-violet px-4 py-2 home-demo-button"
                            >
                                Schedule a Free Demo
                            </a>
                        </Col>
                    </Row>
                </Container>
            </section>


            {/* Product Carousel Section */}
            <section className="product-carousel-section p-0"> {/* Removed inline styles, managed by CSS */}
                <Carousel controls={false} indicators={true} interval={3000} className="bg-light product-carousel-custom">
                    {/* Slide 1: Scanify */}
                    <Carousel.Item className="bg-light">
                        <Container fluid>
                            <Row className="align-items-center py-5">
                                <Col md={6} className="text-center">
                                    <img
                                        className="d-block mx-auto img-fluid product-icon"
                                        src={icon1}
                                        alt="Scanify Process Icon"
                                    />
                                </Col>
                                <Col md={6} className="text-center text-md-start">
                                    <h1 className="display-4 fw-bold text-violet">Scanify: Intelligent Data Extraction via OCR</h1>
                                    <p className="lead product-description">
                                        uses advanced OCR technology to scan documents and extract accurate data instantly. It eliminates the need for manual input by capturing information directly from scanned images or PDFs. Once extracted, the data can be automatically stored or sent to any connected system, making data handling faster, error-free, and efficient.
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </Carousel.Item>

                    {/* Slide 2: Process Builder */}
                    <Carousel.Item className="bg-light">
                        <Container fluid>
                            <Row className="align-items-center py-9">
                                <Col md={{ span: 6, order: 'last' }} className="text-center text-md-end">
                                    <img
                                        className="d-block mx-auto img-fluid product-icon"
                                        src={icon2}
                                        alt="Process Builder Pro Icon"
                                    />
                                </Col>
                                <Col md={6} className="text-center text-md-start px-5">
                                    <h1 className="display-4 fw-bold text-violet">Process Builder: Intuitive Application & Workflow Design</h1>
                                    <p className="lead product-description">
                                        Uses a no-code platform that lets you drag, drop, and design customized forms effortlessly. Beyond form creation, you can build full workflows within the same interface, assign actions, automate steps, and launch entire applications in one go. It's designed for speed, simplicity, and powerful workflow automation.
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </Carousel.Item>

                    {/* Slide 3: RPA Pro */}
                    <Carousel.Item className="bg-light">
                        <Container fluid>
                            <Row className="align-items-center py-5">
                                <Col md={6} className="text-center">
                                    <img
                                        className="d-block mx-auto img-fluid product-icon"
                                        src={icon3}
                                        alt="RPA Pro Icon"
                                    />
                                </Col>
                                <Col md={6} className="text-center text-md-start">
                                    <h1 className="display-4 fw-bold text-violet">RPA Pro: Seamless Robotic Process Automation</h1>
                                    <p className="lead product-description">
                                        helps you automate repetitive tasks with ease. Whether it’s data entry, file processing, or cross-platform actions, RPA bots handle them all efficiently. You can create, assign, and execute tasks that run 24/7 reducing manual effort, eliminating errors, and speeding up your business processes. RPA turns your routine tasks into automated workflows, freeing up your team to focus on what matters most.
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </Carousel.Item>

                    {/* Slide 4: IntelliDocs (formerly DocPro) */}
                    <Carousel.Item className="bg-light">
                        <Container fluid>
                            <Row className="align-items-center py-5">
                                <Col md={{ span: 6, order: 'last' }} className="text-center text-md-end">
                                    <img
                                        className="d-block mx-auto img-fluid product-icon"
                                        src={icon4}
                                        alt="IntelliDocs Icon"
                                    />
                                </Col>
                                <Col md={{ span: 6, order: 'first' }} className="text-center text-md-start px-5">
                                    <h1 className="display-4 fw-bold text-violet">IntelliDocs: Universal Document Management & Retrieval</h1>
                                    <p className="lead product-description">
                                        uses for smart document storage and management solution. It allows seamless integration with any existing system, letting you store, retrieve, and manage documents in a secure environment. With powerful search and validation features, you can find files in seconds and ensure data integrity across all stored content.
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
                    <Row className="ijustify-content-center g-4">
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
                    <h2 className="display-5 fw-bold text-center mb-5 text-violet">Our Valued Clients</h2>
                    <div className="client-logos-track">
                        {/* Render logos twice to create a seamless loop */}
                        {clientLogos.map((logo, index) => (
                            <div className="client-logo-item" key={`logo-1-${index}`}>
                                <img src={logo} alt={`Client Logo ${index + 1}`} className="img-fluid" />
                            </div>
                        ))}
                        {clientLogos.map((logo, index) => (
                            <div className="client-logo-item" key={`logo-2-${index}`}>
                                <img src={logo} alt={`Client Logo ${index + 1}`} className="img-fluid" />
                            </div>
                        ))}
                    </div>
                </Container>
                
            </section>



            {/* Render the new Belowbar component here */}
            <Belowbar />

        </>
    );
};

export default Home;