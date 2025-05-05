import React, { useState } from 'react';
import '../styles/DemoBookingPopup.css';

const DemoBookingPopup = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [purpose, setPurpose] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [stage, setStage] = useState(1);
  const [error, setError] = useState('');

  const handleNext = () => {
    setError('');
    if (stage === 1) {
      if (!name || !company || !purpose || !selectedOption) {
        setError('Please fill in all fields.');
        return;
      }
      setStage(2);
    }
  };

  const handlePrevious = () => {
    setStage(1);
  };

  const handleBookDemo = () => {
    setError('');
    if (stage === 2) {
      if (!selectedDate) {
        setError('Please select a date');
        return;
      }
    }
    console.log('Booking Details:');
    console.log('Name:', name);
    console.log('Company:', company);
    console.log('Purpose:', purpose);
    console.log('Selected Option:', selectedOption);
    console.log('Selected Date:', selectedDate);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="custom-popup">
      <h2 className="custom-heading">Book a Demo</h2>
      {stage === 1 && (
        <>
          <div className="custom-form-group">
            <label htmlFor="name" className="custom-label">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="custom-input"
            />
          </div>
          <div className="custom-form-group">
            <label htmlFor="company" className="custom-label">Company:</label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="custom-input"
            />
          </div>
          <div className="custom-form-group">
            <label htmlFor="purpose" className="custom-label">Purpose:</label>
            <textarea
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="custom-textarea"
            />
          </div>
          <div className="custom-form-group">
            <label htmlFor="option" className="custom-label">Option:</label>
            <select
              id="option"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="custom-select"
            >
              <option value="">Select an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </div>
        </>
      )}

      {stage === 2 && (
        <>
          <div className="custom-form-group">
            <h3 className="custom-date-heading">Select a Date</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="custom-input"
            />
          </div>
        </>
      )}
      {error && <p className="custom-error">{error}</p>}
      <div className="custom-button-container">
        {stage === 2 && (
          <button onClick={handlePrevious} className="custom-button custom-previous-button">
            Previous
          </button>
        )}
        {stage === 1 && (
          <button onClick={handleNext} className="custom-button custom-next-button">
            Next
          </button>
        )}
        {stage === 2 && (
          <button onClick={handleBookDemo} className="custom-button custom-book-button">
            Book Demo
          </button>
        )}
        <button onClick={onClose} className="custom-button custom-close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default DemoBookingPopup;
