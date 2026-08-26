import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/shortdemo.css";
import { CheckCircle2, Database, FileText, ScanLine } from "lucide-react";
import ThankYouDemo from "../components/ThankYouDemo";

const EXTRACTED_FIELDS = [
  { label: "Vendor", value: "Acme Textiles Pvt Ltd" },
  { label: "Invoice no.", value: "INV-2291" },
  { label: "Amount", value: "\u20B948,200.00" },
  { label: "Due date", value: "12 Sep 2026" },
];

const DURATIONS = { scan: 1700, extract: 1900, push: 1700, done: 1200 };

const STATUS_COPY = {
  scan: "Scanning document…",
  extract: "Extracting fields…",
  push: "Pushing to ERP…",
  done: "Synced to ERP",
};

const API_URL = import.meta.env.VITE_API_URL || "https://kodivian-website-8.onrender.com";

const ShortDemoPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    company: "",
    email: "",
    designation: "",
    comment: "",
  });

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [animationStage, setAnimationStage] = useState('scanning'); // scanning -> extracting -> filled

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      await axios.post(`${API_URL}/api/short-demo`, formData);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  // Animation State
  const [phase, setPhase] = useState("scan");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timers = [];
    setPhase("scan");
    timers.push(setTimeout(() => setPhase("extract"), DURATIONS.scan));
    timers.push(
      setTimeout(() => setPhase("push"), DURATIONS.scan + DURATIONS.extract)
    );
    timers.push(
      setTimeout(
        () => setPhase("done"),
        DURATIONS.scan + DURATIONS.extract + DURATIONS.push
      )
    );
    timers.push(
      setTimeout(
        () => setCycle((c) => c + 1),
        DURATIONS.scan + DURATIONS.extract + DURATIONS.push + DURATIONS.done
      )
    );
    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  const showFields = phase === "extract" || phase === "push" || phase === "done";
  const showPacket = phase === "push";
  const showCheck = phase === "done";

  return (
    <div className="sd-page-container">
      {status === "success" ? (
        <ThankYouDemo
          formData={formData}
          onReset={() => {
            setStatus("idle");
            setFormData({ fullName: "", phone: "", company: "", email: "", designation: "", comment: "" });
          }}
        />
      ) : (
        <div className="sd-content-wrapper" style={{ overflowY: 'auto' }}>
          {/* LEFT COLUMN: LIVE ANIMATED DEMO (Vibrant Violet Theme) */}
          <div className="sd-left-panel scanifyAiDemo-bg-dots" style={{ flex: '0 0 450px', background: 'linear-gradient(175deg, #0B67D8 0%, #082154 55%, #051336 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px', position: 'relative', boxShadow: '10px 0 40px rgba(0,0,0,0.15)', zIndex: 10 }}>
            <div className="mx-auto w-full max-w-md" style={{ width: '100%' }}>
              <div className="flex items-center justify-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span className="scanifyAiDemo-mono" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.22em', color: '#ffffff', fontFamily: 'monospace', fontWeight: '600' }}>
                  Live preview
                </span>
                <span className="scanifyAiDemo-mono" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#ffffff', fontFamily: 'monospace', fontWeight: '500' }}>
                  <span
                    style={{
                      height: '6px',
                      width: '6px',
                      borderRadius: '50%',
                      backgroundColor: phase === "done" ? "#22c55e" : "#0B67D8",
                      boxShadow: phase === "done" ? "0 0 8px #22c55e" : "0 0 8px #0B67D8"
                    }}
                  />
                  {STATUS_COPY[phase]}
                </span>
              </div>

              {/* --- Document card with scan line --- */}
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.15)', background: 'rgba(0, 0, 0, 0.2)', backdropFilter: 'blur(10px)', padding: '16px', marginBottom: '16px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <FileText style={{ height: '18px', width: '18px', color: '#20D2E2' }} />
                  <span className="scanifyAiDemo-mono" style={{ fontSize: '14px', color: '#ffffff', fontFamily: 'monospace', fontWeight: '600' }}>
                    vendor_invoice_2291.pdf
                  </span>
                  <ScanLine style={{ marginLeft: 'auto', height: '18px', width: '18px', color: '#20D2E2' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ height: '8px', width: '75%', borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
                  <div style={{ height: '8px', width: '50%', borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
                  <div style={{ height: '8px', width: '83%', borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
                  <div style={{ height: '8px', width: '66%', borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
                </div>

                {phase === "scan" && <div key={`scan-${cycle}`} className="scanifyAiDemo-custom-scanline" />}

                {phase === "extract" && (
                  <div
                    key={`fly-${cycle}`}
                    style={{ pointerEvents: 'none', position: 'absolute', inset: 0 }}
                  >
                    {EXTRACTED_FIELDS.map((f, i) => (
                      <span
                        key={f.label}
                        className="scanifyAiDemo-fly-word scanifyAiDemo-mono"
                        style={{
                          borderRadius: '4px',
                          backgroundColor: 'rgba(16, 157, 230, 0.9)',
                          padding: '4px 10px',
                          fontSize: '13px',
                          fontWeight: '600',
                          color: '#ffffff',
                          border: '1px solid rgba(32, 210, 226, 0.5)',
                          boxShadow: '0 4px 12px rgba(16, 157, 230, 0.5)',
                          left: `${18 + i * 16}%`,
                          top: "48%",
                          "--dx": `${(i - 1.5) * 10}px`,
                          animationDelay: `${i * 140}ms`,
                        }}
                      >
                        {f.value}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* connector */}
              <div style={{ margin: '0 auto', height: '16px', width: '2px', backgroundColor: 'rgba(32, 210, 226, 0.2)' }} />

              {/* --- Extracted fields card --- */}
              <div
                key={`fields-${cycle}`}
                style={{ borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.15)', background: 'rgba(0, 0, 0, 0.2)', backdropFilter: 'blur(10px)', padding: '16px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}
              >
                <span className="scanifyAiDemo-mono" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#ffffff', display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Extracted fields
                </span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {EXTRACTED_FIELDS.map((f, i) => (
                    <div
                      key={f.label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 0',
                        fontSize: '14px',
                        borderBottom: i < EXTRACTED_FIELDS.length - 1 ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
                        animationDelay: showFields ? `${300 + i * 140}ms` : '0ms',
                        opacity: showFields ? 1 : 0
                      }}
                      className={showFields ? "scanifyAiDemo-field-in" : ""}
                    >
                      <span style={{ color: '#20D2E2', fontWeight: '500' }}>{f.label}</span>
                      <span
                        className="scanifyAiDemo-mono"
                        style={{ color: '#ffffff', fontWeight: '600' }}
                      >
                        {showFields ? f.value : "—"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* connector */}
              <div style={{ margin: '0 auto', height: '16px', width: '2px', backgroundColor: 'rgba(32, 210, 226, 0.2)' }} />

              {/* --- Conveyor to ERP --- */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.15)', background: 'rgba(0, 0, 0, 0.2)', backdropFilter: 'blur(10px)', padding: '16px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}>
                <div style={{ position: 'relative', height: '8px', flex: 1, overflow: 'hidden', borderRadius: '999px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <div className="scanifyAiDemo-dash-track" style={{ position: 'absolute', inset: 0, opacity: 0.7 }} />
                  {showPacket && (
                    <div
                      key={`pk-${cycle}`}
                      className="scanifyAiDemo-packet"
                      style={{ position: 'absolute', top: '50%', height: '12px', width: '12px', transform: 'translateY(-50%)', borderRadius: '4px', backgroundColor: '#20D2E2', boxShadow: '0 0 12px 2px rgba(32, 210, 226,0.6)' }}
                    />
                  )}
                </div>
                <div
                  className={phase === "push" || phase === "done" ? "scanifyAiDemo-ring-pulse" : ""}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    height: '44px',
                    width: '44px',
                    flexShrink: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {showCheck ? (
                    <CheckCircle2
                      key={`ck-${cycle}`}
                      className="scanifyAiDemo-pop-in"
                      style={{ height: '22px', width: '22px', color: '#22c55e' }}
                    />
                  ) : (
                    <Database style={{ height: '24px', width: '24px', color: '#ffffff' }} />
                  )}
                </div>
              </div>
              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', padding: '0 4px' }}>
                <span className="scanifyAiDemo-mono" style={{ fontSize: '13px', color: '#20D2E2', fontWeight: '500' }}>
                  extracted-record.json
                </span>
                <span className="scanifyAiDemo-mono" style={{ fontSize: '13px', color: '#20D2E2', fontWeight: '500' }}>ERP</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: THE FORM (White Theme) */}
          <div className="sd-right-panel" style={{ flex: '1', display: 'flex', flexDirection: 'column', padding: '30px 40px', background: '#ffffff' }}>
            <div className="sd-form-header" style={{ color: '#0f172a', marginBottom: '15px' }}>
              <h2 style={{ color: '#0f172a', fontSize: '28px', fontFamily: 'Sora, sans-serif' }}>Experience Scanify AI</h2>
              <p style={{ color: '#475569', fontSize: '15px' }}>Book a short demo to see how we automate your document extraction.</p>
            </div>

            <form onSubmit={handleSubmit} className="sd-form">
              <div className="sd-input-group">
                <label style={{ color: '#334155', fontWeight: '500' }}>Full Name *</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="John Doe" style={{ background: '#f8fafc', color: '#0f172a', border: '1px solid #cbd5e1' }} />
              </div>
              <div className="sd-input-group">
                <label style={{ color: '#334155', fontWeight: '500' }}>Corporate Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@company.com" style={{ background: '#f8fafc', color: '#0f172a', border: '1px solid #cbd5e1' }} />
              </div>
              <div className="sd-row-group">
                <div className="sd-input-group">
                  <label style={{ color: '#334155', fontWeight: '500' }}>Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+1 234 567 890" style={{ background: '#f8fafc', color: '#0f172a', border: '1px solid #cbd5e1' }} />
                </div>
                <div className="sd-input-group">
                  <label style={{ color: '#334155', fontWeight: '500' }}>Company Name *</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} required placeholder="Acme Corp" style={{ background: '#f8fafc', color: '#0f172a', border: '1px solid #cbd5e1' }} />
                </div>
                <div className="sd-input-group">
                  <label style={{ color: '#334155', fontWeight: '500' }}>Designation *</label>
                  <input type="text" name="designation" value={formData.designation} onChange={handleChange} required placeholder="IT Director" style={{ background: '#f8fafc', color: '#0f172a', border: '1px solid #cbd5e1' }} />
                </div>
              </div>

              <div className="sd-input-group" style={{ marginTop: '5px' }}>
                <label style={{ color: '#334155', fontWeight: '500' }}>Comments (Optional)</label>
                <textarea name="comment" value={formData.comment} onChange={handleChange} placeholder="Any specific requirements..." rows="3" style={{ background: '#f8fafc', color: '#0f172a', border: '1px solid #cbd5e1', padding: '12px', borderRadius: '8px', width: '100%', resize: 'vertical', outline: 'none' }} />
              </div>

              {status === "error" && <div className="sd-error-text" style={{ color: '#ef4444' }}>{errorMessage}</div>}

              <button type="submit" className="sd-btn sd-btn-primary" disabled={status === "loading"} style={{ background: '#0B67D8', color: 'white', border: 'none', marginTop: '10px' }}>
                {status === "loading" ? "Syncing..." : "Submit & Book Demo"}
              </button>
            </form>
          </div>

        </div>
      )}
    </div>
  );
};

export default ShortDemoPage;
