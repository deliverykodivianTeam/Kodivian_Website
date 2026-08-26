import React, { useState, useRef, useEffect } from "react";
import "../styles/scanifybooking.css";
import scanifyKodivianLogo from "../assets/scanifykodivianlogo.png";

const API_URL = import.meta.env.VITE_API_URL || "https://kodivian-website-8.onrender.com";

const INITIAL_FORM = {
  // Step 1: Contact
  full_name: "",
  designation: "",
  company_name: "",
  corporate_email: "",
  mobile_number: "",

  // Step 2: Requirement Gathering
  // 1. Document Scope
  document_types: [],
  document_types_other: "",
  document_formats: [],
  document_formats_other: "",
  multilingual_docs: "",
  multilingual_docs_other: "",

  // 2. Volume & Frequency
  monthly_volume: "",
  monthly_volume_comment: "",

  // 3. Data Sources & Intake
  intake_channels: [],
  intake_channels_other: "",
  intake_channels_comment: "",

  // 4. Validation & Business Rules
  validation_rules: [],
  validation_rules_comment: "",

  // 5. ERP & System Integration
  erp_platform: "",
  erp_platform_other: "",
  erp_comment: "",

  // 6. Workflow & Approval
  workflow_approval_enabled: false,
  exception_routing_enabled: false,
  escalation_process_enabled: false,
  workflow_notes: "",

  // 7. Deployment & Infrastructure
  deployment_model: "",
  deployment_comment: "",

  // 8. Reporting & Analytics
  reporting_enabled: false,
  reporting_comment: "",
  kpi_tracking_enabled: false,
  kpi_tracking_comment: ""
};

/* ── Reusable Field Wrapper ── */
function Field({ label, required, optional, tooltip, children }) {
  return (
    <div className="scanifyAiDemo-field">
      <div className="scanifyAiDemo-field-header">
        <label className="scanifyAiDemo-field-label">
          {label}
          {required && <span className="scanifyAiDemo-req"> *</span>}
          {optional && <span className="scanifyAiDemo-opt"> (optional)</span>}
        </label>
        {tooltip && <span className="scanify-field-tooltip">{tooltip}</span>}
      </div>
      {children}
    </div>
  );
}

/* ── Section Card Container ── */
function RequirementSection({ number, title, subtitle, icon, children }) {
  return (
    <div className="scanify-section-card">
      <div className="scanify-sec-header">
        <div className="scanify-sec-badge">
          <span>{number}</span>
        </div>
        <div className="scanify-sec-meta">
          <h3 className="scanify-sec-title">
            {icon && <span className="scanify-sec-icon">{icon}</span>}
            {title}
          </h3>
          {subtitle && <p className="scanify-sec-desc">{subtitle}</p>}
        </div>
      </div>
      <div className="scanify-sec-body">{children}</div>
    </div>
  );
}

export default function ScanifyBookingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [validationModal, setValidationModal] = useState({ open: false, title: "", errors: [] });
  const formRef = useRef(null);
  const [form, setForm] = useState({ ...INITIAL_FORM });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const toggleArrayItem = (field, item) => {
    setForm(p => {
      const current = p[field] || [];
      if (current.includes(item)) {
        return { ...p, [field]: current.filter(x => x !== item) };
      } else {
        return { ...p, [field]: [...current, item] };
      }
    });
  };

  const closeModalAndScroll = () => {
    const firstErr = validationModal.errors[0];
    setValidationModal({ open: false, title: "", errors: [] });
    if (firstErr && firstErr.fieldId) {
      setTimeout(() => {
        document.getElementById(firstErr.fieldId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  useEffect(() => {
    const el = formRef.current?.querySelector("input, select, textarea");
    el?.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const next = () => {
    if (step === 1) {
      const errors = [];
      if (!form.full_name.trim()) {
        errors.push({ sec: "Step 1", name: "Full Name", fieldId: "field-full_name", desc: "Please provide your corporate contact name." });
      }
      if (!form.company_name.trim()) {
        errors.push({ sec: "Step 1", name: "Company / Organization Name", fieldId: "field-company_name", desc: "Please provide your company name." });
      }
      if (!form.mobile_number.trim()) {
        errors.push({ sec: "Step 1", name: "Mobile / Direct Phone", fieldId: "field-mobile_number", desc: "Please enter your phone number." });
      } else if (!/^[6-9]\d{9}$/.test(form.mobile_number.replace(/\D/g, "").slice(-10))) {
        errors.push({ sec: "Step 1", name: "Mobile / Direct Phone", fieldId: "field-mobile_number", desc: "Please enter a valid 10-digit mobile number." });
      }
      if (!form.corporate_email.trim()) {
        errors.push({ sec: "Step 1", name: "Corporate Email ID", fieldId: "field-corporate_email", desc: "Please enter your corporate email address." });
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.corporate_email)) {
        errors.push({ sec: "Step 1", name: "Corporate Email ID", fieldId: "field-corporate_email", desc: "Please enter a valid email format (e.g. name@company.com)." });
      }

      if (errors.length > 0) {
        setValidationModal({
          open: true,
          title: "Incomplete Contact Details",
          errors
        });
        return;
      }
      setStep(2);
    }
  };

  const prev = () => setStep(1);

  const submit = async () => {
    const errors = [];

    if (form.document_types.length === 0 && !form.document_types_other.trim()) {
      errors.push({ sec: "01", name: "01. Document Scope & Characteristics ➔ Document Types", fieldId: "field-document_types", desc: "Please select at least one document type (Invoices, POs, Receipts, etc.)." });
    }
    if (form.document_formats.length === 0 && !form.document_formats_other.trim()) {
      errors.push({ sec: "01", name: "01. Document Scope & Characteristics ➔ Document Formats", fieldId: "field-document_formats", desc: "Please select at least one document format (Digital PDF, Scanned Images, etc.)." });
    }
    if (!form.multilingual_docs) {
      errors.push({ sec: "01", name: "01. Document Scope & Characteristics ➔ Multi-Language Documents", fieldId: "field-multilingual_docs", desc: "Please select Single Language (English only) or Multi-Language requirement." });
    }
    if (!form.monthly_volume) {
      errors.push({ sec: "02", name: "02. Volume & Frequency ➔ Monthly Document Volume", fieldId: "field-monthly_volume", desc: "Please select your estimated monthly processing volume tier." });
    }
    if (form.intake_channels.length === 0 && !form.intake_channels_other.trim()) {
      errors.push({ sec: "03", name: "03. Data Sources & Intake Channels ➔ Intake Channels", fieldId: "field-intake_channels", desc: "Please select at least one intake source (Email, Scanner, Portal, Fax, API)." });
    }
    if (!form.erp_platform) {
      errors.push({ sec: "05", name: "05. ERP & System Integration ➔ ERP Platform", fieldId: "field-erp_platform", desc: "Please select your target ERP platform (SAP, Oracle, Dynamics, Tally, Zoho, etc.)." });
    }
    if (!form.deployment_model) {
      errors.push({ sec: "07", name: "07. Deployment Preference ➔ Preferred Deployment Model", fieldId: "field-deployment_model", desc: "Please select Cloud SaaS, On-Premises, or Hybrid deployment model." });
    }

    if (errors.length > 0) {
      setValidationModal({
        open: true,
        title: "Please Complete Required Questions",
        errors
      });
      return;
    }

    // Prepare rich formatted summary for both legacy & updated backend compatibility
    const docTypesCombined = [...form.document_types, form.document_types_other ? `Other: ${form.document_types_other}` : ""].filter(Boolean).join(", ");
    const docFormatsCombined = [...form.document_formats, form.document_formats_other ? `Other: ${form.document_formats_other}` : ""].filter(Boolean).join(", ");
    const intakeCombined = [...form.intake_channels, form.intake_channels_other ? `Other: ${form.intake_channels_other}` : ""].filter(Boolean).join(", ");
    const validationCombined = [
      ...form.validation_rules,
      form.validation_rules_comment ? `Notes: ${form.validation_rules_comment}` : ""
    ].filter(Boolean).join(" | ");

    const workflowSelected = [];
    if (form.workflow_approval_enabled) workflowSelected.push("Approval Workflow");
    if (form.exception_routing_enabled) workflowSelected.push("Exception Routing");
    if (form.escalation_process_enabled) workflowSelected.push("Escalation Process");
    if (form.workflow_notes) workflowSelected.push(`Notes: ${form.workflow_notes}`);
    const workflowCombined = workflowSelected.length > 0 ? workflowSelected.join(", ") : "Standard Automation";

    const reportingCombined = [
      form.reporting_enabled ? `Reporting Enabled (${form.reporting_comment || "Standard"})` : "Reporting: No",
      form.kpi_tracking_enabled ? `KPI Tracking Enabled (${form.kpi_tracking_comment || "Standard"})` : "KPI: No"
    ].join(" | ");

    const payload = {
      // Basic info
      full_name: form.full_name,
      designation: form.designation || "",
      company_name: form.company_name,
      corporate_email: form.corporate_email,
      mobile_number: form.mobile_number,

      // New schema fields
      document_types: docTypesCombined,
      document_formats: docFormatsCombined,
      multilingual_docs: form.multilingual_docs === "Other" ? `Other: ${form.multilingual_docs_other}` : form.multilingual_docs,
      monthly_volume: form.monthly_volume + (form.monthly_volume_comment ? ` (${form.monthly_volume_comment})` : ""),
      intake_channels: intakeCombined + (form.intake_channels_comment ? ` | Intake Notes: ${form.intake_channels_comment}` : ""),
      validation_rules: validationCombined,
      erp_platform: (form.erp_platform === "Other" ? `Other: ${form.erp_platform_other}` : form.erp_platform) + (form.erp_comment ? ` (${form.erp_comment})` : ""),
      workflow_approval: workflowCombined,
      deployment_model: form.deployment_model + (form.deployment_comment ? ` (${form.deployment_comment})` : ""),
      reporting_analytics: reportingCombined,

      // Mapped legacy schema fields (for backward compatibility with any server/email handlers)
      q1_current_process: docTypesCombined,
      q2_document_volume: form.monthly_volume + (form.monthly_volume_comment ? ` (${form.monthly_volume_comment})` : ""),
      q3_processing_time: form.multilingual_docs,
      q4_errors: validationCombined,
      q5_team_size: form.deployment_model,
      q5_effort_per_document: form.monthly_volume_comment || "",
      q6_erp_system: form.erp_platform === "Other" ? `Other: ${form.erp_platform_other}` : form.erp_platform,
      q7_document_formats: docFormatsCombined,
      q8_pain_points: intakeCombined,
      q9_business_impact: reportingCombined,
      q10_automation_readiness: workflowCombined,
      q11_validation_process: form.validation_rules_comment || validationCombined,
      q12_erp_entry_method: form.erp_comment || "Direct / API",
      q13_mapping_template: form.deployment_comment || "",
      q14_approval_workflow: workflowCombined,

      q1_other: form.document_types_other,
      q6_other: form.erp_platform_other,
      q7_other: form.document_formats_other,
      q9_other: form.reporting_comment,
      q10_other: form.workflow_notes,
      q12_other: form.erp_comment,
      q14_other: form.kpi_tracking_comment
    };

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/book-demo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Submission failed");
      setBookingRef(data.booking_reference || "SCAN-" + Math.floor(100000 + Math.random() * 900000));
      setSubmitted(true);
    } catch (e) {
      console.error("Submission error:", e);
      alert(e.message || "Submission error. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setForm({ ...INITIAL_FORM });
    setSubmitted(false);
    setBookingRef("");
    setStep(1);
  };

  /* ────────── SUCCESS SCREEN ────────── */
  if (submitted) {
    return (
      <div className="scanifyAiDemo-page">
        <div className="scanifyAiDemo-success-center">
          <div className="scanifyAiDemo-success-card">
            <div className="scanifyAiDemo-success-check">
              <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
                <path d="M5 14l6 6L23 8" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="scanifyAiDemo-success-h">Requirements Submitted!</h2>
            <p className="scanifyAiDemo-success-p">
              Thank you, <strong>{form.full_name}</strong>. Our solution architects have received your document workflow requirements and will prepare a tailored demonstration for <strong>{form.company_name}</strong>.
            </p>
            {bookingRef && (
              <div className="scanifyAiDemo-success-meta">
                <div className="scanifyAiDemo-smeta-row">
                  <span className="scanifyAiDemo-smeta-k">Booking Reference</span>
                  <span className="scanifyAiDemo-smeta-v scanifyAiDemo-mono">{bookingRef}</span>
                </div>
                <hr className="scanifyAiDemo-smeta-hr" />
                <div className="scanifyAiDemo-smeta-row">
                  <span className="scanifyAiDemo-smeta-k">Corporate Email</span>
                  <span className="scanifyAiDemo-smeta-v">{form.corporate_email}</span>
                </div>
              </div>
            )}
            <div className="scanifyAiDemo-success-actions">
              <button className="scanifyAiDemo-btn-primary" onClick={reset}>
                Submit Another Request
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const pct = step === 1 ? 50 : 100;

  /* ────────── MAIN FORM ────────── */
  return (
    <div className={`scanifyAiDemo-page ${step === 1 ? "scanifyAiDemo-page-step1" : "scanifyAiDemo-page-step2"}`}>
      <div className={`scanifyAiDemo-shell ${step === 2 ? "scanifyAiDemo-shell-full" : ""}`}>

        {/* ══════════ SIDEBAR (Step 1 Only) ══════════ */}
        {step === 1 && (
          <aside className="scanifyAiDemo-sidebar">
            {/* Brand */}
            <div className="scanifyAiDemo-sb-brand">
              <div>
                <p className="scanifyAiDemo-sb-name">Scanify AI</p>
                <p className="scanifyAiDemo-sb-tagline">Enterprise Document Intelligence & Automation</p>
              </div>
            </div>

            {/* Scanning Animation */}
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
                <div className="scanifyAiDemo-scan-corner scanifyAiDemo-tl" /><div className="scanifyAiDemo-scan-corner scanifyAiDemo-tr" />
                <div className="scanifyAiDemo-scan-corner scanifyAiDemo-bl" /><div className="scanifyAiDemo-scan-corner scanifyAiDemo-br" />
              </div>
              <div className="scanifyAiDemo-scan-badge">
                <span className="scanifyAiDemo-scan-dot" /><span>AI Extraction Engine Active</span>
              </div>
            </div>

            {/* Stats */}
            <div className="scanifyAiDemo-sb-stats">
              {[["99.4%", "OCR Precision"], ["10x", "Faster Turnaround"], ["85%", "Cost Reduction"]].map(([v, l]) => (
                <div className="scanifyAiDemo-sb-stat" key={l}>
                  <span className="scanifyAiDemo-sb-sv">{v}</span>
                  <span className="scanifyAiDemo-sb-sl">{l}</span>
                </div>
              ))}
            </div>

            {/* Integrations */}
            <div className="scanifyAiDemo-sb-ints">
              <p className="scanifyAiDemo-sb-int-label">Enterprise Ready With</p>
              <div className="scanifyAiDemo-sb-int-pills">
                {["SAP S/4HANA", "Oracle Fusion", "MS Dynamics", "TallyPrime", "Zoho", "REST APIs"].map(i => (
                  <span className="scanifyAiDemo-sb-pill" key={i}>{i}</span>
                ))}
              </div>
            </div>

            {/* Contact Representative */}
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
        )}

        {/* ══════════ FORM PANEL ══════════ */}
        <main className={`scanifyAiDemo-form-panel ${step === 2 ? "scanifyAiDemo-form-panel-full" : ""}`} ref={formRef}>

          {/* Header & Progress */}
          <div className="scanifyAiDemo-fp-header">
            <div className="scanifyAiDemo-demo-header">
              <div className="scanifyAiDemo-demo-title-section">
                <h1 className="scanifyAiDemo-fp-title">Book a Personalised Demo</h1>
                <p className="scanifyAiDemo-fp-sub">Tailored to your document types, volume, validation rules, and ERP ecosystem.</p>
              </div>

              <img
                src={scanifyKodivianLogo}
                alt="Kodivian Scanify AI"
                className="scanifyAiDemo-demo-top-right-logo"
              />
            </div>

            {/* Stepper */}
            <div className="scanifyAiDemo-stepper">
              {[
                { n: 1, lbl: "Contact Details" },
                { n: 2, lbl: "Requirement Gathering" }
              ].map(({ n, lbl }, i) => {
                const done = step > n;
                const active = step === n;
                return (
                  <React.Fragment key={n}>
                    <div className={`scanifyAiDemo-st-item${active ? " scanifyAiDemo-active" : ""}${done ? " scanifyAiDemo-done" : ""}`}>
                      <div className="scanifyAiDemo-st-bubble">
                        {done ? (
                          <svg width="12" height="12" viewBox="0 0 11 11" fill="none">
                            <path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : n}
                      </div>
                      <span className="scanifyAiDemo-st-lbl">{lbl}</span>
                    </div>
                    {i === 0 && <div className={`scanifyAiDemo-st-line${done ? " scanifyAiDemo-done" : ""}`} />}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="scanifyAiDemo-progress-track">
              <div className="scanifyAiDemo-progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>

          {/* ══════════ STEP 1: CONTACT DETAILS ══════════ */}
          {step === 1 && (
            <div className="scanifyAiDemo-step-body">
              <div className="scanifyAiDemo-step-intro">
                <h2 className="scanifyAiDemo-step-h">Contact Information</h2>
                <p className="scanifyAiDemo-step-p">
                  Please provide your corporate details so we can assign a dedicated solution architect to your demo.
                </p>
              </div>

              <div className="scanifyAiDemo-form-row scanifyAiDemo-col-2">
                <Field label="Full Name" required>
                  <input
                    id="field-full_name"
                    className="scanifyAiDemo-input"
                    placeholder="e.g. Alexander Wright"
                    value={form.full_name}
                    onChange={(e) => set("full_name", e.target.value)}
                  />
                </Field>

                <Field label="Mobile / Direct Phone" required>
                  <input
                    id="field-mobile_number"
                    className="scanifyAiDemo-input"
                    placeholder="e.g. +91 98765 43210"
                    value={form.mobile_number}
                    onChange={(e) => set("mobile_number", e.target.value)}
                  />
                </Field>
              </div>

              <div className="scanifyAiDemo-form-row scanifyAiDemo-col-2">
                <Field label="Company / Organization Name" required>
                  <input
                    id="field-company_name"
                    className="scanifyAiDemo-input"
                    placeholder="e.g. Acme Global Logistics"
                    value={form.company_name}
                    onChange={(e) => set("company_name", e.target.value)}
                  />
                </Field>

                <Field label="Designation / Role" optional>
                  <input
                    className="scanifyAiDemo-input"
                    placeholder="e.g. Head of Finance / IT Director"
                    value={form.designation}
                    onChange={(e) => set("designation", e.target.value)}
                  />
                </Field>
              </div>

              <Field label="Corporate Email ID" required>
                <input
                  id="field-corporate_email"
                  type="email"
                  className="scanifyAiDemo-input"
                  placeholder="e.g. alexander@company.com"
                  value={form.corporate_email}
                  onChange={(e) => set("corporate_email", e.target.value)}
                />
              </Field>
            </div>
          )}

          {/* ══════════ STEP 2: REQUIREMENT GATHERING ══════════ */}
          {step === 2 && (
            <div className="scanifyAiDemo-step-body scanify-req-flow">
              <div className="scanifyAiDemo-step-intro">
                <h2 className="scanifyAiDemo-step-h">Document Automation Requirements</h2>
                <p className="scanifyAiDemo-step-p">
                  Customize the parameters below to help us tailor our extraction engines, validation logic, and ERP connectors for your exact workflow.
                </p>
              </div>

              {/* ──────────────── 1. Document Scope & Characteristics ──────────────── */}
              <RequirementSection
                number="01"
                title="Document Scope & Characteristics"
                subtitle="Specify the document types, incoming formats, and language support required."
                icon="📄"
              >
                {/* 1.1 Document Types */}
                <div id="field-document_types">
                  <Field label="Document Types – Which documents need to be processed?" required tooltip="Select all that apply">
                    <div className="scanify-chip-grid">
                      {[
                        { id: "Invoices", label: "Invoices (Vendor & Commercial)", icon: "🧾" },
                        { id: "Purchase Orders (POs)", label: "Purchase Orders (POs)", icon: "📋" },
                        { id: "Receipts", label: "Receipts & Expense Vouchers", icon: "🧾" },
                        { id: "Delivery Notes / Challans", label: "Delivery Notes / Challans", icon: "🚚" },
                        { id: "Goods Receipt Notes (GRN)", label: "Goods Receipt Notes (GRN)", icon: "📦" },
                        { id: "Credit / Debit Notes", label: "Credit / Debit Notes", icon: "💳" },
                        { id: "Contracts & Agreements", label: "Contracts & Agreements", icon: "📑" },
                        { id: "Other", label: "Other Document Type", icon: "➕" }
                      ].map((item) => {
                        const isSelected = item.id === "Other"
                          ? Boolean(form.document_types_other || form.document_types.includes("Other"))
                          : form.document_types.includes(item.id);

                        return (
                          <button
                            key={item.id}
                            type="button"
                            className={`scanify-select-chip ${isSelected ? "active" : ""}`}
                            onClick={() => {
                              if (item.id === "Other") {
                                toggleArrayItem("document_types", "Other");
                              } else {
                                toggleArrayItem("document_types", item.id);
                              }
                            }}
                          >
                            <span className="scanify-chip-icon">{item.icon}</span>
                            <span className="scanify-chip-text">{item.label}</span>
                            <span className="scanify-chip-check">
                              {isSelected ? "✓" : "+"}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {(form.document_types.includes("Other") || form.document_types_other) && (
                      <div className="scanify-expand-input">
                        <input
                          className="scanifyAiDemo-input"
                          placeholder="Please specify your other document types (e.g. Bills of Lading, Bank Statements)..."
                          value={form.document_types_other}
                          onChange={(e) => set("document_types_other", e.target.value)}
                        />
                      </div>
                    )}
                  </Field>
                </div>

                {/* 1.2 Document Formats */}
                <div id="field-document_formats">
                  <Field label="Document Source – In what formats are documents received from the source?" required tooltip="Select all that apply">
                    <div className="scanify-chip-grid">
                      {[
                        { id: "Digital PDF", label: "Digital PDF (Native / Searchable)", icon: "📄" },
                        { id: "Scanned PDF / Images", label: "Scanned PDF / Images (JPG, PNG, TIFF)", icon: "🖼️" },
                        { id: "Email Body / In-line", label: "Email Body & HTML Content", icon: "✉️" },
                        { id: "Physical Paper", label: "Physical Paper / Hard Copy", icon: "📜" },
                        { id: "Excel / Spreadsheets", label: "Excel / Spreadsheets (XLSX, CSV)", icon: "📊" },
                        { id: "Handwritten Documents", label: "Handwritten / Mixed Text", icon: "✍️" },
                        { id: "Other", label: "Other Format", icon: "➕" }
                      ].map((item) => {
                        const isSelected = item.id === "Other"
                          ? Boolean(form.document_formats_other || form.document_formats.includes("Other"))
                          : form.document_formats.includes(item.id);

                        return (
                          <button
                            key={item.id}
                            type="button"
                            className={`scanify-select-chip ${isSelected ? "active" : ""}`}
                            onClick={() => {
                              if (item.id === "Other") {
                                toggleArrayItem("document_formats", "Other");
                              } else {
                                toggleArrayItem("document_formats", item.id);
                              }
                            }}
                          >
                            <span className="scanify-chip-icon">{item.icon}</span>
                            <span className="scanify-chip-text">{item.label}</span>
                            <span className="scanify-chip-check">
                              {isSelected ? "✓" : "+"}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {(form.document_formats.includes("Other") || form.document_formats_other) && (
                      <div className="scanify-expand-input">
                        <input
                          className="scanifyAiDemo-input"
                          placeholder="Please specify other incoming document formats..."
                          value={form.document_formats_other}
                          onChange={(e) => set("document_formats_other", e.target.value)}
                        />
                      </div>
                    )}
                  </Field>
                </div>

                {/* 1.3 Multi-Language Docs */}
                <div id="field-multilingual_docs">
                  <Field label="Multi-Language Docs – Are documents received in multiple languages?" required>
                    <div className="scanify-card-grid-3">
                      {[
                        {
                          id: "English Only",
                          title: "English Only",
                          desc: "Single-language document processing in English",
                          icon: "🌐"
                        },
                        {
                          id: "Bilingual",
                          title: "Bilingual Support",
                          desc: "English + Regional / Local Language (e.g. Hindi, Tamil, Arabic)",
                          icon: "🗣️"
                        },
                        {
                          id: "Multilingual",
                          title: "Multilingual Global",
                          desc: "Multiple international languages across global subsidiaries",
                          icon: "🌍"
                        },
                        {
                          id: "Other",
                          title: "Specific Languages",
                          desc: "Custom regional language requirements",
                          icon: "➕"
                        }
                      ].map((item) => {
                        const isSelected = form.multilingual_docs === item.id;
                        return (
                          <div
                            key={item.id}
                            className={`scanify-selection-card ${isSelected ? "active" : ""}`}
                            onClick={() => set("multilingual_docs", item.id)}
                          >
                            <div className="scanify-card-top">
                              <span className="scanify-card-icon">{item.icon}</span>
                              <div className="scanify-radio-circle">
                                {isSelected && <div className="scanify-radio-dot" />}
                              </div>
                            </div>
                            <div className="scanify-card-title">{item.title}</div>
                            <div className="scanify-card-desc">{item.desc}</div>
                          </div>
                        );
                      })}
                    </div>

                    {form.multilingual_docs === "Other" && (
                      <div className="scanify-expand-input">
                        <input
                          className="scanifyAiDemo-input"
                          placeholder="Specify required languages (e.g. German, Japanese, Spanish, Arabic, Hindi)..."
                          value={form.multilingual_docs_other}
                          onChange={(e) => set("multilingual_docs_other", e.target.value)}
                        />
                      </div>
                    )}
                  </Field>
                </div>
              </RequirementSection>

              {/* ──────────────── 2. Volume & Frequency ──────────────── */}
              <RequirementSection
                number="02"
                title="Volume & Frequency"
                subtitle="Estimate your daily and monthly document ingestion capacity."
                icon="📊"
              >
                <div id="field-monthly_volume">
                  <Field label="Monthly Volume – Approximately how many documents are processed per day/month?" required>
                    <div className="scanify-card-grid-3">
                      {[
                        { id: "< 500 docs / month", title: "Under 500 docs/mo", sub: "~15-20 docs/day", tier: "Starter" },
                        { id: "500 - 2,500 docs / month", title: "500 – 2,500 docs/mo", sub: "~25-100 docs/day", tier: "Growth" },
                        { id: "2,500 - 10,000 docs / month", title: "2,500 – 10,000 docs/mo", sub: "~100-400 docs/day", tier: "Professional" },
                        { id: "10,000 - 50,000 docs / month", title: "10,000 – 50,000 docs/mo", sub: "~400-2,000 docs/day", tier: "Enterprise" },
                        { id: "50,000+ docs / month", title: "50,000+ docs/mo", sub: "High-scale enterprise", tier: "Ultra Scale" },
                        { id: "Custom / Variable Volume", title: "Custom / Seasonal", sub: "Variable monthly peaks", tier: "Custom" }
                      ].map((item) => {
                        const isSelected = form.monthly_volume === item.id;
                        return (
                          <div
                            key={item.id}
                            className={`scanify-volume-card ${isSelected ? "active" : ""}`}
                            onClick={() => set("monthly_volume", item.id)}
                          >
                            <div className="scanify-vol-tier">{item.tier}</div>
                            <div className="scanify-vol-title">{item.title}</div>
                            <div className="scanify-vol-sub">{item.sub}</div>
                            <div className="scanify-vol-select-indicator">
                              {isSelected ? "Selected" : "Select"}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="scanify-comment-field-wrap">
                      <label className="scanify-subfield-label">
                        Volume Details & Peak Cycles (Optional Comment):
                      </label>
                      <input
                        className="scanifyAiDemo-input"
                        placeholder="e.g. Month-end surge up to 5,000 invoices in last 3 days, daily average 150 docs..."
                        value={form.monthly_volume_comment}
                        onChange={(e) => set("monthly_volume_comment", e.target.value)}
                      />
                    </div>
                  </Field>
                </div>
              </RequirementSection>

              {/* ──────────────── 3. Data Sources & Intake ──────────────── */}
              <RequirementSection
                number="03"
                title="Data Sources & Intake"
                subtitle="How do documents enter your organization and existing IT environment?"
                icon="📥"
              >
                <div id="field-intake_channels">
                  <Field label="Intake Channels – How do documents currently enter your system?" required tooltip="Select all active channels">
                    <div className="scanify-chip-grid">
                      {[
                        { id: "Email Inboxes", label: "Dedicated Email Inboxes (Auto-fetch)", icon: "📧" },
                        { id: "Scanner / MFP Folders", label: "Network Scanners / MFP Hot-folders", icon: "🖨️" },
                        { id: "Upload Web Portal", label: "Vendor Upload Web Portal / SFTP", icon: "☁️" },
                        { id: "Mobile App Capture", label: "Mobile App / Instant Camera Upload", icon: "📱" },
                        { id: "API & EDI Feeds", label: "Direct API / Webhook / EDI Feeds", icon: "🔌" },
                        { id: "Paper & Fax", label: "Physical Mail / Paper / Fax", icon: "📠" },
                        { id: "Other", label: "Other Intake Method", icon: "➕" }
                      ].map((item) => {
                        const isSelected = item.id === "Other"
                          ? Boolean(form.intake_channels_other || form.intake_channels.includes("Other"))
                          : form.intake_channels.includes(item.id);

                        return (
                          <button
                            key={item.id}
                            type="button"
                            className={`scanify-select-chip ${isSelected ? "active" : ""}`}
                            onClick={() => {
                              if (item.id === "Other") {
                                toggleArrayItem("intake_channels", "Other");
                              } else {
                                toggleArrayItem("intake_channels", item.id);
                              }
                            }}
                          >
                            <span className="scanify-chip-icon">{item.icon}</span>
                            <span className="scanify-chip-text">{item.label}</span>
                            <span className="scanify-chip-check">{isSelected ? "✓" : "+"}</span>
                          </button>
                        );
                      })}
                    </div>

                    {(form.intake_channels.includes("Other") || form.intake_channels_other) && (
                      <div className="scanify-expand-input">
                        <input
                          className="scanifyAiDemo-input"
                          placeholder="Please specify other intake channels..."
                          value={form.intake_channels_other}
                          onChange={(e) => set("intake_channels_other", e.target.value)}
                        />
                      </div>
                    )}

                    <div className="scanify-comment-field-wrap">
                      <label className="scanify-subfield-label">
                        Intake Specifics & Inbox Routing Notes (Comment):
                      </label>
                      <input
                        className="scanifyAiDemo-input"
                        placeholder="e.g. Invoices arrive at invoices@company.com with PDF attachments, some branch receipts via mobile..."
                        value={form.intake_channels_comment}
                        onChange={(e) => set("intake_channels_comment", e.target.value)}
                      />
                    </div>
                  </Field>
                </div>
              </RequirementSection>

              {/* ──────────────── 4. Validation & Business Rules ──────────────── */}
              <RequirementSection
                number="04"
                title="Validation & Business Rules"
                subtitle="Configure the automated verification, cross-checks, and math validation rules."
                icon="⚙️"
              >
                <Field label="Validation Rules – What business rules should be applied to validate extracted data?" optional tooltip="Select desired checks + specify custom rules">
                  <div className="scanify-chip-grid">
                    {[
                      { id: "2-Way / 3-Way PO Matching", label: "2-Way / 3-Way PO Matching (PO vs Invoice vs GRN)", icon: "🔍" },
                      { id: "GST & Tax Calculation", label: "GSTIN, Tax Slab & Math Check", icon: "📊" },
                      { id: "Duplicate Detection", label: "Duplicate Invoice & Ref Number Detection", icon: "🛡️" },
                      { id: "Vendor Master Verification", label: "Vendor Master & Bank Detail Verification", icon: "🏢" },
                      { id: "Line-Item Reconciliation", label: "Line-Item Rate × Qty = Total Sum Matching", icon: "🧮" },
                      { id: "Threshold & Currency Rules", label: "Custom Threshold, Tolerance & Multi-Currency Rules", icon: "⚡" }
                    ].map((item) => {
                      const isSelected = form.validation_rules.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={`scanify-select-chip ${isSelected ? "active" : ""}`}
                          onClick={() => toggleArrayItem("validation_rules", item.id)}
                        >
                          <span className="scanify-chip-icon">{item.icon}</span>
                          <span className="scanify-chip-text">{item.label}</span>
                          <span className="scanify-chip-check">{isSelected ? "✓" : "+"}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="scanify-comment-field-wrap">
                    <label className="scanify-subfield-label">
                      Validation Rules & Logic Details (Comment):
                    </label>
                    <textarea
                      className="scanifyAiDemo-textarea"
                      rows="3"
                      placeholder="Specify your custom validation rules (e.g. 5% price tolerance on PO lines, mandatory GRN match for CAPEX, GST number active status check)..."
                      value={form.validation_rules_comment}
                      onChange={(e) => set("validation_rules_comment", e.target.value)}
                    />
                  </div>
                </Field>
              </RequirementSection>

              {/* ──────────────── 5. ERP & System Integration ──────────────── */}
              <RequirementSection
                number="05"
                title="ERP & System Integration"
                subtitle="Select your target ERP or financial accounting platform."
                icon="🏢"
              >
                <div id="field-erp_platform">
                  <Field label="Existing ERP Platform – Which ERP solution is currently being used in your organization?" required>
                    <div className="scanify-card-grid-4">
                      {[
                        { id: "SAP (S/4HANA / ECC / B1)", name: "SAP", sub: "S/4HANA / ECC / B1" },
                        { id: "Oracle (Fusion / EBS / NetSuite)", name: "Oracle", sub: "Fusion Cloud / EBS / NetSuite" },
                        { id: "Microsoft Dynamics 365", name: "MS Dynamics", sub: "Finance / Business Central" },
                        { id: "Tally / TallyPrime", name: "Tally", sub: "TallyPrime / ERP 9" },
                        { id: "Zoho Books", name: "Zoho", sub: "Zoho Books / Zoho One" },
                        { id: "QuickBooks", name: "QuickBooks", sub: "Online / Desktop Enterprise" },
                        { id: "In-House / Custom ERP", name: "Custom ERP", sub: "Proprietary Database / Core App" },
                        { id: "Other", name: "Other ERP", sub: "Specify your platform" }
                      ].map((erp) => {
                        const isSelected = form.erp_platform === erp.id;
                        return (
                          <div
                            key={erp.id}
                            className={`scanify-erp-card ${isSelected ? "active" : ""}`}
                            onClick={() => set("erp_platform", erp.id)}
                          >
                            <div className="scanify-erp-indicator">
                              {isSelected && "●"}
                            </div>
                            <div className="scanify-erp-name">{erp.name}</div>
                            <div className="scanify-erp-sub">{erp.sub}</div>
                          </div>
                        );
                      })}
                    </div>

                    {form.erp_platform === "Other" && (
                      <div className="scanify-expand-input">
                        <input
                          className="scanifyAiDemo-input"
                          placeholder="Please specify your ERP / accounting software..."
                          value={form.erp_platform_other}
                          onChange={(e) => set("erp_platform_other", e.target.value)}
                        />
                      </div>
                    )}

                    <div className="scanify-comment-field-wrap">
                      <label className="scanify-subfield-label">
                        Integration Preferences & ERP Details (Comment):
                      </label>
                      <input
                        className="scanifyAiDemo-input"
                        placeholder="e.g. Direct REST API integration, BAPI / RFC for SAP, automated Excel batch upload, middleware webhook..."
                        value={form.erp_comment}
                        onChange={(e) => set("erp_comment", e.target.value)}
                      />
                    </div>
                  </Field>
                </div>
              </RequirementSection>

              {/* ──────────────── 6. Workflow & Approval ──────────────── */}
              <RequirementSection
                number="06"
                title="Workflow & Approval Orchestration"
                subtitle="Select your required workflow routing, review gates, and escalation protocols."
                icon="🔀"
              >
                <div className="scanify-workflow-btn-grid">
                  {/* Button 1: Approval Workflow */}
                  <div
                    className={`scanify-wf-card ${form.workflow_approval_enabled ? "active" : ""}`}
                    onClick={() => set("workflow_approval_enabled", !form.workflow_approval_enabled)}
                  >
                    <div className="scanify-wf-header">
                      <div className="scanify-wf-icon-wrap">🛡️</div>
                      <div className="scanify-toggle-pill">
                        {form.workflow_approval_enabled ? "Enabled ✓" : "+ Enable"}
                      </div>
                    </div>
                    <div className="scanify-wf-title">Approval Workflow</div>
                    <p className="scanify-wf-desc">
                      Multi-tier role & threshold-based review gates before final ERP data posting.
                    </p>
                  </div>

                  {/* Button 2: Exception Routing */}
                  <div
                    className={`scanify-wf-card ${form.exception_routing_enabled ? "active" : ""}`}
                    onClick={() => set("exception_routing_enabled", !form.exception_routing_enabled)}
                  >
                    <div className="scanify-wf-header">
                      <div className="scanify-wf-icon-wrap">⚠️</div>
                      <div className="scanify-toggle-pill">
                        {form.exception_routing_enabled ? "Enabled ✓" : "+ Enable"}
                      </div>
                    </div>
                    <div className="scanify-wf-title">Exception Routing</div>
                    <p className="scanify-wf-desc">
                      Automated quarantine & routing of mismatched or low-confidence data to domain specialists.
                    </p>
                  </div>

                  {/* Button 3: Escalation Process */}
                  <div
                    className={`scanify-wf-card ${form.escalation_process_enabled ? "active" : ""}`}
                    onClick={() => set("escalation_process_enabled", !form.escalation_process_enabled)}
                  >
                    <div className="scanify-wf-header">
                      <div className="scanify-wf-icon-wrap">⏱️</div>
                      <div className="scanify-toggle-pill">
                        {form.escalation_process_enabled ? "Enabled ✓" : "+ Enable"}
                      </div>
                    </div>
                    <div className="scanify-wf-title">Escalation Process</div>
                    <p className="scanify-wf-desc">
                      SLA-driven auto-reminders and manager escalations for delayed approvals.
                    </p>
                  </div>
                </div>

                <div className="scanify-comment-field-wrap">
                  <label className="scanify-subfield-label">
                    Workflow & Routing Specifications (Optional Comment):
                  </label>
                  <input
                    className="scanifyAiDemo-input"
                    placeholder="e.g. Invoices > $10,000 need CFO approval; PO mismatch routes to procurement manager..."
                    value={form.workflow_notes}
                    onChange={(e) => set("workflow_notes", e.target.value)}
                  />
                </div>
              </RequirementSection>

              {/* ──────────────── 7. Deployment & Infrastructure ──────────────── */}
              <RequirementSection
                number="07"
                title="Deployment & Infrastructure"
                subtitle="Select your preferred hosting architecture and data compliance model."
                icon="☁️"
              >
                <Field label="Deployment Model – Preferred deployment: cloud, on-premise, or hybrid?" required>
                  <div className="scanify-card-grid-3">
                    {[
                      {
                        id: "Cloud (SaaS / Managed Cloud)",
                        title: "Cloud (SaaS / Dedicated)",
                        desc: "High availability, auto-scaling, regular AI model updates, zero infrastructure maintenance.",
                        icon: "☁️",
                        badge: "Fastest Setup"
                      },
                      {
                        id: "On-Premise",
                        title: "On-Premise Enterprise",
                        desc: "Deployed directly within your corporate data center or isolated virtual private cloud (VPC).",
                        icon: "🏢",
                        badge: "Air-Gapped"
                      },
                      {
                        id: "Hybrid Deployment",
                        title: "Hybrid Deployment",
                        desc: "Local document pre-processing and OCR at edge with centralized cloud AI orchestration.",
                        icon: "🔀",
                        badge: "Flexible"
                      }
                    ].map((item) => {
                      const isSelected = form.deployment_model === item.id;
                      return (
                        <div
                          key={item.id}
                          className={`scanify-selection-card ${isSelected ? "active" : ""}`}
                          onClick={() => set("deployment_model", item.id)}
                        >
                          <div className="scanify-card-top">
                            <span className="scanify-card-icon">{item.icon}</span>
                            <span className="scanify-mini-badge">{item.badge}</span>
                          </div>
                          <div className="scanify-card-title">{item.title}</div>
                          <div className="scanify-card-desc">{item.desc}</div>
                          <div className="scanify-selection-footer">
                            <span className="scanify-select-text">
                              {isSelected ? "Selected Model ✓" : "Choose Model"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="scanify-comment-field-wrap">
                    <label className="scanify-subfield-label">
                      Security, Compliance & Hosting Notes (Optional Comment):
                    </label>
                    <input
                      className="scanifyAiDemo-input"
                      placeholder="e.g. AWS Mumbai region preferred, SOC2 compliance required, VPN tunnel connectivity..."
                      value={form.deployment_comment}
                      onChange={(e) => set("deployment_comment", e.target.value)}
                    />
                  </div>
                </Field>
              </RequirementSection>

              {/* ──────────────── 8. Reporting & Analytics ──────────────── */}
              <RequirementSection
                number="08"
                title="Reporting & Analytics"
                subtitle="Enable operational intelligence, throughput auditing, and executive dashboards."
                icon="📈"
              >
                <div className="scanify-toggle-row">
                  {/* Reporting Checkbox Card */}
                  <div className={`scanify-toggle-card ${form.reporting_enabled ? "active" : ""}`}>
                    <label className="scanify-toggle-label">
                      <input
                        type="checkbox"
                        checked={form.reporting_enabled}
                        onChange={(e) => set("reporting_enabled", e.target.checked)}
                      />
                      <div className="scanify-toggle-text-group">
                        <span className="scanify-toggle-main-title">
                          📊 Operational & Audit Reporting
                        </span>
                        <span className="scanify-toggle-sub-title">
                          Document throughput logs, audit trails, processing time breakdowns, and operator statistics.
                        </span>
                      </div>
                    </label>

                    {form.reporting_enabled && (
                      <div className="scanify-expand-comment">
                        <label className="scanify-subfield-label">
                          Reporting Requirements (Comment):
                        </label>
                        <input
                          className="scanifyAiDemo-input"
                          placeholder="e.g. Daily CSV summary by vendor, Excel processing logs, monthly department cost report..."
                          value={form.reporting_comment}
                          onChange={(e) => set("reporting_comment", e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  {/* KPI Tracking Checkbox Card */}
                  <div className={`scanify-toggle-card ${form.kpi_tracking_enabled ? "active" : ""}`}>
                    <label className="scanify-toggle-label">
                      <input
                        type="checkbox"
                        checked={form.kpi_tracking_enabled}
                        onChange={(e) => set("kpi_tracking_enabled", e.target.checked)}
                      />
                      <div className="scanify-toggle-text-group">
                        <span className="scanify-toggle-main-title">
                          🎯 Real-Time KPI Tracking & Metrics
                        </span>
                        <span className="scanify-toggle-sub-title">
                          Live Straight-Through Processing (STP) %, extraction precision rates, cost savings, and SLA counters.
                        </span>
                      </div>
                    </label>

                    {form.kpi_tracking_enabled && (
                      <div className="scanify-expand-comment">
                        <label className="scanify-subfield-label">
                          KPI Tracking & Dashboard Requirements (Comment):
                        </label>
                        <input
                          className="scanifyAiDemo-input"
                          placeholder="e.g. Track STP rate > 90%, invoice cycle time reduction metric, cost per invoice processed..."
                          value={form.kpi_tracking_comment}
                          onChange={(e) => set("kpi_tracking_comment", e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </RequirementSection>
            </div>
          )}

          {/* ══════════ FORM FOOTER / ACTIONS ══════════ */}
          <div className="scanifyAiDemo-form-footer">
            <div className="scanifyAiDemo-footer-l">
              {step > 1 && (
                <button type="button" className="scanifyAiDemo-btn-ghost" onClick={prev}>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M10 3L5 7.5L10 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back to Contact
                </button>
              )}
            </div>
            <div className="scanifyAiDemo-footer-r">
              {step === 1 ? (
                <button type="button" className="scanifyAiDemo-btn-primary" onClick={next}>
                  Continue to Requirements
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M5 3l5 4.5L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ) : (
                <div className="scanifyAiDemo-submit-row">
                  <button
                    type="button"
                    className="scanifyAiDemo-btn-primary scanify-submit-btn"
                    onClick={submit}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="scanifyAiDemo-spinner" /> Submitting Requirements...
                      </>
                    ) : (
                      <>
                        Submit Requirements & Book Demo
                        <svg width="16" height="16" viewBox="0 0 15 15" fill="none">
                          <path d="M5 3l5 4.5L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="scanifyAiDemo-copyright">
            © 2026 Kodivian Technologies · Enterprise AI Document Solutions · All rights reserved
          </p>
        </main>
      </div>

      {/* ── VALIDATION POPUP MODAL ── */}
      {validationModal.open && (
        <div className="scanify-modal-backdrop" onClick={closeModalAndScroll}>
          <div className="scanify-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="scanify-modal-header">
              <div className="scanify-modal-icon-badge">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div className="scanify-modal-head-text">
                <h3 className="scanify-modal-title">{validationModal.title}</h3>
                <p className="scanify-modal-subtitle">Please complete the required items below to proceed:</p>
              </div>
            </div>

            <div className="scanify-modal-body">
              <div className="scanify-modal-err-list">
                {validationModal.errors.map((err, idx) => (
                  <div key={idx} className="scanify-modal-err-item">
                    <span className="scanify-modal-err-sec">{err.sec}</span>
                    <div className="scanify-modal-err-text">
                      <p className="scanify-modal-err-name">{err.name}</p>
                      <p className="scanify-modal-err-desc">{err.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="scanify-modal-footer">
              <button
                type="button"
                className="scanifyAiDemo-btn-primary scanify-modal-btn"
                onClick={closeModalAndScroll}
              >
                Complete Required Fields
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}