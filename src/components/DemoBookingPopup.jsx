// DemoBookingPopup.jsx
import React, { useState } from 'react';

const DemoBookingPopup = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [purpose, setPurpose] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [stage, setStage] = useState(1); // 1: Details, 2: Date
  const [error, setError] = useState('');

  const handleNext = () => {
    setError(''); // Clear any previous error
    if (stage === 1) {
      if (!name || !company || !purpose || !selectedOption) {
        setError('Please fill in all fields.');
        return; // Stop if any field is empty
      }
      setStage(2);
    }
  };

  const handleBookDemo = () => {
    setError('');
    if(stage === 2){
        if(!selectedDate){
            setError('Please select a date');
            return;
        }
    }
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
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        width: '600px',
        maxWidth: '95%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Book a Demo</h2>
      {stage === 1 && (
        <>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '16px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="company" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Company:</label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '16px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="purpose" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Purpose:</label>
            <textarea
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '16px', height: '80px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="option" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Option:</label>
            <select
              id="option"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '16px' }}
            >
              <option value="">Select an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </>
      )}

      {/* Next Date Selection (Initially hidden, shown after 'Next') */}
      {stage === 2 && (
        <>
          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Select a Date</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '16px' }}
            />
          </div>
        </>
      )}
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        {stage === 1 && <button onClick={handleNext} style={{ padding: '12px 25px', borderRadius: '5px', backgroundColor: '#007BFF', color: 'white', border: 'none', fontSize: '16px', cursor: 'pointer' }}>Next</button>}
        {stage === 2 && <button onClick={handleBookDemo} style={{ padding: '12px 25px', borderRadius: '5px', backgroundColor: '#28a745', color: 'white', border: 'none', fontSize: '16px', cursor: 'pointer' }}>Book Demo</button>}
        <button onClick={onClose} style={{ padding: '12px 25px', borderRadius: '5px', backgroundColor: '#6c757d', color: 'white', border: 'none', fontSize: '16px', cursor: 'pointer' }}>Close</button>
      </div>
    </div>
  );
};

export default DemoBookingPopup;
