import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "../styles/Contact.css";
import "../styles/Services.css"; // Ensure this is imported for color variables
import contact from "../assets/contact-pic.jpg"; // Import your contact image

// Import Icons
import { LiaPhoneSolid } from "react-icons/lia";
import { MdOutlineMailOutline, MdOutlineLocationOn } from "react-icons/md";

// Import the Belowbar component
import Belowbar from "../components/Belowbar"; // Adjust the path if necessary

const Contact = () => {
  // IMPORTANT: Replace these with ACTUAL Google Maps Embed URLs and YOUR_Maps_API_KEY
  // You need to generate these from Google Maps:
  // 1. Go to Google Maps: https://www.google.com/maps/
  // 2. Search for your location.
  // 3. Click "Share" -> "Embed a map" -> "COPY HTML".
  // 4. Extract the 'src' attribute from the <iframe> tag.
  // 5. Append '&key=YOUR_Maps_API_KEY' to the extracted URL.
  const locationData = [
    {
      id: "location1",
      name: "Kodivian Technologies - Chennai",
      addressLine1: "13, Rajamannar St, T. Nagar",
      cityStateZip: "Chennai, Tamil Nadu 600017",
      mapEmbedUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8765363470875!2d80.23627647507767!3d13.043529887278499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526747e162257d%3A0xe1eb3aba4fdedb1d!2sKodivian%20Technologies!5e0!3m2!1sen!2sin!4v1748862257114!5m2!1sen!2sin`, // Example URL
    },
    {
      id: "location2",
      name: "UK Office",
      addressLine1: "Old Hermitage, Hermitage Ln, Windsor SL4 4AZ",
      cityStateZip: "Little Acre, United Kingdom",
      mapEmbedUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.721473215516!2d-0.6277259843657755!3d51.48154187963172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48766157f9202331%3A0x8e8a9f6a7d9b2e2a!2sHermitage%20Ln%2C%20Windsor%20SL4%204AZ%2C%20UK!5e0!3m2!1sen!2sin!4v1709893988632!5m2!1sen!2sin`, // Example URL
    },
    {
      id: "location3",
      name: "Australia Office",
      addressLine1: "38 Cope St, Lane Cove NSW 2066",
      cityStateZip: "Australia",
      mapEmbedUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.183424687796!2d151.17188137521798!3d-33.82729967323605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12aed5f2f518e9%3A0x6b12aed5f2f518e9!2s38%20Cope%20St%2C%20Lane%20Cove%20NSW%202066%2C%20Australia!5e0!3m2!1sen!2sin!4v1709894042898!5m2!1sen!2sin`, // Example URL
    },
    {
      id: "location4",
      name: "USA Office",
      addressLine1: "16192 Coastal Hwy, Lewes, DE 19958",
      cityStateZip: "United States Of America",
      mapEmbedUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3092.36531980315!2d-75.14389038435775!3d38.72911437959902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b883015b6d9129%3A0x3b2a2b0e6e7b1a1c!2s16192%20Coastal%20Hwy%2C%20Lewes%2C%20DE%2019958%2C%20USA!5e0!3m2!1sen!2sin!4v1709894101918!5m2!1sen!2sin`, // Example URL
    },
  ];

  const [selectedLocationId, setSelectedLocationId] = useState(
    locationData[0].id
  );

  const navigate = useNavigate();
  const [msgForm, setMsgForm] = useState({ name: "", email: "", message: "" });
  const [msgSubmitting, setMsgSubmitting] = useState(false);

  const handleMsgChange = (e) =>
    setMsgForm({ ...msgForm, [e.target.name]: e.target.value });

  const API_URL = import.meta.env.VITE_API_URL || "https://kodivian-website-8.onrender.com";

  const handleMsgSubmit = async (e) => {
    e.preventDefault();
    setMsgSubmitting(true);
    try {
      await fetch(`${API_URL}/api/contact-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msgForm),
      });
    } catch (err) {
      console.error(err);
    }
    setMsgSubmitting(false);
    setMsgForm({ name: "", email: "", message: "" });
  };

  const handleLocationChange = (event) => {
    setSelectedLocationId(event.target.value);
  };

  const currentLocation = locationData.find(
    (location) => location.id === selectedLocationId
  );

  const currentMapEmbedUrl = currentLocation ? currentLocation.mapEmbedUrl : "";


  return (
    <div className="contact-page-wrapper">
      {/* Hero Section */}
      <div className="contact-hero-section position-relative d-flex mt-2 align-items-center text-white py-5">
        <div className="hero-background-overlay"></div>{" "}
        {/* Added for gradient */}
        <Container className="position-relative z-1">
          {" "}
          {/* Added z-1 to bring content to front */}
          <Row className="justify-content-center align-items-center g-4">
            {/* LEFT SIDE: Image */}
            <Col md={12} lg={7} className="text-center">
              {" "}
              {/* Adjusted lg size */}
              <img
                src={contact}
                alt="Contact Illustration"
                className="img-fluid contact-hero-image"
              />
            </Col>

            {/* RIGHT SIDE: Contact Info */}
            <Col md={12} lg={5}>
              {" "}
              {/* Adjusted lg size */}
              <div className="hero-contact-info fade-up">
                <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
                <p className="lead mb-4">
                  Feel free to use the form below or drop us an email.
                  Old-fashioned phone calls work too! We'd love to hear from
                  you.
                </p>
                <div className="d-flex align-items-center mb-2">
                  <LiaPhoneSolid className="me-2 contact-icon" />
                  <span>+91 88704 35343</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <MdOutlineMailOutline className="me-2 contact-icon" />
                  <span>vijaysabari.m@kodivian.com</span>
                </div>
                <div className="d-flex align-items-start mb-3">
                  <MdOutlineLocationOn className="me-2 contact-icon mt-1" />
                  <span>
                    Kodivian Technologies, 13, Rajamannar St, T. Nagar, Chennai,
                    Tamil Nadu 600017
                  </span>
                </div>

                <div className="why-contact-us-top mt-4">
                  <p className="fw-bold fs-5 mb-2">Why Contact Us?</p>
                  <ul className="list-unstyled">
                    <li>Inquiries about our services</li>
                    <li>Requesting a personalized quote</li>
                    <li>Technical support and assistance</li>
                    <li>Partnership opportunities</li>
                    <li>General feedback and suggestions</li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* --- Demo Booking Section --- */}
      <div className="demo-booking-section bg-light py-3 text-center">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
  <Button
    type="button"
    className="demo-booking-button px-4 py-2 fw-semibold"
    style={{
      backgroundColor: "#9400d3",
      borderColor: "#9400d3",
      color: "#fff",
    }}
    onClick={() => navigate('/demo')}
  >
    Book a Free Demo
  </Button>
</div>

        <div className="demo-button-info mt-2">
          Limited slots available.{" "}
          <strong>Book your personalized demo today!</strong>
        </div>
      </div>

      {/* Form + Map — full width, no gap, flush columns */}
      <div className="contact-bottom-wrap">
        <div className="contact-form-panel">
          <div className="cfp-inner">
            <h3 className="cfp-title">Send Us a Message</h3>
            <p className="cfp-desc">
              Whether it's a <strong>job enquiry</strong>, a <strong>partnership opportunity</strong>,
              or a general question — fill in your details below and our team
              will get back to you promptly.
            </p>

            <form onSubmit={handleMsgSubmit} className="cfp-form">
              <div className="cfp-group">
                <label className="cfp-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="cfp-input"
                  placeholder="Your full name"
                  value={msgForm.name}
                  onChange={handleMsgChange}
                  required
                />
              </div>
              <div className="cfp-group">
                <label className="cfp-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="cfp-input"
                  placeholder="you@example.com"
                  value={msgForm.email}
                  onChange={handleMsgChange}
                  required
                />
              </div>
              <div className="cfp-group">
                <label className="cfp-label">Message</label>
                <textarea
                  name="message"
                  className="cfp-input cfp-textarea"
                  placeholder="Tell us how we can help — job role, partnership idea, or any question..."
                  value={msgForm.message}
                  onChange={handleMsgChange}
                  rows={6}
                  required
                />
              </div>
              <button type="submit" className="cfp-btn" disabled={msgSubmitting}>
                {msgSubmitting ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </div>
        </div>

        <div className="contact-map-panel">

            {" "}
            {/* Adjusted lg size */}
            <h2 className="text-center fw-bold mb-4 text-dark-purple">
              Our Locations
            </h2>
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
              {" "}
              {/* Added flex-wrap for small screens */}
              <Form.Group
                controlId="locationSelect"
                className="mb-0 flex-grow-1 me-md-3 mb-3 mb-md-0"
              >
                {" "}
                {/* Adjusted for better spacing */}
                <Form.Label className="me-2 text-dark-purple fw-bold">
                  SELECT LOCATION :
                </Form.Label>
                <Form.Select
                  value={selectedLocationId}
                  onChange={handleLocationChange}
                  className="location-select-dropdown"
                >
                  {locationData.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="map-container rounded-3 overflow-hidden mb-3">
              {currentMapEmbedUrl ? (
                <iframe
                  src={currentMapEmbedUrl}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map Location"
                ></iframe>
              ) : (
                <div
                  className="map-placeholder d-flex align-items-center justify-content-center bg-light-purple text-secondary-purple rounded-3"
                  style={{ height: "450px" }}
                >
                  <p>Loading map...</p>
                </div>
              )}
            </div>
            {currentLocation && (
              <Card className="location-details-card mt-3 border-0 bg-light-purple text-dark-purple">
                <Card.Body>
                  <Card.Title className="fw-bold">
                    {currentLocation.name}
                  </Card.Title>
                  <Card.Text>
                    <MdOutlineLocationOn className="me-2 text-primary-purple" />
                    {currentLocation.addressLine1} <br />
                    {currentLocation.cityStateZip}
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
        </div>{/* contact-map-panel */}
      </div>{/* contact-bottom-wrap */}

    </div>
  );
};

export default Contact;
