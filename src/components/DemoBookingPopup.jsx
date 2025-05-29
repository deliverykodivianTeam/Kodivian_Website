import React, { useState, useEffect } from 'react';
import '../styles/DemoBookingPopup.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment-timezone';

const DemoBookingPopup = ({ isOpen, onClose }) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        company: '',
        purpose: '',
        product: '',
        date: null,
        time: '',
    });

    const [stage, setStage] = useState(1);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [isBooking, setIsBooking] = useState(false); // New state to prevent multiple clicks

    const istTimeZone = 'Asia/Kolkata';

    useEffect(() => {
        if (form.date) {
            const times = [];
            const start = moment.tz(form.date, istTimeZone).startOf('day').add(9, 'hours').add(30, 'minutes');
            const end = moment.tz(form.date, istTimeZone).startOf('day').add(18, 'hours');
            let current = start.clone();
            while (current.isBefore(end)) {
                times.push(current.format('HH:mm'));
                current.add(30, 'minutes');
            }
            setAvailableTimes(times);
        } else {
            setAvailableTimes([]);
        }
    }, [form.date]);

    const handleInputChange = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const handleNext = () => {
        setError('');
        if (stage === 1) {
            const { name, email, company, purpose, product } = form;
            if (!name || !email || !company || !purpose || !product) {
                setError('Please fill in all fields.');
                return;
            }
            if (!/\S+@\S+\.\S+/.test(email)) {
                setError('Please enter a valid email.');
                return;
            }
            setStage(2);
        } else if (stage === 2) {
            if (!form.date || !form.time) {
                setError('Please select both date and time.');
                return;
            }
            setStage(3);
        }
    };

    const handlePrevious = () => {
        setStage(stage - 1);
        setError('');
    };

    const handleBookDemo = async () => {
        setError('');
        setIsBooking(true); // Disable the button immediately

        try {
            const payload = {
                ...form,
                date: moment(form.date).tz(istTimeZone).format('YYYY-MM-DD'),
                timezone: istTimeZone,
            };

            const res = await fetch('https://kodivian-website-7.onrender.com/save_demo_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                const data = await res.json();
                console.log(data.message);
                setSuccessMessage('Demo booked successfully!');
                // Close the popup after 2 seconds
                setTimeout(() => handleClose(), 2000);
            } else {
                setError('Failed to save demo data. Please try again.');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Something went wrong. Please check your connection and try again.');
        } finally {
            setIsBooking(false); // Re-enable the button if an error occurs (though in this case, the popup closes)
        }
    };

    const handleClose = () => {
        setForm({
            name: '',
            email: '',
            company: '',
            purpose: '',
            product: '',
            date: null,
            time: '',
        });
        setStage(1);
        setError('');
        setSuccessMessage('');
        setIsBooking(false); // Reset booking state on close
        onClose();
    };

    const handleDateChange = (date) => {
        const day = date.getDay();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (day !== 0 && day !== 6) { // Not weekend (0 = Sunday, 6 = Saturday)
            if (date.getTime() >= today.getTime()) { // Today or future
                setForm({ ...form, date });
            }
        }
    };

    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date.getDay() === 0 || date.getDay() === 6 || date.getTime() < today.getTime();
        }
        return false;
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="popup-overlay-blur" onClick={handleClose}></div>
            <div className="custom-popup">
                {/* No H2 here if success message takes over the entire popup content */}
                {successMessage ? (
                    <div className="custom-success-container">
                       
                        <p className="custom-success">{successMessage}</p>
                    </div>
                ) : (
                    <>
                        <h2 className="custom-heading">Book a Demo</h2> {/* Keep heading for form stages */}
                        {stage === 1 && (
                            <>
                                <div className="custom-form-group">
                                    <label className="custom-label">Name</label>
                                    <input className="custom-input" value={form.name} onChange={handleInputChange('name')} />
                                </div>
                                <div className="custom-form-group">
                                    <label className="custom-label">Email</label>
                                    <input className="custom-input" type="email" value={form.email} onChange={handleInputChange('email')} />
                                </div>
                                <div className="custom-form-group">
                                    <label className="custom-label">Company</label>
                                    <input className="custom-input" value={form.company} onChange={handleInputChange('company')} />
                                </div>
                                <div className="custom-form-group">
                                    <label className="custom-label">Purpose</label>
                                    <textarea className="custom-textarea" value={form.purpose} onChange={handleInputChange('purpose')} />
                                </div>
                                <div className="custom-form-group">
                                    <label className="custom-label">Product</label>
                                    <select className="custom-select" value={form.product} onChange={handleInputChange('product')}>
                                        <option value="">-- Select --</option>
                                        <option value="All Product">All Product</option>
                                        <option value="Scanify">Scanify</option>
                                        <option value="Process builder">Process builder</option>
                                        <option value="RPA">RPA</option>
                                        <option value="Intelli-docs">Intelli-docs</option>
                                    </select>
                                </div>
                            </>
                        )}

                        {stage === 2 && (
                            <>
                                <h3 className="custom-calendar-heading">Select Date & Time (IST)</h3>
                                <Calendar
                                    className="custom-calendar-container"
                                    value={form.date}
                                    onChange={handleDateChange}
                                    tileDisabled={tileDisabled}
                                />
                                {form.date && (
                                    <div className="custom-form-group">
                                        <label className="custom-label">Select Time</label>
                                        <select className="custom-select" value={form.time} onChange={handleInputChange('time')}>
                                            <option value="">-- Select Time --</option>
                                            {availableTimes.map((time, idx) => (
                                                <option key={idx} value={time}>{time}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </>
                        )}

                        {stage === 3 && (
                            <div className="custom-confirmation"> {/* Use a container for better styling */}
                                <h3 className="custom-confirmation-heading">Confirm Your Booking</h3>
                                <p className="custom-confirmation-text"><strong>Name:</strong> {form.name}</p>
                                <p className="custom-confirmation-text"><strong>Email:</strong> {form.email}</p>
                                <p className="custom-confirmation-text"><strong>Company:</strong> {form.company}</p>
                                <p className="custom-confirmation-text"><strong>Purpose:</strong> {form.purpose}</p>
                                <p className="custom-confirmation-text"><strong>Product:</strong> {form.product}</p>
                                <p className="custom-confirmation-text"><strong>Date:</strong> {form.date ? moment(form.date).format('YYYY-MM-DD') : 'N/A'}</p>
                                <p className="custom-confirmation-text"><strong>Time:</strong> {form.time} IST</p>
                            </div>
                        )}

                        {error && <p className="custom-error">{error}</p>}

                        <div className="custom-button-group">
                            {stage > 1 && <button className="custom-previous-button" onClick={handlePrevious}>Previous</button>}
                            {stage < 3 && <button className="custom-next-button" onClick={handleNext}>Next</button>}
                            {stage === 3 && (
                                <button
                                    className="custom-book-button"
                                    onClick={handleBookDemo}
                                    disabled={isBooking} 
                                >
                                    {isBooking ? 'Booking...' : 'Book Demo'} {/* Change text while booking */}
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default DemoBookingPopup;