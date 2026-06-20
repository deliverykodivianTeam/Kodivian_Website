import React, { useState, useRef, useEffect } from "react";
import "../styles/ScanifyBooking.css";
import scanifyKodivianLogo from "../assets/scanifykodivianlogo.png";


const API_URL = import.meta.env.VITE_API_URL || "https://kodivian-website-8.onrender.com";


const EMPTY_FORM = {
  full_name: "",
  designation: "",
  company_name: "",
  corporate_email: "",
  mobile_number: "",

  q1_current_process: "",
  q2_document_volume: "",
  q3_processing_time: "",
  q4_errors: "",

  q5_team_size: "",
  q5_effort_per_document: "",

  q6_erp_system: "",

  q7_document_formats: "",

  q8_pain_points: "",

  q9_business_impact: "",

  q10_automation_readiness: "",

  q11_validation_process: "",

  q12_erp_entry_method: "",

  q13_mapping_template: "",

  q14_approval_workflow: ""
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

  const [showQ1Other, setShowQ1Other] = useState(false);
const [showQ6Other, setShowQ6Other] = useState(false);
const [showQ7Other, setShowQ7Other] = useState(false);
const [showQ8Other, setShowQ8Other] = useState(false);
const [showQ9Other, setShowQ9Other] = useState(false);
const [showQ10Other, setShowQ10Other] = useState(false);
const [showQ12Other, setShowQ12Other] = useState(false);
const [showQ14Other, setShowQ14Other] = useState(false);

const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

const handleCheckboxChange = (field, value, checked) => {
  const current = form[field]
    ? form[field].split(", ")
    : [];

  let updated;

  if (checked) {
    updated = [...current, value];
  } else {
    updated = current.filter(item => item !== value);
  }

  set(field, updated.join(", "));
};

  useEffect(() => {
    const el = formRef.current?.querySelector("input,select");
    el?.focus();
  }, [step]);



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
    setStep(s => Math.min(2, s + 1));
  };
  const prev = () => setStep(s => Math.max(1, s - 1));

  const submit = async (overrides = {}) => {

const missingFields = [];

if (!form.q2_document_volume)
  missingFields.push("2. Monthly Document Volume");

if (!form.q3_processing_time)
  missingFields.push("3. Processing Time");

if (!form.q4_errors)
  missingFields.push("4. Errors / Mismatches");

if (!form.q5_team_size)
  missingFields.push("5. Team Size");

if (!form.q6_erp_system)
  missingFields.push("6. ERP System");

if (!form.q10_automation_readiness)
  missingFields.push("10. Automation Readiness");

if (!form.q11_validation_process)
  missingFields.push("11. Validation Process");

if (!form.q12_erp_entry_method)
  missingFields.push("12. ERP Entry Method");

if (!form.q13_mapping_template)
  missingFields.push("13. Mapping Template");

if (!form.q14_approval_workflow)
  missingFields.push("14. Approval Workflow");

if (missingFields.length > 0) {
  alert(
    "Please complete the following questions:\n\n" +
    missingFields.join("\n")
  );
  return;
}


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
          <h2 className="scanifyAiDemo-success-h">
  Requirement Submitted Successfully
</h2>
          <p className="scanifyAiDemo-success-p">Our team will review your requirements and contact you shortly for a personalized Scanify AI demonstration.</p>
        </div>
      </div>
    </div>
  );

  const pct = ((step - 1) / 1) * 100;

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
              {["Contact", "Requirements"].map((lbl, i) => {
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
                    {i < 1 && <div className={`scanifyAiDemo-st-line${done ? " scanifyAiDemo-done" : ""}`} />}
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
      <p className="scanifyAiDemo-step-p">
        Please provide your details before proceeding.
      </p>
    </div>

    <div className="scanifyAiDemo-form-row scanifyAiDemo-col-2">
      <Field label="Full Name" required>
        <input
          className="scanifyAiDemo-input"
          value={form.full_name}
          onChange={(e) => set("full_name", e.target.value)}
        />
      </Field>

      <Field label="Mobile Number" required>
        <input
          className="scanifyAiDemo-input"
          value={form.mobile_number}
          onChange={(e) => set("mobile_number", e.target.value)}
        />
      </Field>
    </div>

    <div className="scanifyAiDemo-form-row scanifyAiDemo-col-2">
      <Field label="Company Name" required>
        <input
          className="scanifyAiDemo-input"
          value={form.company_name}
          onChange={(e) => set("company_name", e.target.value)}
        />
      </Field>

      <Field label="Designation">
        <input
          className="scanifyAiDemo-input"
          value={form.designation}
          onChange={(e) => set("designation", e.target.value)}
        />
      </Field>
    </div>

    <Field label="Email ID" required>
      <input
        type="email"
        className="scanifyAiDemo-input"
        value={form.corporate_email}
        onChange={(e) => set("corporate_email", e.target.value)}
      />
    </Field>
  </div>
)}

          {/* ── STEP 2 ── */}
{step === 2 && (
  <div className="scanifyAiDemo-step-body">

    <div className="scanifyAiDemo-step-intro">
      <h2 className="scanifyAiDemo-step-h">
        Requirement Gathering
      </h2>
      <p className="scanifyAiDemo-step-p">
        Help us understand your current document processing workflow.
      </p>
    </div>

    {/* Q1 */}
<Field label="1. How are you currently processing documents like invoices, POs, or GRNs?" required>
  <div className="scanifyAiDemo-option-grid">

    {[
      "Invoice Processing",
      "Purchase Order (PO) Processing",
      "GRN Processing",
      "Delivery Challan Processing",
      "Receipt Processing",
      "Vendor Invoice Processing"
    ].map((item) => (
      <label key={item}>
        <input
          type="checkbox"
          checked={form.q1_current_process?.includes(item)}
          onChange={(e) =>
            handleCheckboxChange(
              "q1_current_process",
              item,
              e.target.checked
            )
          }
        />
        {item}
      </label>
    ))}

    <label>
      <input
        type="checkbox"
        checked={showQ1Other}
        onChange={(e) => setShowQ1Other(e.target.checked)}
      />
      Other
    </label>

  </div>

  {showQ1Other && (
  <input
    className="scanifyAiDemo-input"
    placeholder="Please Specify"
    value={form.q1_other}
    onChange={(e) => set("q1_other", e.target.value)}
    style={{ marginTop: "8px" }}
  />
)}
</Field>
<div className="scanifyAiDemo-form-row scanifyAiDemo-col-2">
    {/* Q2 */}
    <Field label="2. What is your average monthly document volume (Invoices, POs, etc.)?" required>
<select
  className="scanifyAiDemo-select"
  value={form.q2_document_volume}
  onChange={(e) => set("q2_document_volume", e.target.value)}
>
  <option value="">Select Volume</option>
  <option>0 - 500 Documents</option>
  <option>500 - 2,000 Documents</option>
  <option>2,000 - 5,000 Documents</option>
</select>
    </Field>

    {/* Q3 */}
    <Field label="3. How long does it take from document receipt to final entry in your system?" required>
      <select
  className="scanifyAiDemo-select"
  value={form.q3_processing_time}
  onChange={(e) => set("q3_processing_time", e.target.value)}
>
        <option value="">Select Processing Time</option>
        <option>Less than 30 Minutes</option>
        <option>30 Minutes - 1 Hour</option>
        <option>1 - 4 Hours</option>
        <option>4 - 8 Hours</option>
        <option>More than 1 Day</option>
      </select>
    </Field>
</div>

    {/* Q4 */}
    <Field label="4. What kind of errors or mismatches do you face during data entry or validation?" required>
      <textarea
  className="scanifyAiDemo-textarea"
  value={form.q4_errors}
  onChange={(e) => set("q4_errors", e.target.value)}
/>
    </Field>

    {/* Q5 */}
    <Field label="5. How many people are involved in this process, and what is the approximate effort per document?" required>
  <select
    className="scanifyAiDemo-select"
    value={form.q5_team_size}
    onChange={(e) => set("q5_team_size", e.target.value)}
  >
    <option value="">Select Team Size</option>
    <option>1 - 2 Users</option>
    <option>3 - 5 Users</option>
    <option>6 - 10 Users</option>
    <option>11 - 20 Users</option>
    <option>20+ Users</option>
  </select>

  <input
    className="scanifyAiDemo-input"
    placeholder="Approximate Effort Per Document"
    value={form.q5_effort_per_document}
    onChange={(e) => set("q5_effort_per_document", e.target.value)}
    style={{ marginTop: "10px" }}
  />
</Field>

    {/* Q6 */}
<Field label="6. Which ERP or accounting systems are you currently using?" required>
  <select
  className="scanifyAiDemo-select"
  value={form.q6_erp_system}
  onChange={(e) => {
    set("q6_erp_system", e.target.value);
    setShowQ6Other(e.target.value === "Other");
  }}
>
    <option value="">Select ERP</option>
    <option>SAP ECC</option>
    <option>SAP S/4HANA</option>
    <option>SAP Business One</option>
    <option>Oracle EBS</option>
    <option>Oracle Fusion</option>
    <option>Microsoft Dynamics 365</option>
    <option>Tally</option>
    <option>Zoho</option>
    <option>ERPNext</option>
    <option>Other</option>
  </select>

  {showQ6Other && (
  <input
    className="scanifyAiDemo-input"
    placeholder="Please Specify"
    value={form.q6_other}
    onChange={(e) => set("q6_other", e.target.value)}
    style={{ marginTop: "8px" }}
  />
)}
</Field>

    {/* Q7 */}
<Field label="7. What formats do your documents come in?" required>
  <div className="scanifyAiDemo-option-grid">

    {[
      "PDF",
      "Scanned PDF",
      "JPG",
      "PNG",
      "Email Body",
      "Excel",
      "Handwritten Documents"
    ].map((item) => (
      <label key={item}>
        <input
          type="checkbox"
          checked={form.q7_document_formats?.includes(item)}
          onChange={(e) =>
            handleCheckboxChange(
              "q7_document_formats",
              item,
              e.target.checked
            )
          }
        />
        {item}
      </label>
    ))}

    <label>
      <input
        type="checkbox"
        checked={showQ7Other}
        onChange={(e) => setShowQ7Other(e.target.checked)}
      />
      Other
    </label>

  </div>

  {showQ7Other && (
  <input
    className="scanifyAiDemo-input"
    placeholder="Please Specify"
    value={form.q7_other}
    onChange={(e) => set("q7_other", e.target.value)}
    style={{ marginTop: "8px" }}
  />
)}
</Field>

    {/* Q8 */}
   <Field label="8. What are the top 3 challenges you face in your current document processing workflow?">
  <textarea
    className="scanifyAiDemo-textarea"
    value={form.q8_pain_points}
    onChange={(e) => set("q8_pain_points", e.target.value)}
    placeholder="Describe your top challenges"
  />
</Field>

    {/* Q9 */}
<Field label="9. How do these inefficiencies impact your business?" required>
  <div className="scanifyAiDemo-option-grid">

    {[
      "Delayed Payments",
      "Delayed Order Processing",
      "Compliance Risks",
      "Vendor Issues",
      "Customer Complaints",
      "Increased Operational Cost",
      "Revenue Impact"
    ].map((item) => (
      <label key={item}>
        <input
          type="checkbox"
          checked={form.q9_business_impact?.includes(item)}
          onChange={(e) =>
            handleCheckboxChange(
              "q9_business_impact",
              item,
              e.target.checked
            )
          }
        />
        {item}
      </label>
    ))}

    <label>
      <input
        type="checkbox"
        checked={showQ9Other}
        onChange={(e) => setShowQ9Other(e.target.checked)}
      />
      Other
    </label>

  </div>

  {showQ9Other && (
  <input
    className="scanifyAiDemo-input"
    placeholder="Please Specify"
    value={form.q9_other}
    onChange={(e) => set("q9_other", e.target.value)}
    style={{ marginTop: "8px" }}
  />
)}
</Field>

    {/* Q10 */}
<Field label="10. Have you explored automation or OCR solutions before? What worked or didn't?" required>

  <label>
    <input
      type="radio"
      name="ocr"
      value="Never Evaluated"
      checked={form.q10_automation_readiness === "Never Evaluated"}
      onChange={(e) => set("q10_automation_readiness", e.target.value)}
    />
    Never Evaluated
  </label>
  <br />

  <label>
    <input
      type="radio"
      name="ocr"
      value="Evaluated OCR Solutions"
      checked={form.q10_automation_readiness === "Evaluated OCR Solutions"}
      onChange={(e) => set("q10_automation_readiness", e.target.value)}
    />
    Evaluated OCR Solutions
  </label>
  <br />

  <label>
    <input
      type="radio"
      name="ocr"
      value="Currently Using OCR"
      checked={form.q10_automation_readiness === "Currently Using OCR"}
      onChange={(e) => set("q10_automation_readiness", e.target.value)}
    />
    Currently Using OCR
  </label>
  <br />

  <label>
    <input
      type="radio"
      name="ocr"
      value="Currently Using OCR + Workflow Automation"
      checked={form.q10_automation_readiness === "Currently Using OCR + Workflow Automation"}
      onChange={(e) => set("q10_automation_readiness", e.target.value)}
    />
    Currently Using OCR + Workflow Automation
  </label>
  <br />

  <label>
    <input
      type="radio"
      name="ocr"
      value="Other"
      checked={form.q10_automation_readiness === "Other"}
      onChange={() => {
        set("q10_automation_readiness", "Other");
        setShowQ10Other(true);
      }}
    />
    Other
  </label>

  {showQ10Other && (
  <input
    className="scanifyAiDemo-input"
    placeholder="Please Specify"
    value={form.q10_other}
    onChange={(e) => set("q10_other", e.target.value)}
    style={{ marginTop: "8px" }}
  />
)}
</Field>

    {/* Q11 */}
    <Field label="11. How do you currently verify extracted data accuracy before posting to ERP?" required>
      <textarea
  className="scanifyAiDemo-textarea"
  value={form.q11_validation_process}
  onChange={(e) => set("q11_validation_process", e.target.value)}
/>
    </Field>

    {/* Q12 */}
    <Field label="12. How are documents currently entered into ERP - manual entry, upload, or API integration?" required>

  <label>
    <input
      type="radio"
      name="erpentry"
      value="Manual Entry"
      checked={form.q12_erp_entry_method === "Manual Entry"}
      onChange={(e) => set("q12_erp_entry_method", e.target.value)}
    />
    Manual Entry
  </label>
  <br />

  <label>
    <input
      type="radio"
      name="erpentry"
      value="Excel Upload"
      checked={form.q12_erp_entry_method === "Excel Upload"}
      onChange={(e) => set("q12_erp_entry_method", e.target.value)}
    />
    Excel Upload
  </label>
  <br />

  <label>
    <input
      type="radio"
      name="erpentry"
      value="API Integration"
      checked={form.q12_erp_entry_method === "API Integration"}
      onChange={(e) => set("q12_erp_entry_method", e.target.value)}
    />
    API Integration
  </label>
  <br />

  <label>
    <input
      type="radio"
      name="erpentry"
      value="Middleware Integration"
      checked={form.q12_erp_entry_method === "Middleware Integration"}
      onChange={(e) => set("q12_erp_entry_method", e.target.value)}
    />
    Middleware Integration
  </label>
  <br />

  <label>
    <input
      type="radio"
      name="erpentry"
      value="Other"
      checked={form.q12_erp_entry_method === "Other"}
      onChange={() => {
        set("q12_erp_entry_method", "Other");
        setShowQ12Other(true);
      }}
    />
    Other
  </label>

  {showQ12Other && (
  <input
    className="scanifyAiDemo-input"
    placeholder="Please Specify"
    value={form.q12_other}
    onChange={(e) => set("q12_other", e.target.value)}
    style={{ marginTop: "8px" }}
  />
)}
</Field>

    {/* Q13 */}
    <Field label="13. Do we have any mapping template or format that needs to be followed for ERP upload?" required>
      <textarea
  className="scanifyAiDemo-textarea"
  value={form.q13_mapping_template}
  onChange={(e) => set("q13_mapping_template", e.target.value)}
/>    </Field>

    {/* Q14 */}
<Field label="14. Is there an approval workflow configured in ERP before final posting?" required>
  <select
  className="scanifyAiDemo-select"
  value={form.q14_approval_workflow}
  onChange={(e) => {
    set("q14_approval_workflow", e.target.value);
    setShowQ14Other(e.target.value === "Other");
  }}
>
    <option value="">Select Workflow</option>
    <option>No Approval Workflow</option>
    <option>Single Level Approval</option>
    <option>Two Level Approval</option>
    <option>Three Level Approval</option>
    <option>Multi Level Approval</option>
    <option>Other</option>
  </select>

  {showQ14Other && (
  <input
    className="scanifyAiDemo-input"
    placeholder="Please Specify"
    value={form.q14_other}
    onChange={(e) => set("q14_other", e.target.value)}
    style={{ marginTop: "8px" }}
  />
)}
</Field>

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
              {step < 2
                ? <button className="scanifyAiDemo-btn-primary" onClick={next}>
                  Continue
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M5 3l5 4.5L5 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                : <div className="scanifyAiDemo-submit-row">
                  <button className="scanifyAiDemo-btn-primary" onClick={() => submit()} disabled={loading}>
                    {loading ? <span className="scanifyAiDemo-spinner" /> : <>Submit Requirements <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M5 3l5 4.5L5 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></>}
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