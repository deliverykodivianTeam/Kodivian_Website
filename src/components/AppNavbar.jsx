import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../assets/company_logo.png';
import '../styles/Navbar.css';

const AppNavbar = () => {
    // State to control the Navbar's expanded/collapsed state for mobile
    const [expanded, setExpanded] = useState(false); // Navbar starts closed
    // State to control Navbar's scroll behavior (e.g., shrink/hide)
    const [scrolled, setScrolled] = useState(false);
    // State for scroll-up visibility
    const [visible, setVisible] = useState(true);
    // To keep track of the last scroll position for scroll-up detection
    const [lastScrollY, setLastScrollY] = useState(0);

    // Function to close the Navbar
    const closeNavbar = () => {
        setExpanded(false);
    };

    // Scroll event handler
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // --- Logic for 'scrolled' class (e.g., shrinking/changing background) ---
            // Apply 'scrolled' class if scrolled past half the viewport height
            const halfScreenHeight = window.innerHeight / 2;
            if (currentScrollY > halfScreenHeight) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            // --- Logic for 'visible' on scroll-up/down ---
            // If scrolling down AND not at the very top, hide the Navbar
            if (currentScrollY > lastScrollY && currentScrollY > 100) { // Scroll down
                setVisible(false);
            }
            // If scrolling up OR at the very top, show the Navbar
            else if (currentScrollY < lastScrollY || currentScrollY <= 100) { // Scroll up or at top
                setVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY, expanded]); 
    return (
        <Navbar
            expand="lg"
            sticky="top" // Keep sticky top for initial positioning, but scroll logic will override visibility
            className={`py-0 custom-navbar ${scrolled ? 'scrolled-navbar' : ''} ${visible ? 'navbar-visible' : 'navbar-hidden'}`}
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
            
        >
            <Container>
                <Navbar.Brand as={NavLink} to="/" onClick={closeNavbar}>
                    <img
                        src={logo}
                        className="d-inline-block align-top logo-img"
                        alt="Company Logo"
                    />
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    aria-label="Toggle navigation"
                />

                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Removed me-auto if you want less 'flex affecting' for nav links themselves */}
                    <Nav>
                        <NavLink to="/" className="nav-link-custom" onClick={closeNavbar}>Home</NavLink>
                        <NavLink to="/about" className="nav-link-custom" onClick={closeNavbar}>About</NavLink>
                        <NavLink to="/product" className="nav-link-custom" onClick={closeNavbar}>Product</NavLink>
                        <NavLink to="/services" className="nav-link-custom" onClick={closeNavbar}>Services</NavLink>
                        <NavLink to="/contact" className="nav-link-custom" onClick={closeNavbar}>Contact</NavLink>
                    </Nav>

                    {/* Added ms-auto to push the button to the right if Nav doesn't have me-auto */}
                    <Button variant="primary" as={NavLink} to="/demobooking" onClick={closeNavbar} className="ms-lg-auto">
                        Demo Booking
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;