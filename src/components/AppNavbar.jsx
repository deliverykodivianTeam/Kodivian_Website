import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import logo from '../assets/company_logo.png'; // Make sure this path is correct
import '../styles/Navbar.css'; // Make sure this path is correct
import DemoBookingPopup from '../components/DemoBookingPopup'; // Make sure this path is correct

const AppNavbar = () => {
    // State to control if the mobile navigation menu is expanded
    const [expanded, setExpanded] = useState(false);
    // State to control if the navbar has been scrolled past a certain point
    const [scrolled, setScrolled] = useState(false);
    // State to control the visibility of the Demo Booking popup
    const [isDemoPopupOpen, setIsDemoPopupOpen] = useState(false);
    // State to control the overall visibility of the navbar (for scroll-hide effect)
    const [visible, setVisible] = useState(true);
    // State to keep track of the last scroll position for hide/show on scroll
    const [lastScrollY, setLastScrollY] = useState(0);

    // Re-introducing: State to control the visibility of the product dropdown menu (desktop)
    const [showProductDropdown, setShowProductDropdown] = useState(false);
    // Re-introducing: State to control the visibility of the full-screen product overlay (mobile)
    const [showMobileProductOverlay, setShowMobileProductOverlay] = useState(false);

    // React Router hooks for location and navigation
    const location = useLocation();
    const navigate = useNavigate();

    // Refs for detecting clicks outside specific elements
    const productDropdownRef = useRef(null); // Ref for the product dropdown container (desktop)
    const customNavContentRef = useRef(null); // Ref for the main mobile collapsible menu
    const mobileProductOverlayRef = useRef(null); // Ref for the mobile product overlay itself

    // Function to close all active menus/popups
    const closeAll = () => {
        setExpanded(false); // Close the main mobile menu
        setShowProductDropdown(false); // Close the desktop product dropdown
        setIsDemoPopupOpen(false); // Close the demo booking popup
        setShowMobileProductOverlay(false); // Close the mobile product overlay
    };

    // Handler for the Demo Booking button click
    const handleDemoClick = () => {
        closeAll(); // Close any other open menus first
        setIsDemoPopupOpen(true); // Open the demo booking popup
    };

    // Toggles the product dropdown visibility (desktop) or mobile overlay
    const toggleProductDropdown = (e) => {
        e.preventDefault(); // Prevent default link behavior

        // Determine if we are on a mobile screen (Bootstrap's 'lg' breakpoint for Navbar.Toggle)
        const isMobile = window.innerWidth < 992; // Consistent with Navbar.Toggle's breakpoint

        if (isMobile) {
            // On mobile, always show the full-screen product overlay
            setShowMobileProductOverlay(true);
            setExpanded(false); // Ensure the main mobile nav is closed
            setShowProductDropdown(false); // Ensure desktop dropdown is closed
        } else {
            // On desktop, toggle the existing dropdown logic
            // Only navigate to /product if it's not already the current path AND the dropdown is closed
            if (location.pathname !== '/product' && !showProductDropdown) {
                navigate('/product');
            }
            setShowProductDropdown((prev) => !prev);
            setShowMobileProductOverlay(false); // Ensure mobile overlay is closed
        }
    };

    // Handler for clicks on individual product links within the dropdown/overlay
    const handleProductLinkClick = (path) => {
        closeAll(); // Close all menus/overlays
        navigate(path); // Navigate to the clicked product's path
    };

    // Effect to handle clicks outside the product dropdown and the main custom navigation content
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close desktop product dropdown if click outside
            if (showProductDropdown && productDropdownRef.current && !productDropdownRef.current.contains(event.target)) {
                setShowProductDropdown(false);
            }

            // Close main mobile menu if click outside (and not on toggler)
            const toggler = document.querySelector('.navbar-toggler');
            if (
                expanded &&
                customNavContentRef.current &&
                !customNavContentRef.current.contains(event.target) &&
                toggler && !toggler.contains(event.target)
            ) {
                setExpanded(false);
            }

            // Close mobile product overlay if click outside (and not on its toggle button/link)
            const productNavLink = productDropdownRef.current && productDropdownRef.current.querySelector('.nav-link-custom');
            if (
                showMobileProductOverlay &&
                mobileProductOverlayRef.current &&
                !mobileProductOverlayRef.current.contains(event.target) &&
                !(productNavLink && productNavLink.contains(event.target))
            ) {
                setShowMobileProductOverlay(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [expanded, showProductDropdown, showMobileProductOverlay]);

    // Effect for scroll handling: hide navbar on scroll down, show on scroll up
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const halfScreenHeight = window.innerHeight / 2;

            if (currentScrollY > halfScreenHeight) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            if (currentScrollY > lastScrollY && currentScrollY > 90) {
                setVisible(false);
                closeAll();
            } else if (currentScrollY < lastScrollY) {
                setVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <>
            <Navbar
                expand="lg"
                sticky="top"
                className={`py-0 custom-navbar ${scrolled ? 'scrolled-navbar' : ''} ${visible ? 'navbar-visible' : 'navbar-hidden'}`}
                expanded={expanded}
                onToggle={() => setExpanded(!expanded)}
            >
                <Container>
                    <Navbar.Brand as={NavLink} to="/" onClick={closeAll}>
                        <img src={logo} className="d-inline-block align-top logo-img" alt="Company Logo" />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="custom-navbar-content" aria-label="Toggle navigation" />

                    <div
                        ref={customNavContentRef}
                        className={`custom-nav-content ${expanded ? 'show' : ''}`}
                        id="custom-navbar-content"
                    >
                        <Nav className="me-auto">
                            <NavLink to="/" className="nav-link-custom" onClick={closeAll}>Home</NavLink>
                            <NavLink to="/about" className="nav-link-custom" onClick={closeAll}>About</NavLink>

                            {/* Product Navigation Item - behaves differently on mobile/desktop */}
                            <div className="nav-item custom-product-dropdown" ref={productDropdownRef}>
                                <NavLink
                                    to="/product"
                                    className={`nav-link-custom ${location.pathname.startsWith('/product') ? 'active' : ''}`}
                                    onClick={toggleProductDropdown}
                                >
                                    Product
                                    <span className={`dropdown-arrow ${showProductDropdown || showMobileProductOverlay ? 'expanded' : ''}`}>&#9660;</span>
                                </NavLink>

                                {/* DESKTOP Product Dropdown Menu */}
                                {showProductDropdown && (
                                    <div className="dropdown-menu-custom show desktop-only-dropdown">
                                        <div className="dropdown-product-grid">
                                            <NavLink to="/scanify" className="dropdown-product-item" onClick={() => handleProductLinkClick('/scanify')}>
                                                <span>Scanify</span>
                                            </NavLink>
                                            <NavLink to="/processbuilder" className="dropdown-product-item" onClick={() => handleProductLinkClick('/processbuilder')}>
                                                <span>Process Builder</span>
                                            </NavLink>
                                            <NavLink to="/SupportForge" className="dropdown-product-item" onClick={() => handleProductLinkClick('/SupportForge')}>
                                                <span>Support Forge</span>
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
                    </div>
                </Container>
            </Navbar>

            {/* MOBILE Product Overlay - Rendered outside Navbar for full-screen effect */}
            {showMobileProductOverlay && (
                <div id="mobile-product-overlay" className="mobile-product-overlay show mobile-only-overlay" ref={mobileProductOverlayRef}>
                    <button className="product-overlay-close-button" onClick={() => setShowMobileProductOverlay(false)}>
                        &times;
                    </button>
                    <div className="dropdown-product-grid">
                        <NavLink to="/scanify" className="dropdown-product-item" onClick={() => handleProductLinkClick('/scanify')}>
                            <span>Scanify</span>
                        </NavLink>
                        <NavLink to="/processbuilder" className="dropdown-product-item" onClick={() => handleProductLinkClick('/processbuilder')}>
                            <span>Process Builder</span>
                        </NavLink>
                        <NavLink to="/SupportForge" className="dropdown-product-item" onClick={() => handleProductLinkClick('/SupportForge')}>
                            <span>Support Forge</span>
                        </NavLink>

                    </div>
                </div>
            )}

            <DemoBookingPopup isOpen={isDemoPopupOpen} onClose={() => setIsDemoPopupOpen(false)} />
        </>
    );
};

export default AppNavbar;