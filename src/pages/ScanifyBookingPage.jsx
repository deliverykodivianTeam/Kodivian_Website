import React, { useState, useRef, useEffect } from "react";
import "../styles/ScanifyBooking.css";
import scanifyKodivianLogo from "../assets/scanifykodivianlogo.png";


const API_URL = import.meta.env.VITE_API_URL || "https://scanify-booking.onrender.com";

const DOCUMENT_OPTIONS = ["Invoice", "Purchase Order", "GRN", "Receipt", "Vendor Invoice", "Delivery Challan"];
const ERP_OPTIONS = ["SAP", "Oracle", "Tally", "Microsoft Dynamics", "Zoho", "Other"];
const PROCESS_OPTIONS = ["Manual Entry", "Excel Upload", "OCR + Validation", "ERP Direct Entry"];
const APPROVAL_OPTIONS = ["No Approval", "Single Level", "Two Level", "Multi Level"];
const VOLUME_OPTIONS = ["0–500", "500–2000", "2000–5000", "5000+"];
const TIME_SLOTS = [
  "09:00 AM – 10:00 AM", "10:00 AM – 11:00 AM", "11:00 AM – 12:00 PM",
  "02:00 PM – 03:00 PM", "03:00 PM – 04:00 PM", "04:00 PM – 05:00 PM",
];

const EMPTY_FORM = {
  full_name: "", designation: "", company_name: "", corporate_email: "",
  mobile_number: "", documents_required: [], erp_system: "",
  current_process: "", approval_workflow: "", document_volume: "",
  preferred_demo_date: "", preferred_time_slot: "",
};

/* ── tiny Field wrapper ── */
function Field({ label, required, optional, children }) {
  return (
    <div className="scanifyAiDemo-field">
      <label className="scanifyAiDemo-field-label">
        {label}
        {required && <span className="scanifyAiDemo-req"> *</span>}
        {optional && <span className="scanifyAiDemo-opt"> (optional)</span>}
      </label>
      {children}
    </div>
  );
}

export default function ScanifyBookingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const formRef = useRef(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });

  useEffect(() => {
    const el = formRef.current?.querySelector("input,select");
    el?.focus();
  }, [step]);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const toggle = doc => setForm(p => ({
    ...p,
    documents_required: p.documents_required.includes(doc)
      ? p.documents_required.filter(d => d !== doc)
      : [...p.documents_required, doc],
  }));

  const next = () => {
    if (step === 1 && (!form.full_name.trim() || !form.company_name.trim() || !form.mobile_number.trim())) {
      alert("Please fill in Name, Company Name and Mobile Number.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.mobile_number)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.corporate_email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setStep(s => Math.min(3, s + 1));
  };
  const prev = () => setStep(s => Math.max(1, s - 1));

  const submit = async (overrides = {}) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/book-demo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ...overrides }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Submission failed");
      setBookingRef(data.booking_reference || "");
      setSubmitted(true);
    } catch (e) { alert(e.message || "Submission error"); }
    finally { setLoading(false); }
  };

  const reset = () => { setForm({ ...EMPTY_FORM }); setSubmitted(false); setBookingRef(""); setStep(1); };

  /* ────────── SUCCESS ────────── */
  if (submitted) return (
    <div className="scanifyAiDemo-page">
      <div className="scanifyAiDemo-success-center">
        <div className="scanifyAiDemo-success-card">
          <div className="scanifyAiDemo-success-check">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M5 14l6 6L23 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="scanifyAiDemo-success-h">Demo Request Confirmed</h2>
          <p className="scanifyAiDemo-success-p">Our team will contact you within 24 hours to confirm your slot.</p>
          <div className="scanifyAiDemo-success-meta">
            <div className="scanifyAiDemo-smeta-row"><span className="scanifyAiDemo-smeta-k">Booking ref</span><span className="scanifyAiDemo-smeta-v scanifyAiDemo-mono">{bookingRef || "—"}</span></div>
            <hr className="scanifyAiDemo-smeta-hr" />
            <div className="scanifyAiDemo-smeta-row"><span className="scanifyAiDemo-smeta-k">Date</span><span className="scanifyAiDemo-smeta-v">{form.preferred_demo_date || "Not specified"}</span></div>
            <hr className="scanifyAiDemo-smeta-hr" />
            <div className="scanifyAiDemo-smeta-row"><span className="scanifyAiDemo-smeta-k">Time</span><span className="scanifyAiDemo-smeta-v">{form.preferred_time_slot || "Not specified"}</span></div>
          </div>
          <div className="scanifyAiDemo-success-actions">
            <button className="scanifyAiDemo-btn-ghost" onClick={reset}>Book another demo</button>
            <button className="scanifyAiDemo-btn-primary" onClick={() => window.location.replace("/")}>Done</button>
          </div>
        </div>
      </div>
    </div>
  );

  const pct = ((step - 1) / 2) * 100;

  /* ────────── MAIN ────────── */
  return (
    <div className="scanifyAiDemo-page">
      <div className="scanifyAiDemo-shell">

        {/* ══════════ SIDEBAR ══════════ */}
        <aside className="scanifyAiDemo-sidebar">

          {/* brand */}
          <div className="scanifyAiDemo-sb-brand">
            <div>
              <p className="scanifyAiDemo-sb-name">Scanify AI</p>
              <p className="scanifyAiDemo-sb-tagline">Enterprise Document Automation</p>
            </div>

          </div>

          {/* scanning animation panel */}


          <div className="scanifyAiDemo-scan-panel">
            <div className="scanifyAiDemo-scan-doc">
              <div className="scanifyAiDemo-scan-line" />
              <div className="scanifyAiDemo-scan-row"><div className="scanifyAiDemo-scan-field scanifyAiDemo-wide" /></div>
              <div className="scanifyAiDemo-scan-row">
                <div className="scanifyAiDemo-scan-field scanifyAiDemo-med" />
                <div className="scanifyAiDemo-scan-field scanifyAiDemo-med" />
              </div>
              <div className="scanifyAiDemo-scan-row"><div className="scanifyAiDemo-scan-field scanifyAiDemo-wide" /></div>
              <div className="scanifyAiDemo-scan-row">
                <div className="scanifyAiDemo-scan-field scanifyAiDemo-short" />
                <div className="scanifyAiDemo-scan-field scanifyAiDemo-med" />
              </div>
              <div className="scanifyAiDemo-scan-row"><div className="scanifyAiDemo-scan-field scanifyAiDemo-wide" /></div>
              <div className="scanifyAiDemo-scan-row"><div className="scanifyAiDemo-scan-field scanifyAiDemo-med" /></div>
              <div className="scanifyAiDemo-scan-corner scanifyAiDemo-tl" /><div className="scanifyAiDemo-scan-corner scanifyAiDemo-tr" />
              <div className="scanifyAiDemo-scan-corner scanifyAiDemo-bl" /><div className="scanifyAiDemo-scan-corner scanifyAiDemo-br" />
            </div>
            <div className="scanifyAiDemo-scan-badge">
              <span className="scanifyAiDemo-scan-dot" /><span>Extracting data…</span>
            </div>
          </div>

          {/* stats */}
          <div className="scanifyAiDemo-sb-stats">
            {[["99%", "OCR Accuracy"], ["90%", "Faster Processing"], ["3×", "ROI Delivered"]].map(([v, l]) => (
              <div className="scanifyAiDemo-sb-stat" key={l}><span className="scanifyAiDemo-sb-sv">{v}</span><span className="scanifyAiDemo-sb-sl">{l}</span></div>
            ))}
          </div>

          {/* integrations */}
          <div className="scanifyAiDemo-sb-ints">
            <p className="scanifyAiDemo-sb-int-label">Integrates with</p>
            <div className="scanifyAiDemo-sb-int-pills">
              {["SAP", "Oracle", "Tally", "Dynamics", "Zoho"].map(i => (
                <span className="scanifyAiDemo-sb-pill" key={i}>{i}</span>
              ))}
            </div>
          </div>

          {/* contact card */}
          <div className="scanifyAiDemo-sb-contact">
            <div className="scanifyAiDemo-sb-avatar">VM</div>
            <div className="scanifyAiDemo-sb-contact-info">
              <p className="scanifyAiDemo-sb-contact-name">Vijaysabari Mugunthan</p>
              <p className="scanifyAiDemo-sb-contact-role">Managing Director, Kodivian Technologies</p>
              <a className="scanifyAiDemo-sb-contact-email" href="mailto:vijaysabari.m@kodivian.com">
                vijaysabari.m@kodivian.com
              </a>
            </div>
          </div>

        </aside>

        {/* ══════════ FORM PANEL ══════════ */}
        <main className="scanifyAiDemo-form-panel" ref={formRef}>

          {/* top: title + stepper */}
          <div className="scanifyAiDemo-fp-header">
            <div className="scanifyAiDemo-demo-header">
              <div className="scanifyAiDemo-demo-title-section">
                <h1 className="scanifyAiDemo-fp-title">Book a Personalised Demo</h1>
                <p className="scanifyAiDemo-fp-sub">3 quick steps — we'll set up a session tailored to your workflow.</p>
              </div>

              <img
                src={scanifyKodivianLogo}
                alt="Kodivian Scanify"
                className="scanifyAiDemo-demo-top-right-logo"
              />
            </div>

            {/* stepper */}
            <div className="scanifyAiDemo-stepper">
              {["Contact", "Requirements", "Schedule"].map((lbl, i) => {
                const n = i + 1;
                const done = step > n;
                const active = step === n;
                return (
                  <React.Fragment key={n}>
                    <div className={`scanifyAiDemo-st-item${active ? " scanifyAiDemo-active" : ""}${done ? " scanifyAiDemo-done" : ""}`}>
                      <div className="scanifyAiDemo-st-bubble">
                        {done
                          ? <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          : n}
                      </div>
                      <span className="scanifyAiDemo-st-lbl">{lbl}</span>
                    </div>
                    {i < 2 && <div className={`scanifyAiDemo-st-line${done ? " scanifyAiDemo-done" : ""}`} />}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="scanifyAiDemo-progress-track"><div className="scanifyAiDemo-progress-fill" style={{ width: `${pct}%` }} /></div>
          </div>

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div className="scanifyAiDemo-step-body">
              <div className="scanifyAiDemo-step-intro">
                <h2 className="scanifyAiDemo-step-h">Contact Details</h2>
                <p className="scanifyAiDemo-step-p">Tell us who you are — we'll personalise the demo around you.</p>
              </div>



              {/* ROW: full name | mobile */}
              <div className="scanifyAiDemo-form-row scanifyAiDemo-col-2">
                <Field label="Full Name" required>
                  <input className="scanifyAiDemo-input" value={form.full_name}
                    onChange={e => set("full_name", e.target.value)} placeholder="e.g. Kaviya Arivaratharaj" />
                </Field>
                <Field label="Mobile Number" required>
                  <input
                    className="scanifyAiDemo-input"
                    value={form.mobile_number}
                    onChange={e => set("mobile_number", e.target.value)}
                    placeholder="+91 98765 43210"
                    maxLength={10}
                  />
                </Field>
              </div>

              {/* ROW: company | designation */}
              <div className="scanifyAiDemo-form-row scanifyAiDemo-col-2">
                <Field label="Company Name" required>
                  <input className="scanifyAiDemo-input" value={form.company_name}
                    onChange={e => set("company_name", e.target.value)} placeholder="e.g. Kodivian Technologies" />
                </Field>
                <Field label="Designation" optional>
                  <input className="scanifyAiDemo-input" value={form.designation}
                    onChange={e => set("designation", e.target.value)} placeholder="e.g. Head of Finance" />
                </Field>
              </div>

              {/* ROW: email full-width */}
              <div className="scanifyAiDemo-form-row scanifyAiDemo-col-1">
                <Field label="Corporate Email" required>
                  <input className="scanifyAiDemo-input" type="email" value={form.corporate_email}
                    onChange={e => set("corporate_email", e.target.value)} placeholder="name@Kodivian.com" />
                </Field>
              </div>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <div className="scanifyAiDemo-step-body">
              <div className="scanifyAiDemo-step-intro">
                <h2 className="scanifyAiDemo-step-h">Your Requirements</h2>
                <p className="scanifyAiDemo-step-p">Help us understand your document automation needs.</p>
              </div>

              {/* ROW: documents full-width */}
              <div className="scanifyAiDemo-form-row scanifyAiDemo-col-1">
                <Field label="Documents to Automate">
                  <div className="scanifyAiDemo-chip-grid">
                    {DOCUMENT_OPTIONS.map(d => (
                      <button key={d} type="button"
                        className={`scanifyAiDemo-chip${form.documents_required.includes(d) ? " scanifyAiDemo-chip-on" : ""}`}
                        onClick={() => toggle(d)}>{d}</button>
                    ))}
                  </div>
                </Field>
              </div>

              {/* ROW: erp | process */}
              <div className="scanifyAiDemo-form-row scanifyAiDemo-col-2">
                <Field label="ERP System">
                  <div className="scanifyAiDemo-select-wrap">
                    <select className="scanifyAiDemo-select" value={form.erp_system} onChange={e => set("erp_system", e.target.value)}>
                      <option value="">Select ERP</option>
                      {ERP_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <span className="scanifyAiDemo-sel-chevron" aria-hidden>▾</span>
                  </div>
                </Field>
                <Field label="Current Process">
                  <div className="scanifyAiDemo-select-wrap">
                    <select className="scanifyAiDemo-select" value={form.current_process} onChange={e => set("current_process", e.target.value)}>
                      <option value="">Select process</option>
                      {PROCESS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <span className="scanifyAiDemo-sel-chevron" aria-hidden>▾</span>
                  </div>
                </Field>
              </div>

              {/* ROW: approval | volume */}
              <div className="scanifyAiDemo-form-row scanifyAiDemo-col-2">
                <Field label="Approval Workflow">
                  <div className="scanifyAiDemo-select-wrap">
                    <select className="scanifyAiDemo-select" value={form.approval_workflow} onChange={e => set("approval_workflow", e.target.value)}>
                      <option value="">Select workflow</option>
                      {APPROVAL_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <span className="scanifyAiDemo-sel-chevron" aria-hidden>▾</span>
                  </div>
                </Field>
                <Field label="Monthly Document Volume">
                  <div className="scanifyAiDemo-select-wrap">
                    <select className="scanifyAiDemo-select" value={form.document_volume} onChange={e => set("document_volume", e.target.value)}>
                      <option value="">Select range</option>
                      {VOLUME_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <span className="scanifyAiDemo-sel-chevron" aria-hidden>▾</span>
                  </div>
                </Field>
              </div>
            </div>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <div className="scanifyAiDemo-step-body">
              <div className="scanifyAiDemo-step-intro">
                <h2 className="scanifyAiDemo-step-h">Schedule Your Demo</h2>
                <p className="scanifyAiDemo-step-p">Pick a preferred slot or skip — we'll confirm timing directly.</p>
              </div>

              {/* ROW: date | time */}
              <div className="scanifyAiDemo-form-row scanifyAiDemo-col-2">
                <Field label="Preferred Date">
                  <input className="scanifyAiDemo-input" type="date" value={form.preferred_demo_date}
                    onChange={e => set("preferred_demo_date", e.target.value)}
                    min={new Date().toISOString().split("T")[0]} />
                </Field>
                <Field label="Preferred Time Slot">
                  <div className="scanifyAiDemo-select-wrap">
                    <select className="scanifyAiDemo-select" value={form.preferred_time_slot} onChange={e => set("preferred_time_slot", e.target.value)}>
                      <option value="">Select time</option>
                      {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <span className="scanifyAiDemo-sel-chevron" aria-hidden>▾</span>
                  </div>
                </Field>
              </div>

              {/* Summary */}
              <div className="scanifyAiDemo-summary-card">
                <p className="scanifyAiDemo-sum-title">Booking Summary</p>
                <div className="scanifyAiDemo-sum-grid">
                  {[
                    ["Full Name", form.full_name || "—"],
                    ["Company", form.company_name || "—"],
                    ["Mobile", form.mobile_number || "—"],
                    form.erp_system && ["ERP System", form.erp_system],
                    form.documents_required.length > 0 && ["Documents", form.documents_required.join(", ")],
                  ].filter(Boolean).map(([k, v]) => (
                    <React.Fragment key={k}>
                      <span className="scanifyAiDemo-sum-key">{k}</span>
                      <span className="scanifyAiDemo-sum-val">{v}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Footer Actions ── */}
          <div className="scanifyAiDemo-form-footer">
            <div className="scanifyAiDemo-footer-l">
              {step > 1 && (
                <button className="scanifyAiDemo-btn-ghost" onClick={prev}>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M10 3L5 7.5L10 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Back
                </button>
              )}
            </div>
            <div className="scanifyAiDemo-footer-r">
              {step < 3
                ? <button className="scanifyAiDemo-btn-primary" onClick={next}>
                  Continue
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M5 3l5 4.5L5 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                : <div className="scanifyAiDemo-submit-row">
                  <button className="scanifyAiDemo-btn-ghost" onClick={() => submit({ preferred_demo_date: "", preferred_time_slot: "" })} disabled={loading}>
                    {loading ? "Processing…" : "Skip & Submit"}
                  </button>
                  <button className="scanifyAiDemo-btn-primary" onClick={() => submit()} disabled={loading}>
                    {loading ? <span className="scanifyAiDemo-spinner" /> : <>Confirm Booking <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M5 3l5 4.5L5 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></>}
                  </button>
                </div>
              }
            </div>
          </div>

          <p className="scanifyAiDemo-copyright">© 2026 Kodivian Technologies · All rights reserved</p>
        </main>

      </div>
    </div>
  );
}