import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment-timezone";

const DemoBookingPopup = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    purpose: "",
    product: "",
    date: null,
    time: "",
  });

  const [stage, setStage] = useState(1);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const istTimeZone = "Asia/Kolkata";

  useEffect(() => {
    if (form.date) {
      const times = [];
      const start = moment
        .tz(form.date, istTimeZone)
        .startOf("day")
        .add(9, "hours")
        .add(30, "minutes");
      const end = moment.tz(form.date, istTimeZone).startOf("day").add(18, "hours");
      let current = start.clone();
      while (current.isBefore(end)) {
        times.push(current.format("HH:mm"));
        current.add(30, "minutes");
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
    setError("");
    if (stage === 1) {
      const { name, email, company, purpose, product } = form;
      if (!name || !email || !company || !purpose || !product) {
        setError("Please fill in all fields.");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Please enter a valid email.");
        return;
      }
      setStage(2);
    } else if (stage === 2) {
      if (!form.date || !form.time) {
        setError("Please select both date and time.");
        return;
      }
      setStage(3);
    }
  };

  const handleBookDemo = async () => {
    setError("");
    setSuccessMessage("");
    setIsBooking(true);

    try {
      const payload = {
        ...form,
        date: form.date
          ? moment(form.date).tz(istTimeZone).format("YYYY-MM-DD")
          : null,
        timezone: istTimeZone,
      };

      const res = await fetch("http://127.0.0.1:10000/save_demo_data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setSuccessMessage("Demo request sent successfully! We will be in touch shortly.");
        setTimeout(() => handleClose(), 2000);
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Failed to book demo. Please try again.");
        setIsBooking(false);
      }
    } catch (err) {
      setError("Something went wrong. Please check your connection.");
      setIsBooking(false);
    }
  };

  const handleClose = () => {
    setForm({
      name: "",
      email: "",
      company: "",
      purpose: "",
      product: "",
      date: null,
      time: "",
    });
    setStage(1);
    setError("");
    setSuccessMessage("");
    setIsBooking(false);
    onClose();
  };

  const handleDateChange = (date) => {
    const day = date.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (day !== 0 && day !== 6 && date.getTime() >= today.getTime()) {
      setForm({ ...form, date, time: "" });
    } else {
      setError("Please select a weekday today or in the future.");
      setForm({ ...form, date: null, time: "" });
    }
  };

  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return (
        date.getDay() === 0 ||
        date.getDay() === 6 ||
        date.getTime() < today.getTime()
      );
    }
    return false;
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1050,
      }}
      onClick={handleClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          {successMessage ? (
            <div className="modal-body text-center p-4">
              <div className="alert alert-success">
                <h4 className="alert-heading">Success!</h4>
                <p>{successMessage}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="modal-header">
                <h5 className="modal-title">Book a Demo</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                {stage === 1 && (
                  <>
                    <div className="mb-3">
                      <label>Name</label>
                      <input type="text" className="form-control" value={form.name} onChange={handleInputChange("name")} />
                    </div>
                    <div className="mb-3">
                      <label>Email</label>
                      <input type="email" className="form-control" value={form.email} onChange={handleInputChange("email")} />
                    </div>
                    <div className="mb-3">
                      <label>Company</label>
                      <input type="text" className="form-control" value={form.company} onChange={handleInputChange("company")} />
                    </div>
                    <div className="mb-3">
                      <label>Purpose</label>
                      <textarea className="form-control" value={form.purpose} onChange={handleInputChange("purpose")} />
                    </div>
                    <div className="mb-3">
                      <label>Product</label>
                      <select className="form-select" value={form.product} onChange={handleInputChange("product")}>
                        <option value="">-- Select --</option>
                        <option value="All Product">All Product</option>
                        <option value="Scanify">Scanify</option>
                        <option value="Process Builder">Process Builder</option>
                      </select>
                    </div>
                  </>
                )}

                {stage === 2 && (
                  <>
                    <h6 className="text-center mb-3">Select Date & Time (IST)</h6>
                    <Calendar value={form.date} onChange={handleDateChange} tileDisabled={tileDisabled} />
                    {form.date && (
                      <div className="mt-3">
                        <label>Select Time</label>
                        <select className="form-select" value={form.time} onChange={handleInputChange("time")}>
                          <option value="">-- Select Time --</option>
                          {availableTimes.map((t, i) => (
                            <option key={i} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </>
                )}

                {stage === 3 && (
                  <div className="bg-light p-3 rounded">
                    <h5 className="text-center mb-3">Confirm Booking</h5>
                    <p><strong>Name:</strong> {form.name}</p>
                    <p><strong>Email:</strong> {form.email}</p>
                    <p><strong>Company:</strong> {form.company}</p>
                    <p><strong>Purpose:</strong> {form.purpose}</p>
                    <p><strong>Product:</strong> {form.product}</p>
                    <p><strong>Date:</strong> {moment(form.date).format("YYYY-MM-DD")}</p>
                    <p><strong>Time:</strong> {form.time} IST</p>
                  </div>
                )}

                {error && <div className="alert alert-danger mt-3">{error}</div>}
              </div>

              <div className="modal-footer">
                {stage > 1 && (
                  <button className="btn btn-secondary" onClick={() => setStage(stage - 1)}>
                    Previous
                  </button>
                )}
                {stage < 3 && (
                  <button className="btn btn-primary" onClick={handleNext}>
                    Next
                  </button>
                )}
                {stage === 3 && (
                  <button className="btn btn-success" onClick={handleBookDemo} disabled={isBooking}>
                    {isBooking ? "Booking..." : "Book Demo"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoBookingPopup;
