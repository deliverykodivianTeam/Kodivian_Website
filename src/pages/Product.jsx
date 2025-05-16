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

const Product = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const products = [
        { name: "Scanify", description: "Intelligent Invoice Processing solution that automates data extraction from invoices, reducing manual effort and errors. It streamlines accounts payable workflows, improves accuracy, and accelerates processing times. Scanify integrates seamlessly with existing accounting systems for enhanced efficiency.", image: SampleImage, link: "/scanify" },
        { name: "Process Builder", description: "A No-Code Workflow Automation platform empowering businesses to design and automate  workflows without writing any code. It enables seamless integration between various applications, improves operational efficiency, and provides real-time visibility into process execution. Process Builder is highly customizable and scalable to meet evolving business needs.", image: processbuilder, link: "/processbuilder" },
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
            <div className="product-page">
                <div className="hero-section elevated">
                    <div className="hero-content">
                        <p className="hero-subtitle primary-text">Explore Our Leading Solutions</p>
                        <h1 className="hero-title secondary-text">Empowering Businesses with Automation, Intelligence, Simplicity, and Speed</h1>
                        <p className="hero-description tertiary-text">Discover an integrated suite of smart tools designed to modernize your business, cut down manual work, and accelerate digital transformation — all without complexity.</p>
                        <button onClick={handleOpenPopup} className="hero-button primary-button">Request a Demo</button>
                        <DemoBookingPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
                    </div>
                </div>

                <section className="product-showcase-redesigned elevated">
                    <div className="featured-solution-container">
                        {visibleProduct && (
                            <div className="featured-product">
                                <div className="featured-image">
                                    <img src={visibleProduct.image} alt={visibleProduct.name} />
                                </div>
                                <div className="featured-content">
                                    <h3 className="secondary-text featured-title">{visibleProduct.name}</h3>
                                    <p className="tertiary-text featured-description">{visibleProduct.description}</p>
                                    {/* <Link to={visibleProduct.link} className="accent-text featured-learn-more">Learn More</Link>  */}
                                    <button onClick={handleOpenPopup} className="primary-button featured-demo-button">Request a Demo</button>
                                </div>
                            </div>
                        )}
                        <button className="carousel-button prev" onClick={prevSlide}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button className="carousel-button next" onClick={nextSlide}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </section>

                <section className="process-flow elevated">
                    <h2 className="section-title secondary-text">Our Product Process Flow</h2>
                    <div className="process-steps">
                        <div className="process-step">
                            <FontAwesomeIcon icon={faCogs} className="process-icon" />
                            <h4 className="secondary-text">Integration</h4>
                            <p className="tertiary-text">Seamlessly integrate our solutions with your existing systems and data sources.</p>
                        </div>
                        <div className="process-step">
                            <FontAwesomeIcon icon={faFileAlt} className="process-icon" />
                            <h4 className="secondary-text">Processing</h4>
                            <p className="tertiary-text">Intelligent processing of data and documents using advanced AI algorithms.</p>
                        </div>
                        <div className="process-step">
                            <FontAwesomeIcon icon={faChartLine} className="process-icon" />
                            <h4 className="secondary-text">Analysis</h4>
                            <p className="tertiary-text">Gain valuable insights and analytics from processed information.</p>
                        </div>
                        <div className="process-step">
                            <FontAwesomeIcon icon={faRocket} className="process-icon" />
                            <h4 className="secondary-text">Automation</h4>
                            <p className="tertiary-text">Automate workflows and repetitive tasks for increased efficiency.</p>
                        </div>
                    </div>
                </section>

                <section className="our-products elevated">
                    <div className="section-heading">
                        <h2 className="section-title secondary-text">Our Range of Intelligent Solutions</h2>
                        <p className="section-description tertiary-text">Explore our suite of AI-powered products designed to drive efficiency and innovation.</p>
                    </div>
                    <div className="product-grid">
                        {products.map((product) => (
                            <div key={product.name} className="product-card">
                                 <Link to={product.link} className="accent-text">
                                <div className="product-card-image">
                                    <img src={product.image} alt={product.name} />
                                </div>
                                  </Link>
                                <div className="product-card-content">
                                    <h3 className="secondary-textpro">{product.name}</h3>
                                    <p className="tertiary-text">{product.description.split('. ')[0]}.</p>
                                    <Link to={product.link} className="accent-text">Learn More</Link>
                                </div>
                               
                            </div>
                        ))}
                    </div>
                </section>

                <div className="call-to-action elevated">
                    <div className="cta-content">
                        <h2 className="cta-title secondary-text">Ready to Transform Your Business?</h2>
                        <p className="cta-description tertiary-text">Contact us today to learn how our AI solutions can meet your specific needs.</p>
                        <button onClick={handleOpenPopup} className="cta-button primary-button">Request a Consultation</button>
                    </div>
                </div>
            </div>
            <Belowbar />
        </div>
    );
};

export default Product;