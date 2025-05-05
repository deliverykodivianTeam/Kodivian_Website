import React, { useState, useEffect } from 'react';
import '../styles/DemoBookingPopup.css';

const DemoBookingPopup = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [purpose, setPurpose] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [stage, setStage] = useState(1);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [today, setToday] = useState('');

  useEffect(() => {
    const todayDate = new Date().toISOString().split('T')[0];
    setToday(todayDate);
  }, []);

  const isPastDate = (dateString) => {
    return dateString < today;
  };

  const isDateDisabled = (dateString) => {
    if (!dateString) {
      return false; // Allow no date selected initially
    }
    const date = new Date(dateString);
    const dayOfWeek = date.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const dayOfMonth = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // Disable past dates
    if (isPastDate(dateString)) {
      return true;
    }

    // Disable Sundays
    if (dayOfWeek === 0) {
      return true;
    }

    // Disable 2nd and 4th Saturdays
    if (dayOfWeek === 6) {
      const firstDayOfMonth = new Date(year, month, 1);
      let firstSaturday = -1;
      for (let i = 1; i <= 7; i++) {
        const tempDate = new Date(year, month, i);
        if (tempDate.getDay() === 6) {
          firstSaturday = i;
          break;
        }
      }

      if (firstSaturday !== -1) {
        const secondSaturday = firstSaturday + 7;
        const fourthSaturday = firstSaturday + 21;
        return dayOfMonth === secondSaturday || dayOfMonth === fourthSaturday;
      }
      return false; // Should not happen, but as a fallback
    }

    return false;
  };

  const isTimeValid = (timeString) => {
    if (!timeString) {
      return true; // Allow empty time initially
    }
    const [hoursStr, minutesStr] = timeString.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    return (hours > 9 || (hours === 9 && minutes >= 30)) && (hours < 18 || (hours === 18 && minutes === 0));
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setSelectedTime(time);
  };

  const handleNext = () => {
    setError('');
    if (stage === 1) {
      if (!name || !company || !purpose || !selectedOption) {
        setError('Please fill in all fields.');
        return;
      }
      setStage(2);
    } else if (stage === 2) {
      if (!selectedDate) {
        setError('Please select a date.');
        return;
      }
      if (isDateDisabled(selectedDate)) {
        setError('Selected date is not available for booking (Sundays and 2nd/4th Saturdays, or past dates).');
        return;
      }
      if (!selectedTime) {
        setError('Please select a time.');
        return;
      }
      if (!isTimeValid(selectedTime)) {
        setError('Select time between 9:30 AM and 6:00 PM IST.');
        return;
      }
      setStage(3);
    }
  };

  const handlePrevious = () => {
    if (stage > 1) {
      setStage(stage - 1);
    }
  };

  const handleBookDemo = () => {
    setError('');
    if (stage === 3) {
      setSuccessMessage(`Successfully enrolled into the demo! Your demo is booked for ${selectedDate} at ${selectedTime} IST.`);
      setTimeout(() => {
        onClose();
        setSuccessMessage('');
        setName('');
        setCompany('');
        setPurpose('');
        setSelectedOption('');
        setSelectedDate('');
        setSelectedTime('');
        setStage(1);
      }, 3000);
    }
  };

  const handleClose = () => {
    setName('');
    setCompany('');
    setPurpose('');
    setSelectedOption('');
    setSelectedDate('');
    setSelectedTime('');
    setStage(1);
    setError('');
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
            <label htmlFor="name" className="custom-label">Name</label>
            <input type="text" id="name" className="custom-input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="custom-form-group">
            <label htmlFor="company" className="custom-label">Company</label>
            <input type="text" id="company" className="custom-input" value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>
          <div className="custom-form-group">
            <label htmlFor="purpose" className="custom-label">Purpose of Demo</label>
            <textarea id="purpose" className="custom-textarea" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
          </div>
          <div className="custom-form-group">
            <label htmlFor="option" className="custom-label">Select an Option</label>
            <select id="option" className="custom-select" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
              <option value="">-- Select --</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </>
      )}

      {stage === 2 && (
        <>
          <div className="custom-form-group">
            <h3 className="custom-date-heading">Select a Date and Time (IST)</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className={`custom-input ${isDateDisabled(selectedDate) ? 'custom-input-disabled' : ''}`}
              min={today}
            />
            <input
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
              className="custom-input"
              style={{ marginTop: '10px' }}
            />
            {isDateDisabled(selectedDate) && (
              <p className="custom-error-inline">Sundays and 2nd/4th Saturdays, and past dates are not available.</p>
            )}
            {!isTimeValid(selectedTime) && selectedTime && (
              <p className="custom-error-inline">Select time between 9:30 AM and 6:00 PM IST.</p>
            )}
          </div>
        </>
      )}

      {stage === 3 && (
        <div className="custom-confirmation">
          <h3 className="custom-confirmation-heading">Confirm Your Booking</h3>
          <p className="custom-confirmation-text">
            You have selected the date: <strong>{selectedDate}</strong>
          </p>
          <p className="custom-confirmation-text">
            And the time: <strong>{selectedTime} IST</strong>
          </p>
          <p className="custom-confirmation-message">
            Please confirm your booking.
          </p>
        </div>
      )}

      {error && <p className="custom-error">{error}</p>}
      {successMessage && <p className="custom-success">{successMessage}</p>}
      <div className="custom-button-container">
        {stage > 1 && (
          <button className="custom-button custom-previous-button" onClick={handlePrevious}>Previous</button>
        )}
        {stage < 3 && (
          <button className="custom-button custom-next-button" onClick={handleNext}>Next</button>
        )}
        {stage === 3 && (
          <button className="custom-button custom-book-button" onClick={handleBookDemo}>Book Demo</button>
        )}
        <button className="custom-button custom-close-button" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default DemoBookingPopup;