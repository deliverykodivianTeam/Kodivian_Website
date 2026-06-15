import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Key,
  AlertTriangle,
  EyeOff,
  CheckSquare,
  Activity,
  Code,
  UserCheck,
  Zap,
  RefreshCw,
  FileCheck
} from "lucide-react";
import { ISO27001Badge } from "./Certifications";
import iso27001Cert from "../assets/temp_cert2.jpg";
import "../styles/Certifications.css";

// SVG Accreditation and Seal Assets for High Fidelity Replica
const WaxSeal = () => (
  <svg viewBox="0 0 100 100" className="seal-graphic">
    <path d="M40 70 L35 95 L50 85 L65 95 L60 70" fill="#a31d1d" opacity="0.85" />
    <path d="M50 70 L48 97 L53 97 L50 70" fill="#7a1414" />
    <circle cx="50" cy="50" r="38" fill="#b22222" filter="drop-shadow(1px 2px 3px rgba(0,0,0,0.3))" />
    <circle cx="50" cy="50" r="35" fill="none" stroke="#a31d1d" strokeWidth="1" />
    <path d="M 50 12 A 38 38 0 0 1 85 35 A 38 38 0 0 1 80 65 A 38 38 0 0 1 50 88 A 38 38 0 0 1 15 60 A 38 38 0 0 1 50 12"
      fill="none" stroke="#8b0000" strokeWidth="2" strokeDasharray="5 2" />
    <circle cx="50" cy="50" r="28" fill="#8b0000" />
    <circle cx="50" cy="50" r="26" fill="none" stroke="#ff4d4d" strokeWidth="0.5" opacity="0.4" />
    <text x="50" y="44" fill="#ffb3b3" fontSize="6.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">APPROVED</text>
    <text x="50" y="53" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" letterSpacing="1">MMS</text>
    <text x="50" y="62" fill="#ffb3b3" fontSize="5.5" fontWeight="bold" textAnchor="middle">ISMS SEAL</text>
  </svg>
);

const MmsLogo = () => (
  <svg viewBox="0 0 120 50" className="cert-footer-logo-item">
    <path d="M10 35 C 10 20, 25 15, 35 25 C 45 35, 55 35, 60 25" fill="none" stroke="#1d3557" strokeWidth="4" strokeLinecap="round" />
    <path d="M25 40 C 25 25, 40 20, 50 30 C 60 40, 70 40, 75 30" fill="none" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" />
    <text x="78" y="27" fill="#1d3557" fontSize="16" fontWeight="bold" fontFamily="sans-serif">mms</text>
    <text x="78" y="38" fill="#777" fontSize="8" fontFamily="sans-serif">Certification</text>
  </svg>
);

const EgacLogo = () => (
  <svg viewBox="0 0 120 50" className="cert-footer-logo-item">
    <rect x="2" y="2" width="116" height="46" rx="4" fill="none" stroke="#111" strokeWidth="1.5" />
    <text x="10" y="20" fill="#111" fontSize="12" fontWeight="bold" fontFamily="sans-serif">EGAC</text>
    <text x="10" y="32" fill="#333" fontSize="7" fontWeight="bold" fontFamily="sans-serif">Accredited</text>
    <text x="10" y="40" fill="#1d3557" fontSize="6" fontFamily="sans-serif">ISMS Certification</text>
    <line x1="75" y1="5" x2="75" y2="45" stroke="#111" strokeWidth="1" />
    <text x="80" y="22" fill="#111" fontSize="6" fontWeight="bold" fontFamily="sans-serif">CAB#011805</text>
  </svg>
);

const IafLogo = () => (
  <svg viewBox="0 0 100 50" className="cert-footer-logo-item">
    <ellipse cx="50" cy="25" rx="35" ry="20" fill="#1d3557" />
    <ellipse cx="50" cy="25" rx="33" ry="18" fill="none" stroke="#ffffff" strokeWidth="1" />
    <text x="50" y="31" fill="#ffffff" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif" letterSpacing="1">IAF</text>
    <path d="M22 25 H78" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
    <path d="M50 8 V42" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
  </svg>
);

const QrCode = () => (
  <div className="cert-qr-box">
    <svg viewBox="0 0 100 100" className="cert-qr-code">
      <rect x="0" y="0" width="100" height="100" fill="#fff" />
      <rect x="10" y="10" width="25" height="25" fill="#111" />
      <rect x="15" y="15" width="15" height="15" fill="#fff" />
      <rect x="18" y="18" width="9" height="9" fill="#111" />
      <rect x="65" y="10" width="25" height="25" fill="#111" />
      <rect x="70" y="15" width="15" height="15" fill="#fff" />
      <rect x="73" y="18" width="9" height="9" fill="#111" />
      <rect x="10" y="65" width="25" height="25" fill="#111" />
      <rect x="15" y="70" width="15" height="15" fill="#fff" />
      <rect x="18" y="73" width="9" height="9" fill="#111" />
      <rect x="42" y="12" width="6" height="6" fill="#111" />
      <rect x="52" y="18" width="6" height="6" fill="#111" />
      <rect x="48" y="28" width="6" height="6" fill="#111" />
      <rect x="40" y="40" width="6" height="6" fill="#111" />
      <rect x="55" y="42" width="6" height="6" fill="#111" />
      <rect x="45" y="52" width="6" height="6" fill="#111" />
      <rect x="12" y="45" width="6" height="6" fill="#111" />
      <rect x="22" y="52" width="6" height="6" fill="#111" />
      <rect x="48" y="68" width="6" height="6" fill="#111" />
      <rect x="58" y="75" width="6" height="6" fill="#111" />
      <rect x="72" y="45" width="6" height="6" fill="#111" />
      <rect x="80" y="52" width="6" height="6" fill="#111" />
      <rect x="68" y="68" width="6" height="6" fill="#111" />
      <rect x="85" y="78" width="6" height="6" fill="#111" />
      <rect x="12" y="40" width="2" height="2" fill="#111" />
      <rect x="22" y="40" width="2" height="2" fill="#111" />
      <rect x="32" y="40" width="2" height="2" fill="#111" />
      <rect x="40" y="12" width="2" height="2" fill="#111" />
      <rect x="40" y="22" width="2" height="2" fill="#111" />
      <rect x="40" y="32" width="2" height="2" fill="#111" />
    </svg>
    <span>Scan to Verify</span>
  </div>
);

const Iso27001 = () => {
  const [showCertificate, setShowCertificate] = useState(false);

  const benefits = [
    {
      title: "Information Security",
      desc: "Comprehensive protection of critical business information from advanced digital hazards and unauthorized access.",
      icon: <Lock size={24} />,
    },
    {
      title: "Data Protection",
      desc: "Robust encryption, safe backups, and data access controls that guard customer records and digital products.",
      icon: <ShieldCheck size={24} />,
    },
    {
      title: "Risk Reduction",
      desc: "Systematic assessments and preemptive protocols that evaluate business risks, reducing the likelihood of data breaches.",
      icon: <AlertTriangle size={24} />,
    },
    {
      title: "Compliance Assurance",
      desc: "Continuous compliance audits ensuring alignment with global cybersecurity frameworks and data privacy standards.",
      icon: <CheckSquare size={24} />,
    },
    {
      title: "Business Continuity",
      desc: "Incident recovery systems and redundant backups that keep critical operations online during disruptions.",
      icon: <RefreshCw size={24} />,
    },
    {
      title: "Customer Trust",
      desc: "Tangible, accredited proof of our focus on cyber defense, strengthening relationships with enterprise partners.",
      icon: <UserCheck size={24} />,
    },
  ];

  const details = [
    {
      title: "Information Security Governance",
      content: "At Kodivian Technologies, we maintain a robust Information Security Governance framework. This aligns cybersecurity strategies with corporate objectives, defining clear lines of responsibility, asset ownership, security leadership, and policy audits.",
    },

    {
      title: "Risk Assessment Methodology",
      content: "We implement a continuous risk assessment methodology that identifies vulnerabilities, evaluates threat impacts, and assigns risk indices. This data enables us to prioritize resource allocation for immediate threat mitigation.",
    },
    {
      title: "Data Protection Controls",
      content: "Kodivian secures client data at rest, in transit, and during computation. We employ advanced AES-256 encryption, hashing standards, virtual private networks (VPNs), and secure secure-token exchange frameworks to protect data integrity.",
    },
    {
      title: "Confidentiality Management",
      content: "We enforce strict confidentiality standards through rigorous non-disclosure agreements, clean-desk policies, data masking, and information isolation boundaries between client staging areas.",
    },
    {
      title: "Integrity Assurance",
      content: "To guarantee data remains unaltered, we enforce checksum verifications, transactional logging, file-integrity monitoring, and role-restricted database writing operations across all products.",
    },


  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="iso-detail-hero iso-27001-hero mt-0 text-white">
        <div className="iso-hero-shapes">
          <div className="iso-shape iso-shape-1" />
          <div className="iso-shape iso-shape-2" />
        </div>
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={7}>
              <div className="iso-hero-tag">ISO/IEC 27001:2022 CERTIFIED</div>
              <h1 className="iso-hero-title">Information Security Management Certification</h1>
              <p className="iso-hero-subtitle">
                Ensuring the highest standards of information security, cybersecurity resilience, data protection, and risk management.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Button
                  onClick={() => setShowCertificate(!showCertificate)}
                  variant="outline-light"
                  className="px-4 py-2 rounded-pill fw-bold"
                  style={{ border: "2px solid #ffffff" }}
                >
                  {showCertificate ? "Show Details Overview" : "View Interactive Certificate"}
                </Button>
              </div>
            </Col>
            <Col lg={5} className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="hero-cert-badge"
              >
                <ISO27001Badge className="w-75 h-75 mb-3" />
                <h5 className="mb-1 text-white fw-bold">Certificate Number</h5>
                <p className="mb-0 text-info fw-bold font-monospace">26MEQVA98</p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content Area Toggle */}
      {showCertificate ? (
        /* Certificate Viewer Component */
        <Container className="py-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Official Registration Certificate</h2>
            <p className="text-muted">Digital high-fidelity verification of Kodivian Technologies LLP ISO/IEC 27001:2022 certification.</p>
          </div>
          <div className="certificate-viewer-container">
            <div className="certificate-paper iso-27001-paper">
              <img
                src={iso27001Cert}
                alt="ISO 27001 Certificate"
                className="img-fluid w-100 h-auto"
                style={{ borderRadius: "4px" }}
              />
            </div>
          </div>
        </Container>
      ) : (
        /* Standard Rich Info Layout */
        <>
          {/* Key Benefits */}
          <Container className="py-5">
            <div className="text-center mb-5">
              <h2 className="display-6 fw-bold">Key Benefits of Certification</h2>
              <div className="section-heading-under" />
              <p className="text-muted max-w-2xl mx-auto">
                Earning this status shows our clients, auditors, and partners that we take cybersecurity defense and privacy preservation extremely seriously.
              </p>
            </div>
            <Row className="g-4">
              {benefits.map((b, i) => (
                <Col lg={4} md={6} key={i}>
                  <div className="benefit-card iso-27001-benefit">
                    <div className="benefit-icon-box">
                      {b.icon}
                    </div>
                    <h4 className="benefit-title">{b.title}</h4>
                    <p className="benefit-text">{b.desc}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>

          {/* Detailed Content */}
          <div className="content-rich-section py-5 bg-light">
            <Container>
              <Row className="g-5">
                <Col lg={8}>
                  <h2 className="display-6 fw-bold mb-4">Security Governance & Framework</h2>
                  <p className="lead text-muted mb-4">
                    Kodivian Technologies deploys a highly systematic, layered compliance shield to block security threats.
                  </p>

                  {details.map((d, i) => (
                    <div key={i} className="mb-4 pb-3 border-bottom border-light">
                      <h4 className="fw-bold text-violet mb-2" style={{ fontSize: "1.25rem" }}>
                        {i + 1}. {d.title}
                      </h4>
                      <p className="text-muted" style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                        {d.content}
                      </p>
                    </div>
                  ))}
                </Col>

                <Col lg={4}>
                  <div className="content-sidebar-card">
                    <h4 className="sidebar-title">Information Security Controls</h4>
                    <ul className="sidebar-list">
                      <li className="sidebar-list-item">
                        <Key size={20} />
                        <div>
                          <strong>Access Governance</strong>
                          <div className="text-muted small">Multi-Factor Authentication (MFA) and Least-Privilege access.</div>
                        </div>
                      </li>
                      <li className="sidebar-list-item">
                        <Code size={20} />
                        <div>
                          <strong>Secure DevOps</strong>
                          <div className="text-muted small">CI/CD pipelines with integrated code scanning tools.</div>
                        </div>
                      </li>
                      <li className="sidebar-list-item">
                        <EyeOff size={20} />
                        <div>
                          <strong>Data Encryption</strong>
                          <div className="text-muted small">AES-256 standard and active cryptographic key rotations.</div>
                        </div>
                      </li>
                      <li className="sidebar-list-item">
                        <Activity size={20} />
                        <div>
                          <strong>Vulnerability Auditing</strong>
                          <div className="text-muted small">Regular internal penetration tests and firewall audits.</div>
                        </div>
                      </li>
                    </ul>

                    <div className="mt-4 pt-4 border-top border-light text-center">
                      <h6 className="fw-bold mb-1 text-muted text-uppercase" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>Accredited By</h6>
                      <div className="d-flex justify-content-center gap-3 align-items-center mt-2">
                        <MmsLogo />
                        <EgacLogo />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>

          {/* Why It Matters */}
          <Container className="py-5 my-4">
            <div className="commitment-section">
              <div className="commitment-content text-center max-w-3xl mx-auto">
                <h2 className="display-6 fw-bold mb-3">Our Commitment to Excellence</h2>
                <p className="lead mb-0 text-dark" style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
                  Our internationally recognized certifications reflect our unwavering commitment to quality, security, innovation, operational excellence, and customer trust. By adhering to globally accepted standards, we ensure that our clients receive reliable, secure, scalable, and high-quality technology solutions.
                </p>
              </div>
            </div>
          </Container>
        </>
      )}
    </div>
  );
};

export default Iso27001;
