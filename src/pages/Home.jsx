import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css'; // Custom CSS for theming and animations

// Client Logo Imports
import ponpureLogo from '../assets/ponpure.png';
import tiCycleLogo from '../assets/ti-cycle.png';
import murugappaLogo from '../assets/murugappa.png';
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

// Icon imports for product tabs
import icon1 from '../assets/scanifyprocess.png';
import icon2 from '../assets/processbuilderpro.png';
import icon3 from '../assets/rpapro.png';
import icon4 from '../assets/docpro.png';

// Import your large hero image here
// import heroImage from '../assets/your-large-hero-image.jpg'; // <--- YOU'LL NEED TO ADD THIS IMPORT

const Home = () => {
  const clientLogos = [
    ponpureLogo, tiCycleLogo, murugappaLogo, khazanaLogo,
    sharatIndustriesLogo, dabicoLogo, dmccLogo, aavaBrandsLogo,
    tiMedicallogo, Innoventure_logo, shanthigearslogo, ezcloud,
    ionidea, eastman
  ];

  // Array of product data for easier duplication
  const products = [
    { icon: icon1, title: "Scanify", description: "Scan and get structured input from invoices and other documents." },
    { icon: icon3, title: "RPA Pro", description: "Automate repetitive tasks and assign them efficiently." },
    { icon: icon2, title: "Process Builder", description: "Create powerful apps and workflows with drag-and-drop ease in minutes." },
    { icon: icon4, title: "IntelliDoc", description: "Advanced document management and processing for all your needs." }
  ];

  return (
    <div className="home-container bg-light text-dark">
      {/* Hero Section with Large Image Background - Full Screen */}
      <section className="hero-section large-image-background text-white d-flex align-items-center justify-content-center text-center">
        <div className="container">
          <h1 className="display-3 fw-bold text-white mb-4">
            Transform Your Business with Intelligent Automation
          </h1>
          <p className="lead fs-4 fw-light text-white-75 px-lg-5 mx-lg-5">
            Unlock unprecedented efficiency, accuracy, and scalability. We deliver cutting-edge AI and RPA solutions that streamline operations, empower your workforce, and drive innovation.
          </p>
          <button className="btn btn-violet btn-lg mt-4 shadow-sm">Discover Our Solutions</button>
        </div>
      </section>

      {/* Products Section - Bigger and Vertically Movable */}
      <section className="products-section py-5 bg-light">
        <div className="container text-center">
          <h2 className="text-center mb-5 display-5 fw-bold text-violet">Our Core Products</h2>
          <div className="product-carousel-container overflow-hidden position-relative mx-auto"> {/* Added wrapper */}
            <div className="product-carousel-track"> {/* Inner track for animation */}
              {/* Render products once */}
              {products.map((product, index) => (
                <div key={`product-${index}`} className="product-carousel-item">
                  <div className="product-card card shadow-lg border-0 text-center p-4">
                    <img src={product.icon} alt={`${product.title} Icon`} className="product-icon mb-4 mx-auto" />
                    <h3 className="card-title h4 text-dark mb-3">{product.title}</h3>
                    <p className="card-text text-muted">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
              {/* Duplicate products for continuous animation */}
              {products.map((product, index) => (
                <div key={`product-duplicate-${index}`} className="product-carousel-item">
                  <div className="product-card card shadow-lg border-0 text-center p-4">
                    <img src={product.icon} alt={`${product.title} Icon`} className="product-icon mb-4 mx-auto" />
                    <h3 className="card-title h4 text-dark mb-3">{product.title}</h3>
                    <p className="card-text text-muted">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us-section py-5 bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="display-5 fw-bold text-violet mb-4">Who We Are</h2>
              <p className="lead text-secondary">
                Our Company is a pioneer in intelligent automation, dedicated to helping businesses navigate the complexities of the digital age. With a deep understanding of industry challenges and a passion for innovation, we craft tailored solutions that deliver measurable results.
              </p>
              <p className="text-muted">
                Our team comprises experts in Artificial Intelligence, Robotic Process Automation, and advanced data analytics. We believe in building long-term partnerships, providing not just technology, but also strategic guidance to ensure your automation journey is successful and sustainable. From reducing operational costs to enhancing customer experience, we are committed to transforming your potential into performance.
              </p>
              <button className="btn btn-outline-violet mt-3">Learn More About Us</button>
            </div>
            <div className="col-lg-6">
              {/* You can add an "About Us" image here if desired */}
              <img src="https://via.placeholder.com/600x400/F8F9FA/6f42c1?text=About+Us+Image" alt="About Us" className="img-fluid rounded-3 shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="process-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 display-5 fw-bold text-violet">Our Streamlined Process</h2>
          <div className="row g-4 text-center">
            <div className="col-lg-3 col-md-6">
              <div className="process-step card h-100 shadow-sm border-0 p-4">
                <div className="process-icon-circle mx-auto mb-3 bg-violet text-white d-flex align-items-center justify-content-center">
                  1
                </div>
                <h3 className="h5 fw-bold text-dark mb-2">Enquiry & Initial Chat</h3>
                <p className="text-muted small">
                  We start with a friendly discussion to understand your business challenges and goals.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="process-step card h-100 shadow-sm border-0 p-4">
                <div className="process-icon-circle mx-auto mb-3 bg-violet text-white d-flex align-items-center justify-content-center">
                  2
                </div>
                <h3 className="h5 fw-bold text-dark mb-2">Requirement Session</h3>
                <p className="text-muted small">
                  A deeper dive into your specific needs, gathering all essential details for a tailored solution.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="process-step card h-100 shadow-sm border-0 p-4">
                <div className="process-icon-circle mx-auto mb-3 bg-violet text-white d-flex align-items-center justify-content-center">
                  3
                </div>
                <h3 className="h5 fw-bold text-dark mb-2">Product Building & Customization</h3>
                <p className="text-muted small">
                  Our experts design and develop the perfect automation solution, specifically for your operations.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="process-step card h-100 shadow-sm border-0 p-4">
                <div className="process-icon-circle mx-auto mb-3 bg-violet text-white d-flex align-items-center justify-content-center">
                  4
                </div>
                <h3 className="h5 fw-bold text-dark mb-2">Go-Live & Support</h3>
                <p className="text-muted small">
                  Seamless deployment and ongoing support to ensure smooth, efficient operation and success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Carousel Section */}
      <section className="client-section py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-4 text-violet">Our Valued Clients</h2>
          <div className="logo-carousel-container overflow-hidden position-relative">
            <div className="logo-carousel">
              {clientLogos.map((logo, index) => (
                <div key={index} className="logo-item">
                  <img src={logo} alt={`Client Logo ${index + 1}`} className="img-fluid" />
                </div>
              ))}
              {/* Duplicate logos for continuous animation effect */}
              {clientLogos.map((logo, index) => (
                <div key={`duplicate-${index}`} className="logo-item">
                  <img src={logo} alt={`Client Logo Duplicate ${index + 1}`} className="img-fluid" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;