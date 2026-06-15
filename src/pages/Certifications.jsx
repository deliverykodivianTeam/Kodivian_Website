import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Award, FileText, CheckCircle } from "lucide-react";
import "../styles/Certifications.css";

// SVG Badges for premium enterprise styling
export const ISO9001Badge = ({ className = "cert-badge-icon" }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="50" r="46" fill="#f9f5e8" stroke="#d4af37" strokeWidth="4" />
    <circle cx="50" cy="50" r="40" fill="none" stroke="#d4af37" strokeWidth="1" strokeDasharray="3 3" />
    <path d="M50 8 A42 42 0 0 1 92 50 A42 42 0 0 1 50 92 A42 42 0 0 1 8 50 A42 42 0 0 1 50 8" fill="none" id="curve-9001" />
    <text fill="#8a2be2" fontSize="6.8" fontWeight="bold" letterSpacing="0.8">
      <textPath href="#curve-9001" startOffset="50%" textAnchor="middle">
        ISO 9001:2015 • QUALITY MANAGEMENT
      </textPath>
    </text>
    <g transform="translate(30, 32)">
      <path d="M20 5 L5 20 L0 15" fill="none" stroke="#d4af37" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <text x="50" y="68" fill="#111" fontSize="9" fontWeight="bold" textAnchor="middle">KODIVIAN</text>
    <text x="50" y="78" fill="#c59b27" fontSize="7" fontWeight="bold" textAnchor="middle">QMS CERTIFIED</text>
  </svg>
);

export const ISO27001Badge = ({ className = "cert-badge-icon" }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <polygon points="50,4 93,25 93,75 50,96 7,75 7,25" fill="#eef1f6" stroke="#1d3557" strokeWidth="4" />
    <path d="M50 8 L87 27 L87 73 L50 92 L13 73 L13 27 Z" fill="none" stroke="#1d3557" strokeWidth="1" strokeDasharray="2 2" />
    <g transform="translate(38, 28)" stroke="#1d3557" strokeWidth="2.5" fill="none">
      <rect x="0" y="10" width="24" height="18" rx="3" fill="#1d3557" />
      <path d="M6 10 V6 A6 6 0 0 1 18 6 V10" />
      <circle cx="12" cy="18" r="2" fill="#fff" />
    </g>
    <text x="50" y="68" fill="#111" fontSize="9" fontWeight="bold" textAnchor="middle">KODIVIAN</text>
    <text x="50" y="78" fill="#1d3557" fontSize="7" fontWeight="bold" textAnchor="middle">ISO 27001 ISMS</text>
  </svg>
);

const Certifications = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="iso-detail-hero iso-27001-hero py-5 mt-0 text-white text-center">
        <div className="iso-hero-shapes">
          <div className="iso-shape iso-shape-1" />
          <div className="iso-shape iso-shape-2" />
        </div>
        <Container className="py-5">
          <Row className="justify-content-center text-center">
            <Col lg={8} md={10}>
              <div className="iso-hero-tag">Compliance & Standards</div>
              <h1 className="display-4 fw-bold mb-3">Certifications & Compliance</h1>
              <p className="lead opacity-9">
                Demonstrating our commitment to world-class standards in quality management, information security, and technical excellence.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Cards List Section */}
      <Container className="py-5">
        <Row className="justify-content-center g-4 py-4">
          <Col lg={5} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-100"
            >
              <div className="certification-card iso-9001">
                <div>
                  <Link to="/certifications/iso-9001">
                    <div className="cert-badge-wrapper">
                      <ISO9001Badge />
                    </div>
                  </Link>
                  <div className="cert-card-subtitle">ISO 9001:2015</div>
                  <h3 className="cert-card-title">Quality Management System</h3>
                  <p className="cert-card-desc">
                    Globally recognized standard confirming our commitment to quality excellence, consistent service delivery, process optimization, and operational efficiency.
                  </p>
                </div>
                <Link to="/certifications/iso-9001" className="cert-card-btn text-decoration-none">
                  View Details
                </Link>
              </div>
            </motion.div>
          </Col>

          <Col lg={5} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-100"
            >
              <div className="certification-card iso-27001">
                <div>
                  <Link to="/certifications/iso-27001">
                    <div className="cert-badge-wrapper">
                      <ISO27001Badge />
                    </div>
                  </Link>
                  <div className="cert-card-subtitle">ISO/IEC 27001:2022</div>
                  <h3 className="cert-card-title">Information Security Management</h3>
                  <p className="cert-card-desc">
                    The international gold standard for cybersecurity resilience, information security governance, robust risk management controls, and customer data protection.
                  </p>
                </div>
                <Link to="/certifications/iso-27001" className="cert-card-btn text-decoration-none">
                  View Details
                </Link>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Compliance Framework Overview */}
      <Container className="py-5 border-top border-light">
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <div className="pe-lg-4">
              <h2 className="display-6 fw-bold mb-4">Enterprise-Grade Standards Built In</h2>
              <p className="text-muted mb-4">
                At Kodivian Technologies, compliance is not an afterthought—it's part of our DNA. Our systems, products (Scanify, Process Builder, Support Forge), and consulting methodologies are engineered around the principles of these certifications.
              </p>
              
              <div className="d-flex align-items-start gap-3 mb-3">
                <div className="p-2 rounded bg-light-purple text-violet-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Rigorous Security Governance</h5>
                  <p className="text-muted small mb-0">Our operations adhere to strict security policies, ensuring absolute integrity, confidentiality, and availability of client information assets.</p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3">
                <div className="p-2 rounded bg-light-purple text-violet-600">
                  <Award size={24} />
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Continual Quality Improvement</h5>
                  <p className="text-muted small mb-0">We use systematic metrics, automated monitoring, and standardized procedures to deliver superior software products and IT services.</p>
                </div>
              </div>
            </div>
          </Col>
          
          <Col lg={6}>
            <div className="commitment-section">
              <div className="commitment-content">
                <h3 className="fw-bold text-violet mb-3">Our Commitment to Excellence</h3>
                <p className="mb-0 text-dark" style={{ lineHeight: "1.7", fontSize: "1.05rem" }}>
                  Our internationally recognized certifications reflect our unwavering commitment to quality, security, innovation, operational excellence, and customer trust. By adhering to globally accepted standards, we ensure that our clients receive reliable, secure, scalable, and high-quality technology solutions.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Certifications;
