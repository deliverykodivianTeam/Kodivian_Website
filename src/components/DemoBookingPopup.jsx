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
        try {
            const payload = {
                ...form,
                date: moment(form.date).tz(istTimeZone).format('YYYY-MM-DD'),
                timezone: istTimeZone,
            };

            const res = await fetch('http://localhost:3001/save_demo_data', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
              });
              

            if (res.ok) {
                const data = await res.json();
                console.log(data.message); // ✅ logs backend message
                setSuccessMessage('Demo booked successfully!');
                setTimeout(() => handleClose(), 2000);
            } else {
                setError('Failed to save demo data.');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Something went wrong. Try again.');
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
        onClose();
    };

    const handleDateChange = (date) => {
        const day = date.getDay();
        if (day !== 0 && day !== 6) {
            setForm({ ...form, date });
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="popup-overlay-blur" onClick={handleClose}></div>
            <div className="custom-popup">
                <h2 className="custom-heading">Book a Demo</h2>

                {stage === 1 && (
                    <>
                        <div className="custom-form-group">
                            <label className="custom-label">Name</label>
                            <input className="custom-input" value={form.name} onChange={handleInputChange('name')} />
                        </div>
                        <div className="custom-form-group">
                            <label className="custom-label">Email</label>
                            <input  className="custom-input" type="email" value={form.email} onChange={handleInputChange('email')} />
                        </div>
                        <div className="custom-form-group">
                            <label className="custom-label">Company</label>
                            <input className="custom-input" value={form.company} onChange={handleInputChange('company')} />
                        </div>
                        <div className="custom-form-group">
                            <label className="custom-label">Purpose</label>
                            <textarea  className="custom-textarea" value={form.purpose} onChange={handleInputChange('purpose')} />
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
                        <h3>Select Date & Time (IST)</h3>
                        <Calendar
                            className="custom-calendar-container "
                            value={form.date}
                            onChange={handleDateChange}
                            minDate={new Date()}
                            tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6}
                        />
                        {form.date && (
                            <div className="custom-form-group">
                                <label className="custom-label">Select Time</label>
                                <select className="custom-select" value={form.time} onChange={handleInputChange('time')}>
                                    <option className="custom-calendar-container" value="">-- Select Time --</option>
                                    {availableTimes.map((time, idx) => (
                                        <option key={idx} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </>
                )}

                {stage === 3 && (
                    <>
                        <h3>Confirm Your Booking</h3>
                        <p className="custom-confirmation-text"><strong>Name:</strong> {form.name}</p>
                        <p className="custom-confirmation-text"><strong>Email:</strong> {form.email}</p>
                        <p className="custom-confirmation-text"><strong>Company:</strong> {form.company}</p>
                        <p className="custom-confirmation-text"><strong>Purpose:</strong> {form.purpose}</p>
                        <p className="custom-confirmation-text"><strong>Product:</strong> {form.product}</p>
                        <p className="custom-confirmation-text"><strong>Date:</strong> {moment(form.date).format('YYYY-MM-DD')}</p>
                        <p className="custom-confirmation-text"><strong>Time:</strong> {form.time} IST</p>
                    </>
                )}

                {error && <p className="custom-error">{error}</p>}
                {successMessage && <p className="custom-success">{successMessage}</p>}

                <div className="custom-button-group">
                    {stage > 1 && <button className="custom-previous-button" onClick={handlePrevious}>Previous</button>}
                    {stage < 3 && <button className="custom-next-button" onClick={handleNext}>Next</button>}
                    {stage === 3 && <button className="custom-book-button" onClick={handleBookDemo}>Book Demo</button>}
                </div>
            </div>
        </>
    );
};

export default DemoBookingPopup;
