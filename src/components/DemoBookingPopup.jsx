// DemoBookingPopup.jsx
import React, { useState } from 'react';

const DemoBookingPopup = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [purpose, setPurpose] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleNext = () => {
    // Implement your logic for moving to the next step (e.g., date selection)
    console.log('Name:', name);
    console.log('Company:', company);
    console.log('Purpose:', purpose);
    console.log('Selected Option:', selectedOption);
    // You might want to update the UI to show the date selection part here
  };

  const handleBookDemo = () => {
    // Implement your demo booking submission logic here
    console.log('Booking Details:');
    console.log('Name:', name);
    console.log('Company:', company);
    console.log('Purpose:', purpose);
    console.log('Selected Option:', selectedOption);
    console.log('Selected Date:', selectedDate);
    onClose(); // Close the popup after booking
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 1000, // Ensure it's on top of other elements
      }}
    >
      <h2>Book a Demo</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="purpose">Purpose:</label>
        <textarea
          id="purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="option">Option:</label>
        <select
          id="option"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {/* Next Date Selection (Initially hidden, shown after 'Next') */}
      {/* You'll need to manage the visibility of this section based on the 'Next' button click */}
      <div>
        <h3>Select a Date</h3>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div style={{ marginTop: '15px' }}>
        <button onClick={handleNext}>Next</button>
        <button onClick={handleBookDemo}>Book Demo</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DemoBookingPopup;