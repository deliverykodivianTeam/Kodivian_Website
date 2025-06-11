import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import logo from '../assets/company_logo.png';
import '../styles/Navbar.css'; // Make sure this path is correct
import DemoBookingPopup from '../components/DemoBookingPopup';

// Assuming these images are used elsewhere or were commented out intentionally
// import ScanifyImage from '../assets/scanify.png';
// import IntellidocsImage from '../assets/intellidocs.png';
// import ProcessBuilderImage from '../assets/process_builder.png';
// import RpaImage from '../assets/rpa.png';

const AppNavbar = () => {
    const [expanded, setExpanded] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isDemoPopupOpen, setIsDemoPopupOpen] = useState(false);
    const [visible, setVisible] = useState(true); // Navbar is visible by default
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showProductDropdown, setShowProductDropdown] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const productDropdownRef = useRef(null);

    const closeAll = () => {
        setExpanded(false);
        setShowProductDropdown(false);
        setIsDemoPopupOpen(false);
    };

    const handleDemoClick = () => {
        closeAll();
        setIsDemoPopupOpen(true);
    };

    const toggleProductDropdown = (e) => {
        e.preventDefault();
        // If not on the product page, navigate there first
        if (location.pathname !== '/product') {
            navigate('/product');
        }
        setShowProductDropdown((prev) => !prev);
    };

    // Close product dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (productDropdownRef.current && !productDropdownRef.current.contains(event.target)) {
                setShowProductDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // >>> The core change is in this useEffect for scroll handling <<<
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const halfScreenHeight = window.innerHeight / 2; // For 'scrolled' class effect

            // Set 'scrolled' state based on scroll position (e.g., for background change)
            if (currentScrollY > halfScreenHeight) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            // Logic for "hide on scroll down, show on scroll up"
            // We want to hide if scrolling down AND we've scrolled past a certain threshold (e.g., 90px, the navbar's height)
            if (currentScrollY > lastScrollY && currentScrollY > 90) { // Using 90px as a threshold
                setVisible(false); // Hide the navbar
                closeAll();        // Close any open menus when hiding
            } else if (currentScrollY < lastScrollY) {
                // If scrolling up, always show the navbar
                setVisible(true);
            }
            // If currentScrollY <= 90 (at or near the very top), the navbar will naturally be visible
            // because `setVisible` won't be set to `false` unless `currentScrollY > 90`.

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]); // lastScrollY is a dependency for this effect

    return (
        <Navbar
            expand="lg"
            // Ensure sticky is used to allow 'top' CSS property to work for hiding/showing
            sticky="top"
            className={`py-0 custom-navbar ${scrolled ? 'scrolled-navbar' : ''} ${visible ? 'navbar-visible' : 'navbar-hidden'}`}
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
        >
            <Container>
                <Navbar.Brand as={NavLink} to="/" onClick={closeAll}>
                    <img src={logo} className="d-inline-block align-top logo-img" alt="Company Logo" />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Toggle navigation" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link-custom" onClick={closeAll}>Home</NavLink>
                        <NavLink to="/about" className="nav-link-custom" onClick={closeAll}>About</NavLink>

                        {/* Product Dropdown */}
                        <div className="nav-item custom-product-dropdown" ref={productDropdownRef}>
                            <NavLink
                                to="/product"
                                className={`nav-link-custom ${location.pathname.startsWith('/product') ? 'active' : ''}`}
                                onClick={toggleProductDropdown}
                            >
                                Product
                                <span className={`dropdown-arrow ${showProductDropdown ? 'expanded' : ''}`}>&#9660;</span>
                            </NavLink>

                            {showProductDropdown && (
                                <div className="dropdown-menu-custom show">
                                    <div className="dropdown-product-grid">
                                        <NavLink to="/scanify" className="dropdown-product-item" onClick={closeAll}>
                                            {/* <img src={ScanifyImage} alt="Scanify" className="product-image" /> */}
                                            <span>Scanify</span>
                                        </NavLink>
                                        <NavLink to="/processbuilder" className="dropdown-product-item" onClick={closeAll}>
                                            {/* <img src={ProcessBuilderImage} alt="Process Builder" className="product-image" /> */}
                                            <span>Process Builder</span>
                                        </NavLink>
                                        <NavLink to="/document" className="dropdown-product-item" onClick={closeAll}>
                                            {/* <img src={IntellidocsImage} alt="Intellidocs" className="product-image" /> */}
                                            <span>Intellidocs</span>
                                        </NavLink>
                                        <NavLink to="/robort" className="dropdown-product-item" onClick={closeAll}>
                                            {/* <img src={RpaImage} alt="RPA" className="product-image" /> */}
                                            <span>RPA</span>
                                        </NavLink>
                                    </div>
                                </div>
                            )}
                        </div>

                        <NavLink to="/services" className="nav-link-custom" onClick={closeAll}>Services</NavLink>
                        <NavLink to="/contact" className="nav-link-custom" onClick={closeAll}>Contact</NavLink>
                    </Nav>

                    <Button variant="primary" onClick={handleDemoClick} className="ms-lg-auto">
                        Demo Booking
                    </Button>
                </Navbar.Collapse>
            </Container>

            <DemoBookingPopup isOpen={isDemoPopupOpen} onClose={() => setIsDemoPopupOpen(false)} />
        </Navbar>
    );
};

export default AppNavbar;