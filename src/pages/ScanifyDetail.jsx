import React, { useState } from 'react';
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
import invoiceImage from '../assets/invoice.png';
import ocrFunctionsImage from '../assets/ocrFunctions.png';
import scannerImage from '../assets/Scannerimage.png';

// Import your custom CSS for the violet-black theme
import '../styles/Scanify.css';

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
    const [isQueryOpen, setIsQueryOpen] = useState(false);
    const [queryText, setQueryText] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userName, setUserName] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [showImageHighlight, setShowImageHighlight] = useState(false);

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
<<<<<<< HEAD
                email: userEmail,
                phone: userPhone,
=======
                email:userEmail,
                phone:userPhone,
>>>>>>> d3a15afbd1d802fc1ccf4049503060adb05bc8ff
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
                <h1 className="secondary-heading-scan display-5 fw-bold mb-4">
                    Smart Invoice Extraction Platform Starts with SCANIFY
                </h1>
                <p className="secondary-description-scan grey-text lead mx-auto" style={{ maxWidth: '800px' }}>
                    Effortlessly streamline your document workflow with advanced OCR extraction, seamless SAP integration, and JSON-based invoice data.
                </p>
            </Container>

            {/* Hero Section */}
            <Container fluid className="scanify-hero-scan py-5">
                <Row className="align-items-center justify-content-center">
                    <Col lg={6} className="hero-left-scan text-center text-lg-start mb-4 mb-lg-0 px-4 px-lg-5">
                        <div className="tagline-container-scan mb-3">
                            <Button
                                variant="outline-dark"
                                className="tagline-button-scan violet-text rounded-pill px-4 py-2"
                                onClick={handleInsightClick}
                            >
                                Introducing our Insights <span className="ms-2">→</span>
                            </Button>
                        </div>
                        <h2 className="hero-subheading-scan display-4 fw-bold mb-4">
                            Conquering Your Invoicing Challenges
                        </h2>
                        <p className="hero-description-scan lead mb-4">
                            Customize your business journey effortlessly with our dashboard backed by a suite of powerful tools at your fingertips.
                        </p>
                        <div className="hero-buttons-scan d-flex flex-column flex-md-row justify-content-center justify-content-lg-start gap-3 mb-4">
                            <Button variant="primary" size="lg" className="get-started-button-scan rounded-pill" onClick={handleOpenPopup}>
                                Get Started a demo
                            </Button>
                            <DemoBookingPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
                            <Button
    variant="outline-dark"
    size="lg"
    className="how-it-works-button-scan rounded-pill px-4 py-2"
    onClick={() => {
        const section = document.getElementById("scanFunctionSection");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    }}
>
    How it works <span className="ms-2">→</span>
</Button>

                        </div>
                        <p className="trust-message-scan violet-text">
                            Trusted by 50,000+ businesses to scale outbound
                        </p>
                    </Col>

                    <Col lg={6} className="hero-right-scan d-flex align-items-center justify-content-center">
                        <Image
                            src={invoiceImage}
                            alt="Invoice"
                            fluid
                            className={`invoice-image-scan rounded shadow-lg ${showImageHighlight ? 'invoice-image-active' : ''}`}
                        />
                    </Col>
                </Row>
            </Container>

            {/* Extractable Fields Section */}
            <Container className="extractable-fields-section-scan bg-white py-5">
                <Row className="align-items-center">
                    <Col lg={6} className="extractable-fields-image-container-scan text-center mb-4 mb-lg-0">
                        <Image src={scannerImage} alt="Scanner" fluid className="extractable-fields-image-scan rounded shadow-lg" />
                    </Col>
                    <Col lg={6} className="extractable-fields-details-scan px-4 px-lg-5">
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
                            <div key={idx} className="flat-fields-group-scan mb-4">
                                <h3 className="mb-3 violet-text">{group.title}</h3>
                                <div className="pill-buttons-container-scan d-flex flex-wrap gap-2">
                                    {group.fields.map((field, fIdx) => (
                                        <Button key={fIdx} variant="outline-dark" className="pill-button-scan rounded-pill px-3 py-1">
                                            <span className="checkmark-scan me-1">✓</span> {field}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>

            {/* OCR Functions Section */}
            <Container
    className="ocr-functions-section-scan py-5"
    id="scanFunctionSection"
>

                <h2 className="ocr-functions-heading-scan display-5 fw-bold violet-text text-center mb-5">
                    Core Functions of OCR in Invoice Processing with SCANIFY
                </h2>
                <Row className="align-items-center">
                    <Col lg={6} className="ocr-functions-text-scan px-4 px-lg-5">
                        <ul className="list-unstyled">
                            <li className="mb-4">
                                <p className="lead">
                                    Easily upload PDFs or images from various sources such as
                                    email, cloud storage, or your desktop. With just a click, the
                                    documents are quickly uploaded and ready for extraction in a
                                    matter of seconds.
                                </p>
                            </li>
                            <li className="mb-4">
                                <p className="lead">
                                    OCR technology efficiently scans and extracts critical data
                                    from invoices, providing an easy-to-use interface for
                                    verification. This ensures that all extracted information is
                                    accurate and error-free with minimal effort.
                                </p>
                            </li>
                            <li>
                                <p className="lead">
                                    Upload invoices in batches, each containing multiple
                                    documents. Extract data from all invoices in seconds,
                                    streamlining the entire process and eliminating manual entry.
                                </p>
                            </li>
                        </ul>
                    </Col>
                    <Col lg={6} className="ocr-functions-image-container-scan text-center">
                        <Image src={ocrFunctionsImage} alt="OCR Functions" fluid className="ocr-functions-image-scan rounded shadow-lg" />
                    </Col>
                </Row>
            </Container>

            {/* All-in-one Invoice Platform Section */}
            <Container className="all-in-one-platform-section-scan bg-white py-5 text-center">
                <h2 className="all-in-one-heading-scan display-5 fw-bold mb-3">
                    All-in-one Smart Invoice Management platform
                </h2>
                <p className="all-in-one-subheading-scan grey-text lead mx-auto mb-5" style={{ maxWidth: '900px' }}>
                    Effortlessly customize your business journey with our smart dashboard that enables invoice extraction to JSON and Excel, seamless SAP & Oracle integration, and powerful PDF tools.
                </p>
                <Row className="all-in-one-features-container-scan g-4 justify-content-center">
                    <Col md={6} lg={4}>
                        <Card className="all-in-one-feature-scan h-100 p-4 border-0 rounded-4 shadow-sm">
                            <div className="feature-icon-container-scan mb-3 mx-auto">
                                <FaFileInvoiceDollar className="feature-icon" />
                            </div>
                            <Card.Body>
                                <Card.Title className="feature-header-scan violet-text mb-2">Smart Data Export</Card.Title>
                                <Card.Text className="feature-description-scan">Easily download extracted invoice data in Excel and JSON formats for smooth reporting and analysis.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} lg={4}>
                        <Card className="all-in-one-feature-scan h-100 p-4 border-0 rounded-4 shadow-sm">
                            <div className="feature-icon-container-scan mb-3 mx-auto">
                                <FaDownload className="feature-icon" />
                            </div>
                            <Card.Body>
                                <Card.Title className="feature-header-scan violet-text mb-2">Automated Data Transfer</Card.Title>
                                <Card.Text className="feature-description-scan">Automatically push invoice data to your ERP systems using robust API integrations.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} lg={4}>
                        <Card className="all-in-one-feature-scan h-100 p-4 border-0 rounded-4 shadow-sm">
                            <div className="feature-icon-container-scan mb-3 mx-auto">
                                <FaExchangeAlt className="feature-icon" />
                            </div>
                            <Card.Body>
                                <Card.Title className="feature-header-scan violet-text mb-2">ERP Connectivity</Card.Title>
                                <Card.Text className="feature-description-scan">Seamlessly connect with major ERP platforms like SAP, Odoo, Microsoft Dynamics, Oracle EBS, Oracle Fusion, and NetSuite.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} lg={4}>
                        <Card className="all-in-one-feature-scan h-100 p-4 border-0 rounded-4 shadow-sm">
                            <div className="feature-icon-container-scan mb-3 mx-auto">
                                <FaNetworkWired className="feature-icon" />
                            </div>
                            <Card.Body>
                                <Card.Title className="feature-header-scan violet-text mb-2">Batch Invoice Processing</Card.Title>
                                <Card.Text className="feature-description-scan">Select and manage multiple invoices at once—review, process, and approve them effortlessly in a single streamlined workflow.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} lg={4}>
                        <Card className="all-in-one-feature-scan h-100 p-4 border-0 rounded-4 shadow-sm">
                            <div className="feature-icon-container-scan mb-3 mx-auto">
                                <FaTasks className="feature-icon" />
                            </div>
                            <Card.Body>
                                <Card.Title className="feature-header-scan violet-text mb-2">Effortless Document Import</Card.Title>
                                <Card.Text className="feature-description-scan">Easily upload invoices as PDFs or images from various sources including email, APIs, desktop, Google Drive, Dropbox, RPA tools, or any cloud storage service.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} lg={4}>
                        <Card className="all-in-one-feature-scan h-100 p-4 border-0 rounded-4 shadow-sm">
                            <div className="feature-icon-container-scan mb-3 mx-auto">
                                <FaCloudUploadAlt className="feature-icon" />
                            </div>
                            <Card.Body>
                                <Card.Title className="feature-header-scan violet-text mb-2">Multi-Language OCR Support</Card.Title>
                                <Card.Text className="feature-description-scan">Our powerful Invoice OCR API extracts data from invoices written in multiple languages—making global document handling truly seamless.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* FAQ Section */}
            <Container className="faq-section-scan bg-white py-5">
                <h2 className="fa-heading-scan display-5 fw-bold violet-text text-center mb-5">
                    Frequently Asked Questions
                </h2>
                <Accordion defaultActiveKey="0" className="fa-list-custom mx-auto" style={{ maxWidth: '900px' }}>
                    {faqData.map((faq, index) => (
                        <Accordion.Item
                            eventKey={String(index)}
                            key={index}
                            className="fa-item-custom mb-3"
                        >
                            <Accordion.Header className="fa-question-custom violet-text ">
                                {faq.question}
                            </Accordion.Header>
                            <Accordion.Body className="fa-answer-custom ">
                                {faq.answer}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>

                <div className="query-section text-center mt-5">
                    {!isQueryOpen ? (
                        <div className="d-flex justify-content-center">
                            <Button
                                size="lg"
                                className="query-button bg-violet text-black rounded-pill"
                                onClick={openQueryBox}
                            >
                                Have a Question? Send us a Query
                            </Button>
                        </div>
                    ) : (
                        <div
                            className="query-box mx-auto p-4 rounded-3 shadow position-relative"
                            style={{ maxWidth: '600px' }}
                        >
                            <button
                                className="close-query-box"
                                onClick={closeQueryBox}
                                aria-label="Close"
                            >
                                
                            </button>
                            <Form.Group className="mb-3">
                                <Form.Control
                                type="text"
                                placeholder="Your Name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                 required
                                 />
                             </Form.Group>

<<<<<<< HEAD
=======
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
>>>>>>> d3a15afbd1d802fc1ccf4049503060adb05bc8ff

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

                            <Form.Group className="mb-3">
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
                                className="submit-query-button rounded-pill"
                                onClick={handleSendQuery}
                            >
                                Submit Query
                            </Button>
                        </div>
                    )}
                </div>

            </Container>
            

            {/* Bottom Section */}
            <div className="bottom-cta-section-scan text-center py-4">
                <p className="copyright-info-scan mb-0">
                    © Kodivian.scanify 2025. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default ScanifyDetail;