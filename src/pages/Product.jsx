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
    const [isDemoPopupOpen, setIsDemoPopupOpen] = useState(false);
    const products = [
        { name: "Scanify", description: "Intelligent Invoice Processing solution that automates data extraction from invoices, reducing manual effort and errors. It streamlines accounts payable workflows, improves accuracy, and accelerates processing times. Scanify integrates seamlessly with existing accounting systems for enhanced efficiency.", image: SampleImage, link: "/scanify" },
        { name: "Process Builder", description: "A No-Code Workflow Automation platform empowering businesses to design and automate workflows without writing any code. It enables seamless integration between various applications, improves operational efficiency, and provides real-time visibility into process execution. Process Builder is highly customizable and scalable to meet evolving business needs.", image: processbuilder, link: "/processbuilder" },

    ];

    const handleOpenDemoPopup = () => {
  setIsDemoPopupOpen(true);
};

const handleCloseDemoPopup = () => {
  setIsDemoPopupOpen(false);
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
  <p className="hero-subtitle mt-4 primary-text text-uppercase fw-bold">
    Explore Our Leading Solutions
  </p>
  <h1 className="hero-title secondary-text display-4 fw-bold mb-3">
    Empowering Businesses with Automation, Intelligence, Simplicity, and Speed
  </h1>
  <p className="hero-description tertiary-text lead mb-4">
    Discover an integrated suite of smart tools designed to modernize your business,
    cut down manual work, and accelerate digital transformation — all without complexity.
  </p>

  {/* Center the button */}
  <div className="d-flex justify-content-center">
    <Button
      variant="primary"
      size="lg"
      onClick={handleOpenDemoPopup}
      className="hero-button mb-5"
    >
      Request a Demo
    </Button>
  </div>
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
                <Link to={visibleProduct.link}>
                <Button variant="primary"   className="px-4 py-2 rounded-pill">
                  Learn More About Product ...
                </Button>
                </Link>
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
                        <h2 className="section-title secondary-text text-center mb-5 text-dark">Our Product Process Flow</h2>

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
                           <h2 className="section-title secondary-text text-dark">
  Our Range of Intelligent Solutions
</h2>

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
                     <a
  href="https://wa.me/918870435343?text=Hi%2C%20I%20am%20Kodivian%21%20Explore%20our%204%20products.%20If%20you%20need%20any%20guidance%20or%20have%20questions%20about%20any%20concept%2C%20just%20text%20me.
"
  target="_blank"
  rel="noopener noreferrer"
>
<Button
  variant="light"
  size="lg"
  className="cta-button"
  style={{ backgroundColor: '#7F00FF', color: 'white', border: 'none' }}
>
  Request a Consultation
</Button>



</a>


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
            <DemoBookingPopup
  isOpen={isDemoPopupOpen}
  onClose={handleCloseDemoPopup}
/>
        </div>
    );
};

export default Product;