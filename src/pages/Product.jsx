import "../styles/Product.css";
import SampleImage from '../assets/Scanify.png';
import intellidocs from '../assets/intellidocs.png';
import processbuilder from '../assets/process_builder.png';
import rpa from '../assets/rpa.png';
import DemoBookingPopup from '../components/DemoBookingPopup';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Belowbar from '../components/Belowbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCogs, faFileAlt, faChartLine, faRocket } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Button, Card } from 'react-bootstrap'; // Import Bootstrap components

const Product = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const products = [
        { name: "Scanify", description: "Intelligent Invoice Processing solution that automates data extraction from invoices, reducing manual effort and errors. It streamlines accounts payable workflows, improves accuracy, and accelerates processing times. Scanify integrates seamlessly with existing accounting systems for enhanced efficiency.", image: SampleImage, link: "/scanify" },
        { name: "Process Builder", description: "A No-Code Workflow Automation platform empowering businesses to design and automate workflows without writing any code. It enables seamless integration between various applications, improves operational efficiency, and provides real-time visibility into process execution. Process Builder is highly customizable and scalable to meet evolving business needs.", image: processbuilder, link: "/processbuilder" },
        { name: "RPA", description: "Robotic Process Automation to automate repetitive, rule-based tasks across different applications and systems. RPA bots can handle data entry, form filling, report generation, and more, freeing up human employees for higher-value activities. Our RPA solution is designed for scalability, reliability, and ease of deployment, delivering significant cost savings and improved accuracy.", image: rpa, link: "/robort" },
        { name: "IntelliDoc", description: "A Smart Document Management system that uses AI to organize, classify, and retrieve documents efficiently. It offers features like intelligent search, version control, and secure access, enhancing collaboration and compliance. IntelliDoc transforms unstructured data into actionable insights, improving decision-making and overall productivity.", image: intellidocs, link: "/document" },
    ];

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const nextSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    const prevSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    };

    const visibleProduct = products[slideIndex];

    return (
        <div>
            <Container fluid className="product-page mt-0 fade-up">
                {/* Hero Section */}
                <Row className="hero-section elevated bg-white py-2 mt-0 text-center">
                    <Col lg={8} className="mx-auto mt-3">
                        <p className="hero-subtitle mt-4 primary-text text-uppercase fw-bold">Explore Our Leading Solutions</p>
                        <h1 className="hero-title secondary-text display-4 fw-bold mb-3">Empowering Businesses with Automation, Intelligence, Simplicity, and Speed</h1>
                        <p className="hero-description tertiary-text lead mb-4">Discover an integrated suite of smart tools designed to modernize your business, cut down manual work, and accelerate digital transformation — all without complexity.</p>
                        <Button variant="primary" size="lg" onClick={handleOpenPopup} className="hero-button">Request a Demo</Button>
                        <DemoBookingPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
                    </Col>
                </Row>

                {/* Product Showcase */}
                <section className="product-showcase-redesigned bg-white py-5" style={{ fontFamily: 'Roboto, sans-serif' }}>
  <Container>
    <div className="featured-solution-container position-relative">
      {visibleProduct && (
        <Card className="featured-product shadow border-0 rounded-4 overflow-hidden">
          <Row className="g-0">
            <Col md={6} className="d-flex align-items-center justify-content-center bg-light p-4">
              <Card.Img
                src={visibleProduct.image}
                alt={visibleProduct.name}
                className="img-fluid"
                style={{ maxHeight: '350px', objectFit: 'contain' }}
              />
            </Col>
            <Col md={6}>
              <Card.Body className="p-5">
                <Card.Title className="text-dark h2 fw-bold mb-3">{visibleProduct.name}</Card.Title>
                <Card.Text className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                  {visibleProduct.description}
                </Card.Text>
                <Button variant="primary" onClick={handleOpenPopup} className="px-4 py-2 rounded-pill">
                  Request a Demo
                </Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      )}

      {/* Left Arrow */}
      <Button
        className="carousel-button prev btn-light rounded-circle shadow-sm position-absolute top-50 start-0 translate-middle-y"
        onClick={prevSlide}
        style={{ width: '40px', height: '40px' }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>

      {/* Right Arrow */}
      <Button
        className="carousel-button next btn-light rounded-circle shadow-sm position-absolute top-50 end-0 translate-middle-y"
        onClick={nextSlide}
        style={{ width: '40px', height: '40px' }}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </div>
  </Container>
</section>


                {/* Product Process Flow */}
                <section className="process-flow elevated bg-light py-5">
                    <Container>
                        <h2 className="section-title secondary-text text-center mb-5">Our Product Process Flow</h2>
                        <Row className="text-center">
                            <Col md={3} className="process-step mb-4">
                                <div className="process-icon-container mx-auto mb-3">
                                    <FontAwesomeIcon icon={faCogs} className="process-icon  fa-3x" />
                                </div>
                                <h4 className="secondary-text h5">Integration</h4>
                                <p className="tertiary-text text-muted">Seamlessly integrate our solutions with your existing systems and data sources.</p>
                            </Col>
                            <Col md={3} className="process-step mb-4">
                                <div className="process-icon-container mx-auto mb-3">
                                    <FontAwesomeIcon icon={faFileAlt} className="process-icon  fa-3x" />
                                </div>
                                <h4 className="secondary-text h5">Processing</h4>
                                <p className="tertiary-text text-muted">Intelligent processing of data and documents using advanced AI algorithms.</p>
                            </Col>
                            <Col md={3} className="process-step mb-4">
                                <div className="process-icon-container mx-auto mb-3">
                                    <FontAwesomeIcon icon={faChartLine} className="process-icon fa-3x" />
                                </div>
                                <h4 className="secondary-text h5">Analysis</h4>
                                <p className="tertiary-text text-muted">Gain valuable insights and analytics from processed information.</p>
                            </Col>
                            <Col md={3} className="process-step mb-4">
                                <div className="process-icon-container mx-auto mb-3">
                                    <FontAwesomeIcon icon={faRocket} className="process-icon fa-3x" />
                                </div>
                                <h4 className="secondary-text h5">Automation</h4>
                                <p className="tertiary-text text-muted">Automate workflows and repetitive tasks for increased efficiency.</p>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* Our Products Grid - Modified for 4 in a row on larger screens */}
                <section className="our-products elevated bg-white py-5">
                    <Container>
                        <div className="section-heading text-center mb-5">
                            <h2 className="section-title secondary-text">Our Range of Intelligent Solutions</h2>
                            <p className="section-description tertiary-text text-muted">Explore our suite of AI-powered products designed to drive efficiency and innovation.</p>
                        </div>
                        <Row className="product-grid justify-content-center">
                            {products.map((product) => (
                                <Col xs={12} sm={6} md={6} lg={3} xl={3} className="mb-4" key={product.name}>
                                    <Card className="product-card h-100 shadow-sm border-0">
                                        <Link to={product.link} className="accent-text">
                                            <div className="product-card-image overflow-hidden">
                                                <Card.Img variant="top" src={product.image} alt={product.name} className="img-fluid" />
                                            </div>
                                        </Link>
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title className="secondary-textpro h4">{product.name}</Card.Title>
                                            <Card.Text className="tertiary-text flex-grow-1">{product.description.split('. ')[0]}.</Card.Text>
                                            <Link to={product.link} className="accent-text text-decoration-none mt-3 fw-bold">Learn More &rarr;</Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>


                {/* Call to Action */}
                <Row className="call-to-action elevated  text-white py-5 text-center">
                    <Col lg={8} className="mx-auto">
                        <h2 className="cta-title  display-5 fw-bold mb-3">Ready to Transform Your Business?</h2>
                        <p className="cta-description  lead mb-4">Contact us today to learn how our AI solutions can meet your specific needs.</p>
                        <Button variant="light" size="lg" onClick={handleOpenPopup} className="cta-button">Request a Consultation</Button>
                    </Col>
                </Row>

<hr
  className="mt-4 mb-4"
  style={{
    height: '5px',             // bold thickness
    backgroundColor: '#6A0DAD', // solid Bootstrap blue
    border: 'none',
    padding: '0',
  }}
/>


            </Container>
        </div>
    );
};

export default Product;