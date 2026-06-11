import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Button,
    Image,
    Accordion,
    Form,
    Card
} from 'react-bootstrap';
import {
    FaFileInvoiceDollar,
    FaDownload,
    FaExchangeAlt,
    FaNetworkWired,
    FaTasks,
    FaCloudUploadAlt,
} from "react-icons/fa";

import DemoBookingPopup from '../components/DemoBookingPopup';
import invoiceImage from "../assets/image-invoice.png";
import ocrFunctionsImage from '../assets/ocrFunctions.png';
import scannerImage from '../assets/Scannerimage.png';

// ERP Integration Logos
import quickbooksLogo from "../assets/QuickBooks.webp";
import sageLogo from "../assets/Sage_X3.webp";
import sapLogo from "../assets/SAP.png";
import sysproLogo from "../assets/SYSPRO.webp";

// New Integration Images
import img1 from "../assets/image-1.jpeg";
import img2 from "../assets/image-2.jpeg";
import img3 from "../assets/image -7.png";

import img4 from "../assets/image -6.png";

import img5 from "../assets/image-5.jpeg";





// Import your custom CSS for the violet-black theme
import '../styles/Scanify.css';
import { AlignCenter } from 'lucide-react';

const faqData = [
    {
        question: 'What file types can I upload to Scanify?',
        answer: 'You can upload PDFs, images (JPEG, PNG), and scanned invoice documents directly from your desktop and cloud storage services.',
    },
    {
        question: 'Can I upload multiple invoices at once?',
        answer: 'Yes! Our Invoice Processing allows you to upload and manage multiple invoices in a single batch.',
    },
    {
        question: 'Is the invoice data extraction accurate?',
        answer: 'Yes, Scanify uses advanced OCR and AI models to ensure high accuracy, even with multi-language support.',
    },
    {
        question: 'Does Scanify support automatic data transfer to ERP platforms?',
        answer: 'Yes, invoice data can be automatically pushed to your ERP system, eliminating manual entry and saving time.',
    },
    {
        question: 'What can I do from the dashboard?',
        answer: 'You can upload, view, manage, approve, and export invoices, monitor batch status, and initiate ERP data pushes—all from one smart dashboard.',
    },
];

const ScanifyDetail = () => {
    const navigate = useNavigate();
    const [isQueryOpen, setIsQueryOpen] = useState(false);
    const [queryText, setQueryText] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [showImageHighlight, setShowImageHighlight] = useState(false);
    const [currency, setCurrency] = useState("INR");
    const [invoices, setInvoices] = useState(500);
    const [costPerInvoice, setCostPerInvoice] = useState(50);
    const [processingTime, setProcessingTime] = useState(50);

    // ROI calculation
    const exchangeRate = currency === "USD" ? 0.012 : 1;

    const monthlySavings =
        invoices * costPerInvoice * exchangeRate * (processingTime / 100) * 0.9;

    const yearlySavings = monthlySavings * 12;

    const closeQueryBox = () => setIsQueryOpen(false);
    const openQueryBox = () => { setIsQueryOpen(true); };

    const handleQueryChange = (event) => {
        setQueryText(event.target.value);
    };

    const handleSendQuery = async () => {
        if (!queryText.trim()) {
            alert("Please enter your query.");
            return;
        }

        try {
            const response = await fetch("https://kodivian-website-7.onrender.com/send_query", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: userName,
                    email: userEmail,
                    phone: userPhone,


                    query: queryText,
                    page: "Scanify"
                }),
            });

            const data = await response.json(); // 👈 IMPORTANT LINE

            if (response.ok) {
                alert("Query sent successfully. Our team will contact you.");
                setQueryText("");
                setIsQueryOpen(false);
            } else {
                alert(data.error || "Something went wrong");
            }
        } catch (error) {
            console.error(error);
            alert("Server not reachable");
        }
    };



    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleInsightClick = () => {
        setShowImageHighlight(true);
        setTimeout(() => setShowImageHighlight(false), 1000); // Reset after animation
    };

    return (
        <div className="scanify-page-scan">

            {/* Secondary Hero Section */}
            <Container className="hero-secondary-scan text-center py-5">
                <h3 className="secondary-tagline-scan violet-text pt-5 fw-bold mb-2">Comprehensive</h3>
                <h1 className="secondary-heading-scan display-3 fw-bold mb-4">
                    Smart Invoice / Purchase Order / Payment Advice  Extraction Platform Starts with SCANIFY AI
                </h1>
                <p className="secondary-description-scan grey-text lead mx-auto" style={{ maxWidth: '800px' }}>
                    Effortlessly streamline your document workflow with advanced OCR extraction, seamless SAP integration, and JSON-based invoice data.
                </p>
            </Container>

            {/* Hero Section */}
            <Container fluid className="scanify-hero-scan py-5">
                <Row className="align-items-center justify-content-center">
                    <Col lg={6} className="hero-left-scan text-center text-lg-start mb-4 mb-lg-0 px-4 px-lg-5">
                        <div className="tagline-container-scan mb-4">
                            <Button
                                variant="outline-dark"
                                className="tagline-button-scan rounded-pill px-4 py-2"
                                onClick={handleInsightClick}
                            >
                                Introducing our Insights <span className="ms-2">→</span>
                            </Button>
                        </div>
                        <h2 className="hero-subheading-scan display-4 fw-bold mb-4">
                            Conquering Your Invoicing Challenges
                        </h2>
                        <p className="hero-description-scan grey-text lead mb-5">
                            Customize your business journey effortlessly with our dashboard backed by a suite of powerful tools at your fingertips.
                        </p>
                        <div className="hero-buttons-scan d-flex flex-column flex-md-row justify-content-center justify-content-lg-start gap-4 mb-5">
                            <Button variant="primary" size="lg" className="get-started-button-scan rounded-pill px-5 py-3" onClick={() => navigate('/scanify-booking')}>
                                Get Started a demo
                            </Button>
                            <DemoBookingPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
                            <Button
                                variant="outline-light"
                                size="lg"
                                className="how-it-works-button-scan rounded-pill px-5 py-3"
                                onClick={() => navigate('/scanify-booking')}
                            >
                                How it works <span className="ms-2">→</span>
                            </Button>

                        </div>
                        <p className="trust-message-scan grey-text">
                            Trusted by <span className="violet-text">50,000+</span> businesses to scale outbound
                        </p>
                    </Col>

                    <Col lg={6} className="hero-right-scan d-flex align-items-center justify-content-center">
                        <Image
                            src={invoiceImage}
                            alt="Invoice"
                            fluid
                            className={`invoice-image-scan rounded-4 shadow-lg ${showImageHighlight ? 'invoice-image-active' : ''}`}
                        />
                    </Col>
                </Row>
            </Container>

            {/* Extractable Fields Section */}
            <Container fluid className="extractable-fields-section-scan py-5">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={5} className="extractable-fields-image-container-scan text-center mb-5 mb-lg-0">
                            <Image src={scannerImage} alt="Scanner" fluid className="extractable-fields-image-scan rounded-4 shadow-lg" />
                        </Col>
                        <Col lg={7} className="extractable-fields-details-scan px-4 px-lg-5">
                            <Row>
                                {[
                                    {
                                        title: "Vendor Detail",
                                        fields: ["Tax ID", "Vendor Name", "Company name", "Address", "Contact", "Vendor GST", "Bank Detail"]
                                    },
                                    {
                                        title: "Customer Detail",
                                        fields: ["Tax ID", "Vendor Name", "Company name", "Address", "Contact", "Vendor GST", "Bank Detail"]
                                    },
                                    {
                                        title: "Invoice Detail",
                                        fields: ["Invoice Number", "Date", "Due Date", "PO Number", "Total", "Currency", "SubTotal", "Tax"]
                                    },
                                    {
                                        title: "Line Item",
                                        fields: ["Description", "Item Coder", "Quantity", "Unit Price", "Product Code", "Tax Rate", "Line Total", "CGST"]
                                    }
                                ].map((group, idx) => (
                                    <Col md={6} key={idx} className="flat-fields-group-scan mb-4">
                                        <h3 className="mb-3 violet-text">{group.title}</h3>
                                        <div className="pill-buttons-container-scan d-flex flex-wrap gap-2">
                                            {group.fields.map((field, fIdx) => (
                                                <Button key={fIdx} variant="outline-dark" className="pill-button-scan rounded-pill px-3 py-1">
                                                    <span className="checkmark-scan me-1">✓</span> {field}
                                                </Button>
                                            ))}
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>

            {/* OCR Functions Section */}
            <Container
                className="ocr-functions-section-scan py-5"
                id="scanFunctionSection"
            >

                <h2 className="ocr-functions-heading-scan display-4 fw-bold violet-text text-center mb-5 mt-5">
                    Core Functions of OCR in Invoice Processing with SCANIFY
                </h2>
                <Row className="align-items-center">
                    <Col lg={6} className="ocr-functions-text-scan px-4 px-lg-5">
                        <ul className="list-unstyled">
                            <li className="mb-4">
                                <p className="lead grey-text">
                                    Easily upload PDFs or images from various sources such as
                                    email, cloud storage, or your desktop. With just a click, the
                                    documents are quickly uploaded and ready for extraction in a
                                    matter of seconds.
                                </p>
                            </li>
                            <li className="mb-4">
                                <p className="lead grey-text">
                                    OCR technology efficiently scans and extracts critical data
                                    from invoices, providing an easy-to-use interface for
                                    verification. This ensures that all extracted information is
                                    accurate and error-free with minimal effort.
                                </p>
                            </li>
                            <li>
                                <p className="lead grey-text">
                                    Upload invoices in batches, each containing multiple
                                    documents. Extract data from all invoices in seconds,
                                    streamlining the entire process and eliminating manual entry.
                                </p>
                            </li>
                        </ul>
                    </Col>
                    <Col lg={6} className="ocr-functions-image-container-scan text-center">
                        <Image src={ocrFunctionsImage} alt="OCR Functions" fluid className="ocr-functions-image-scan rounded-4 shadow-lg" />
                    </Col>
                </Row>
            </Container>

            {/* INTEGRATIONS SECTION */}
            <div className="integrations-section">
                <Container>
                    <span className="integrations-label">Integrations</span>
                    <h2 className="integrations-heading">Connects to your ERP</h2>

                    <div className="integrations-grid">
                        <div className="integration-card">
                            <img src={img1} alt="ERP Integration 1" className="integration-logo" />
                        </div>
                        <div className="integration-card">
                            <img src={img2} alt="ERP Integration 2" className="integration-logo" />
                        </div>
                        <div className="integration-card">
                            <img src={img3} alt="ERP Integration 3" className="integration-logo" />
                        </div>
                        <div className="integration-card">
                            <img src={img4} alt="ERP Integration 4" className="integration-logo" />
                        </div>
                        <div className="integration-card">
                            <img src={img5} alt="ERP Integration 5" className="integration-logo" />
                        </div>

                        <div className="integration-card">
                            <img src={quickbooksLogo} alt="QuickBooks" className="integration-logo" />
                        </div>
                        <div className="integration-card">
                            <img src={sapLogo} alt="SAP" className="integration-logo" />
                        </div>
                        <div className="integration-card">
                            <img src={sysproLogo} alt="Syspro" className="integration-logo" />
                        </div>
                        <div className="integration-card">
                            <img src={sageLogo} alt="Sage X3" className="integration-logo" />
                        </div>
                        <div className="integration-card">
                            <div className="integration-text-only">
                                And many other<br />popular ERPs
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* ROI CALCULATOR SECTION */}
            <Container className="roi-section py-5">
                <div className="roi-card">
                    <div className="text-center mb-4">
                        <h1 className="roi-title mb-2">Calculate Your ROI</h1>
                        <p className="grey-text lead mb-0 fw-bold">Estimate your potential savings and efficiency gains with Scanify AI.</p>
                    </div>

                    <div className="d-flex justify-content-center mb-4">
                        <div className="roi-toggle">
                            <button
                                className={currency === "INR" ? "active" : ""}
                                onClick={() => setCurrency("INR")}
                            >
                                INR ₹
                            </button>
                            <button
                                className={currency === "USD" ? "active" : ""}
                                onClick={() => setCurrency("USD")}
                            >
                                USD $
                            </button>
                        </div>
                    </div>


                    <Row className="g-5">
                        {/* LEFT SIDE: Inputs */}
                        <Col lg={7}>
                            <div className="roi-field">
                                <label>
                                    <span className="d-flex align-items-center gap-2">
                                        <FaFileInvoiceDollar className="violet-text" /> Monthly Invoice / Purchase Order / Payment Advice
                                    </span>
                                    <span className="value">{Number(invoices).toLocaleString()}</span>
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="5000"
                                    step="100"
                                    value={invoices}
                                    onChange={(e) => setInvoices(e.target.value)}
                                />
                                <div className="d-flex justify-content-between mt-2 small grey-text">
                                    <span>0</span>
                                    <span>5,000+</span>
                                </div>
                            </div>

                            <div className="roi-field">
                                <label>
                                    <span className="d-flex align-items-center gap-2">
                                        <FaExchangeAlt className="violet-text" /> Cost Per Invoice ({currency})
                                    </span>
                                    <span className="value">{costPerInvoice}</span>
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    value={costPerInvoice}
                                    onChange={(e) => setCostPerInvoice(e.target.value)}
                                />
                                <div className="d-flex justify-content-between mt-2 small grey-text">
                                    <span>{currency === "USD" ? "$1" : "₹1"}</span>
                                    <span>{currency === "USD" ? "$100" : "₹100"}</span>
                                </div>
                            </div>

                            <div className="roi-field">
                                <label>
                                    <span className="d-flex align-items-center gap-2">
                                        <FaTasks className="violet-text" /> Manual Work Reduction (%)
                                    </span>
                                    <span className="value">{processingTime}%</span>
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={processingTime}
                                    onChange={(e) => setProcessingTime(e.target.value)}
                                />
                                <div className="d-flex justify-content-between mt-2 small grey-text">
                                    <span>Manual</span>
                                    <span>Automated</span>
                                </div>
                            </div>
                        </Col>

                        {/* RIGHT SIDE: Results */}
                        <Col lg={5}>
                            <div className="roi-right h-100 d-flex flex-column justify-content-between">
                                <div className="roi-results-glass p-4 rounded-4">
                                    <div className="roi-monthly mb-4">
                                        <p className="mb-1 fw-bold">Estimated Monthly Savings</p>
                                        <h4>
                                            {currency === "USD" ? "$" : "₹"}
                                            {Math.round(monthlySavings).toLocaleString()}
                                        </h4>
                                    </div>

                                    <div className="roi-annual">
                                        <p className="mb-2">Total Annual Savings</p>
                                        <h2>
                                            {currency === "USD" ? "$" : "₹"}
                                            {Math.round(yearlySavings).toLocaleString()}
                                        </h2>
                                    </div>
                                </div>
                                <p className="mt-4 small grey-text text-center italic">
                                    *Estimates are based on average efficiency benchmarks.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
            <Container>
                <div>
                    <h6 className="text-center">
                        Estimated savings are calculated based on monthly invoice volume,
                        manual processing cost, and AI automation efficiency. Actual savings
                        may vary depending on business workflow and operational processes.
                    </h6>
                    <button style={{ backgroundColor: "#eae5e6ff", color: "#fff", textAlign: "center", display: "block", margin: "0 auto" }} className="btn btn-primary">
                        <h6 className="text-center">Estimated Savings = Monthly Invoices × Processing Cost × Automation Rate</h6>
                    </button>
                </div>




            </Container>








            {/* All-in-one Invoice Platform Section */}
            <Container className="all-in-one-platform-section-scan py-5 text-center">
                <h2 className="all-in-one-heading-scan display-4 fw-bold mb-4 mt-5">
                    All-in-one Smart Invoice Management platform
                </h2>
                <p className="all-in-one-subheading-scan grey-text lead mx-auto mb-5" style={{ maxWidth: '900px' }}>
                    Effortlessly customize your business journey with our smart dashboard that enables invoice extraction to JSON and Excel, seamless SAP & Oracle integration, and powerful PDF tools.
                </p>
                <Row className="all-in-one-features-container-scan g-4 justify-content-center mb-5">
                    {[
                        { icon: <FaFileInvoiceDollar className="feature-icon" />, title: "Smart Data Export", desc: "Easily download extracted invoice data in Excel and JSON formats for smooth reporting and analysis." },
                        { icon: <FaDownload className="feature-icon" />, title: "Automated Data Transfer", desc: "Automatically push invoice data to your ERP systems using robust API integrations." },
                        { icon: <FaExchangeAlt className="feature-icon" />, title: "ERP Connectivity", desc: "Seamlessly connect with major ERP platforms like SAP, Odoo, Microsoft Dynamics, Oracle EBS, Oracle Fusion, and NetSuite." },
                        { icon: <FaNetworkWired className="feature-icon" />, title: "Batch Invoice Processing", desc: "Select and manage multiple invoices at once—review, process, and approve them effortlessly in a single streamlined workflow." },
                        { icon: <FaTasks className="feature-icon" />, title: "Effortless Document Import", desc: "Easily upload invoices as PDFs or images from various sources including email, APIs, desktop, Google Drive, Dropbox, RPA tools, or any cloud storage service." },
                        { icon: <FaCloudUploadAlt className="feature-icon" />, title: "Multi-Language OCR Support", desc: "Our powerful Invoice OCR API extracts data from invoices written in multiple languages—making global document handling truly seamless." }
                    ].map((feature, idx) => (
                        <Col md={6} lg={4} key={idx}>
                            <Card className="all-in-one-feature-scan h-100 p-4 border-0 rounded-4 shadow-sm">
                                <div className="feature-icon-container-scan mb-3 mx-auto">
                                    {feature.icon}
                                </div>
                                <Card.Body>
                                    <Card.Title className="feature-header-scan violet-text mb-3 fs-4">{feature.title}</Card.Title>
                                    <Card.Text className="feature-description-scan grey-text">{feature.desc}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* FAQ Section */}
            <Container className="faq-section-scan py-5">
                <h2 className="fa-heading-scan display-4 fw-bold violet-text text-center mb-5 mt-5">
                    Frequently Asked Questions
                </h2>
                <Accordion defaultActiveKey="0" className="fa-list-custom mx-auto mb-5" style={{ maxWidth: '900px' }}>
                    {faqData.map((faq, index) => (
                        <Accordion.Item
                            eventKey={String(index)}
                            key={index}
                            className="fa-item-custom mb-3"
                        >
                            <Accordion.Header className="fa-question-custom">
                                {faq.question}
                            </Accordion.Header>
                            <Accordion.Body className="fa-answer-custom">
                                {faq.answer}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>

                <div className="query-section text-center mt-5 mb-5">
                    {!isQueryOpen ? (
                        <div className="d-flex justify-content-center">
                            <Button
                                size="lg"
                                className="get-started-button-scan rounded-pill px-5 py-3"
                                onClick={openQueryBox}
                            >
                                Have a Question? Send us a Query
                            </Button>
                        </div>
                    ) : (
                        <div
                            className="query-box mx-auto p-5 rounded-4 shadow-lg position-relative"
                            style={{ maxWidth: '600px' }}
                        >
                            <button
                                className="close-query-box"
                                onClick={closeQueryBox}
                                aria-label="Close"
                            >
                                &times;
                            </button>
                            <h3 className="mb-4 violet-text">Send Us a Query</h3>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Your Name"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="Your Email"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="tel"
                                    placeholder="Your Phone Number"
                                    value={userPhone}
                                    onChange={(e) => setUserPhone(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    className="query-textarea"
                                    placeholder="Enter your query here..."
                                    value={queryText}
                                    onChange={handleQueryChange}
                                    required
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                className="get-started-button-scan rounded-pill w-100 py-3"
                                onClick={handleSendQuery}
                            >
                                Submit Query
                            </Button>
                        </div>
                    )}
                </div>

            </Container>


            {/* Bottom Section */}
            <div className="bottom-cta-section-scan text-center py-5">
                <p className="copyright-info-scan grey-text mb-0">
                    © Kodivian.scanify 2025. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default ScanifyDetail;