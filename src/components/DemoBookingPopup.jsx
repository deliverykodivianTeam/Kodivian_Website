import React, { useState, useEffect } from 'react';
import '../styles/DemoBookingPopup.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment-timezone';

const DemoBookingPopup = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [purpose, setPurpose] = useState('');
    const [product, setProduct] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [stage, setStage] = useState(1);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const istTimeZone = 'Asia/Kolkata';

    useEffect(() => {
        if (selectedDate) {
            generateAvailableTimes(selectedDate);
        } else {
            setAvailableTimes([]);
        }
    }, [selectedDate]);

    const generateAvailableTimes = (date) => {
        const times = [];
        const startTime = moment.tz(date, istTimeZone).startOf('day').add(9, 'hours').add(30, 'minutes'); // 9:30 AM IST
        const endTime = moment.tz(date, istTimeZone).startOf('day').add(18, 'hours'); // 6:00 PM IST
        let currentTime = startTime.clone();

        while (currentTime.isBefore(endTime)) {
            times.push(currentTime.format('HH:mm'));
            currentTime.add(30, 'minutes');
        }
        setAvailableTimes(times);
    };

    const isWeekend = ({ date, view }) => {
        if (view === 'month') {
            const day = date.getDay();
            return day === 0 || day === 6; // 0 for Sunday, 6 for Saturday
        }
        return false;
    };

    const sendInitialEnquiryEmail = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/send-demo-enquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, company, purpose, product }),
            });

            if (!response.ok) {
                console.error('Failed to send initial enquiry email');
                setError('Failed to send initial enquiry. Please try again.');
            }
        } catch (error) {
            console.error('Error sending initial enquiry email:', error);
            setError('Failed to send initial enquiry. Please try again.');
        }
    };

    const handleNext = () => {
        setError('');
        if (stage === 1) {
            if (!name || !email || !company || !purpose || !product) {
                setError('Please fill in all fields.');
                return;
            }
            if (!/\S+@\S+\.\S+/.test(email)) {
                setError('Please enter a valid email address.');
                return;
            }
            // Send the initial enquiry email
            sendInitialEnquiryEmail();
            setStage(2);
        } else if (stage === 2) {
            if (!selectedDate) {
                setError('Please select a date.');
                return;
            }
            setStage(3); // Proceed to confirmation
        }
    };

    const handlePrevious = () => {
        if (stage > 1) {
            setStage(stage - 1);
            setError('');
        }
    };

    const handleBookDemo = async () => {
        setError('');
        if (stage === 3) {
            if (!selectedTime) {
                setError('Please select a time.');
                return;
            }
            const formattedDate = moment(selectedDate).tz(istTimeZone).format('YYYY-MM-DD');
            try {
                const response = await fetch('http://localhost:3001/api/book-demo-email', { // Changed API endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        company,
                        purpose,
                        product,
                        selectedDate: formattedDate,
                        selectedTime,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setSuccessMessage(data.message || `Successfully enrolled into the demo! Your demo is booked for ${formattedDate} at ${selectedTime} IST. We have sent you a confirmation email with the meeting link.`);
                    setTimeout(() => {
                        onClose();
                        setSuccessMessage('');
                        setName('');
                        setEmail('');
                        setCompany('');
                        setPurpose('');
                        setProduct('');
                        setSelectedDate(null);
                        setSelectedTime('');
                        setStage(1);
                    }, 5000);
                } else {
                    const errorData = await response.json();
                    setError(errorData.error || 'Failed to book demo. Please try again.');
                }
            } catch (error) {
                console.error('Error booking demo:', error);
                setError('Failed to book demo. Please try again.');
            }
        }
    };

    const handleClose = () => {
        setName('');
        setEmail('');
        setCompany('');
        setPurpose('');
        setProduct('');
        setSelectedDate(null);
        setSelectedTime('');
        setStage(1);
        setError('');
        onClose();
    };

    const handleDateChange = (date) => {
        const day = date.getDay();
        if (day !== 0 && day !== 6) { // Allow selection only if not Sunday (0) or Saturday (6)
            setSelectedDate(date);
        }
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <>
            {isOpen && <div className="popup-overlay-blur" onClick={onClose}></div>}
            <div className="custom-popup">
                <h2 className="custom-heading">Book a Demo</h2>
                {stage === 1 && (
                    <>
                        <div className="custom-form-group">
                            <label htmlFor="name" className="custom-label">Name</label>
                            <input type="text" id="name" className="custom-input" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="custom-form-group">
                            <label htmlFor="email" className="custom-label">Email</label>
                            <input type="email" id="email" className="custom-input" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                            <label htmlFor="product" className="custom-label">Product</label>
                            <select id="product" className="custom-select" value={product} onChange={(e) => setProduct(e.target.value)}>
                                <option value="">-- Select --</option>
                                <option value="All Product">All Product</option>
                                <option value="Scanify">Scanify</option>
                                <option value="Process builder">Process builder</option>
                                <option value="RPA">RPA</option>
                                <option value="Intelli-docs">Intelli-docs</option>
                                {/* Add more product options as needed */}
                            </select>
                        </div>
                    </>
                )}

                {stage === 2 && (
                    <>
                        <h3 className="custom-stage-heading">Select Date and Time (IST)</h3>
                        <div className="custom-calendar-container">
                            <Calendar
                                value={selectedDate}
                                onChange={handleDateChange}
                                minDate={new Date()} // Prevent selecting past dates
                                tileClassName={({ date, view }) => (isWeekend({ date, view }) ? 'react-calendar__tile--weekend-disabled' : null)}
                                tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6}
                            />
                        </div>
                        {selectedDate && (
                            <div className="custom-time-selection">
                                <label htmlFor="time" className="custom-label">Select Time (IST)</label>
                                <select
                                    id="time"
                                    className="custom-select"
                                    value={selectedTime}
                                    onChange={handleTimeChange}
                                >
                                    <option value="">-- Select Time --</option>
                                    {availableTimes.map((time) => (
                                        <option key={time} value={time}>{moment.tz(selectedDate, istTimeZone).format('YYYY-MM-DD')} - {time} IST</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </>
                )}

                {stage === 3 && (
                    <div className="custom-confirmation">
                        <h3 className="custom-confirmation-heading">Confirm Your Booking</h3>
                        {selectedDate && (
                            <p className="custom-confirmation-text">
                                You have selected the date: <strong>{moment(selectedDate).tz(istTimeZone).format('YYYY-MM-DD')}</strong>
                            </p>
                        )}
                        {selectedTime && (
                            <p className="custom-confirmation-text">
                                And the time: <strong>{selectedTime} IST</strong>
                            </p>
                        )}
                        <p className="custom-confirmation-message">
                            Please confirm your booking details.
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
        </>
    );
};

export default DemoBookingPopup;