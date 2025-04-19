import React, { useState } from 'react';
import '../styles/Contact.css'; // Import global styles

const Contact = () => {
  const locationData = [
    {
      id: 'location1',
      name: "Kodivian Technologies",
      addressLine1: "13, Rajamannar St, T. Nagar",
      cityStateZip: "Chennai, Tamil Nadu 600017",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242.92973951242084!2d80.23888550478041!3d13.043574691425363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5f3fb05b35ea96e4!2zMTPCsDAyJzM2LjkiTiA4MMKwMTQnMjAuNSJF!5e0!3m2!1sen!2sin!4v1640775126699!5m2!1sen!2sin", // Replace
    },
    {
      id: 'location2',
      name: "ABITS - UK",
      addressLine1: "Old Hermitage, Hermitage Ln, Windsor SL4 4AZ",
      cityStateZip: "Little Acre, United Kngdom",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2485.3227336071814!2d-0.6309265238748242!3d51.47059011339233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48767b0ca81ae9e1%3A0xe9f53d72bd8c4611!2sLittle%20Acre!5e0!3m2!1sen!2sin!4v1744976516549!5m2!1sen!2sin", // Replace
    },
    {
      id: 'location3',
      name: "ABITS - AUSTRALIA",
      addressLine1: "38 Cope St, Lane Cove NSW 2066",
      cityStateZip: "Australia",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.734224969694!2d151.15122247543505!3d-33.81917111648948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12af6f31553f99%3A0x18ccda6143319c56!2sUnit%2029%2F38%20Cope%20St%2C%20Lane%20Cove%20NSW%202066%2C%20Australia!5e0!3m2!1sen!2sin!4v1744976611255!5m2!1sen!2sin", // Replace
    },
    {
      id: 'location4',
      name: "ABITS - USA",
      addressLine1: "16192 Coastal Hwy, Lewes, DE 19958",
      cityStateZip: "United States Of America",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3110.93682376122!2d-75.2117057!3d38.765153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b8b9ee12ce8257%3A0x3122963d2d6d3bc5!2s16192%20Coastal%20Hwy%2C%20Lewes%2C%20DE%2019958%2C%20USA!5e0!3m2!1sen!2sin!4v1744976743561!5m2!1sen!2sin", // Replace
    },
  ];

  const [selectedLocationId, setSelectedLocationId] = useState(locationData[0].id);

  const handleLocationChange = (event) => {
    setSelectedLocationId(event.target.value);
  };

  const currentLocation = locationData.find(
    (location) => location.id === selectedLocationId
  );

  const currentMapEmbedUrl = currentLocation ? currentLocation.mapEmbedUrl : "";

  return (
    <div className="contact-page-layout">
      <div className="contact-map">
        <div className="location-header">
          <h2>Our Locations</h2>
          <div className="location-selector">
            <label htmlFor="location-select">Select Location:</label>
            <select
              id="location-select"
              value={selectedLocationId}
              onChange={handleLocationChange}
            >
              {locationData.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="map-container">
          <iframe
            src={currentMapEmbedUrl}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        {currentLocation && (
          <>
            <p>{currentLocation.name}</p>
            <p>{currentLocation.addressLine1}</p>
            <p>{currentLocation.cityStateZip}</p>
          </>
        )}
      </div>
      <div className="contact-form-container">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Please fill out the form below.</p>
        <form className="contact-form">
          {/* ... contact form fields ... */}
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number (Optional):</label>
            <input type="tel" id="phone" name="phone" />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input type="text" id="subject" name="subject" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;