import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Accordion,
    Form,
    Card, // Added Card for the feature items
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileAlt, // Example icon for Streamline Storage
    faSearch,   // Example icon for Quick Retrieval
    faShieldAlt, // Example icon for Authenticate and Protect
    faCheckSquare, // Example icon for Approval Processes
    faFolderOpen, // Example icon for Customizable Cabinets
    faCloudUploadAlt, // Example icon for Store Documents Anywhere
    faBolt, // Example icon for Hero section main icon
} from '@fortawesome/free-solid-svg-icons';


import DemoBookingPopup from '../components/DemoBookingPopup';
import "../styles/Document.css"; // Your custom styles will be updated below

const faqData = [
    {
        question: 'How does the system handle different data formats?',
        answer: 'Our platform is highly flexible and supports a wide range of data formats, including JSON, XML, and CSV. ',
    },
    {
        question: 'Can I store my documents on any system?',
        answer: 'Yes, the platform offers flexibility in document storage. You can configure custom storage paths, allowing you to store documents locally, on a cloud service, or using a hybrid solution that meets your organization’s needs.',
    },
    {
        question: 'How can I ensure the security of my documents?',
        answer: 'Our platform incorporates multiple security features, including digital signatures, watermarking, and encryption. These features protect your documents from unauthorized access and ensure their authenticity and confidentiality.',
    },
    {
        question: 'How do I search for and retrieve specific documents?',
        answer: 'Our platform allows you to search and retrieve documents using metadata such as invoice numbers, vendor names, and dates. This ensures you can quickly find the exact document you need without wasting time manually sifting through files.',
    },
    {
        question: 'Can I automate the document approval process?',
        answer: 'Yes, you can automate the entire approval workflow. The platform allows you to set specific approval levels for documents, track their status in real-time, and send automated notifications to users at each step of the approval process. This ensures faster approvals and reduces bottlenecks in the workflow.',
    },
];


const Document = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const handleOpenPopup = () => setIsPopupOpen(true);
    const handleClosePopup = () => setIsPopupOpen(false);

    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            title: 'Step 1',
            label: 'Template Management',
            explanation: 'Effortlessly design and manage document templates within Intellidocs. Whether you’re creating invoices, contracts, or reports, our platform allows you to define reusable templates that can be customized for specific needs. Automate the document creation process and ensure consistency across your organization every time.',
        },
        {
            title: 'Step 2',
            label: 'Build Dynamics Data Management', // Corrected typo: "Build dynamics" to "Build Dynamics"
            explanation: 'Data comes in various forms and structures, and our platform’s flexibility ensures that it can handle them all. Whether you are dealing with common formats like JSON or other data types, you can seamlessly integrate and process the data. Additionally, you have the ability to perform transformations within the system to ensure that the data fits your document templates perfectly, streamlining the entire document creation process.',
        },
        {
            title: 'Step 3',
            label: 'Transform Your Document Workflows',
            explanation: 'With Intellidocs, you can transform your document workflows by automating routine tasks, streamlining approvals, and enhancing document processing speed. Our powerful transformation tools allow you to take your business documents to the next level, reducing errors, increasing efficiency, and ensuring compliance every step of the way.',
        },
    ];

    const toggleStep = (index) => setActiveStep(index);

    const [expandedQuestion, setExpandedQuestion] = useState(null);
    const [isQueryOpen, setIsQueryOpen] = useState(false);
    const [queryText, setQueryText] = useState('');
    const [queryEmail, setQueryEmail] = useState('');

    const handleQuestionClick = (question) => {
        setExpandedQuestion(expandedQuestion === question ? null : question);
    };

    const openQueryBox = () => setIsQueryOpen(true);
    const closeQueryBox = () => setIsQueryOpen(false); // Added close function

    const handleQueryChange = (event) => setQueryText(event.target.value);
    const handleEmailChange = (event) => setQueryEmail(event.target.value);

    const handleSendQuery = async () => {
        const email = queryEmail;
        const query = queryText;

        if (!query || !email) {
            alert("Please enter both your email and query.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/api/send-query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, query })
            });

            if (response.ok) {
                alert("Query sent successfully! We will get back to you via email.");
                setQueryText('');
                setQueryEmail('');
                setIsQueryOpen(false);
            } else {
                alert("Failed to send query. Please try again later.");
                console.error("Error sending query:", response.status);
            }
        } catch (error) {
            alert("An error occurred while sending your query.");
            console.error("Fetch error:", error);
        }
    };


    return (
        <div className="docto-document-page">
            {/* Hero Section */}
            <Container fluid className="docto-hero py-5 text-center">
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <h1 className="docto-hero-h1 display-4 fw-bold mb-3">
                            Streamlined Document Management for Modern Enterprises
                        </h1>
                        <h2 className="docto-hero-h2 lead mb-4">
                            Secure Storage, Intelligent Retrieval, and Full Control Over Your Data
                        </h2>
                        <p className="docto-hero-p lead mb-2">
                            A document management system designed specifically for handling invoice data.
                        </p>
                        <p className="docto-hero-p lead mb-2">
                            It supports version control, digital signatures, and watermarking.
                        </p>
                        <p className="docto-hero-p lead mb-4">
                            You can configure custom storage paths.
                        </p>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-5">
                    <Col xs={12} className="docto-hero-image-wrapper">
                        {/* Placeholder for the hero image concept - you'd likely use a single image or more sophisticated SVG/CSS */}
                        <div className="docto-hero-image-central-icon">
                            <FontAwesomeIcon icon={faBolt} size="5x" className="docto-central-icon-svg" />
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Why Customers Choose Us Section */}
            <Container className="docto-why-choose-us py-5">
                <h2 className="docto-why-choose-us-h2 display-5 fw-bold text-center mb-5">Why Customers Choose Us</h2>
                <Row className="g-4">
                    {/* Feature Item 1 */}
                    <Col md={6} lg={4}>
                        <Card className="docto-feature-item h-100 p-4 rounded-4 shadow">
                            <Card.Body className="text-center">
                                <div className="docto-feature-icon mb-3">
                                    <FontAwesomeIcon icon={faFileAlt} size="3x" />
                                </div>
                                <Card.Title as="h3" className="mb-3">Streamline Your Document Storage</Card.Title>
                                <Card.Text>
                                    Provides a robust document management system tailored to efficiently store, organize, and manage all your invoice data. With a central repository, you can easily access, edit, and track your documents, ensuring data integrity and security at all times.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Feature Item 2 */}
                    <Col md={6} lg={4}>
                        <Card className="docto-feature-item h-100 p-4 rounded-4 shadow">
                            <Card.Body className="text-center">
                                <div className="docto-feature-icon mb-3">
                                    <FontAwesomeIcon icon={faSearch} size="3x" />
                                </div>
                                <Card.Title as="h3" className="mb-3">Quick and Precise Document Retrieval</Card.Title>
                                <Card.Text>
                                    You can effortlessly retrieve documents by leveraging invoice-specific values like vendor details, invoice number, or date. Our advanced metadata-based search functionality ensures that you find the exact document you need in seconds, improving efficiency and reducing manual search time.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Feature Item 3 */}
                    <Col md={6} lg={4}>
                        <Card className="docto-feature-item h-100 p-4 rounded-4 shadow">
                            <Card.Body className="text-center">
                                <div className="docto-feature-icon mb-3">
                                    <FontAwesomeIcon icon={faShieldAlt} size="3x" />
                                </div>
                                <Card.Title as="h3" className="mb-3">Authenticate and Protect Your Documents</Card.Title>
                                <Card.Text>
                                    Ensure the authenticity and security of your invoices with built-in digital signatures and watermarking features. These tools safeguard your documents, prevent unauthorized access, and protect sensitive information.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Feature Item 4 */}
                    <Col md={6} lg={4}>
                        <Card className="docto-feature-item h-100 p-4 rounded-4 shadow">
                            <Card.Body className="text-center">
                                <div className="docto-feature-icon mb-3">
                                    <FontAwesomeIcon icon={faCheckSquare} size="3x" />
                                </div>
                                <Card.Title as="h3" className="mb-3">Manage and Monitor Approval Processes</Card.Title>
                                <Card.Text>
                                    Assign specific approval levels to documents and track their approval status in real-time. You can easily monitor which invoices are pending, approved, or rejected, ensuring smooth and timely document processing and reducing bottlenecks in your approval workflows.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Feature Item 5 */}
                    <Col md={6} lg={4}>
                        <Card className="docto-feature-item h-100 p-4 rounded-4 shadow">
                            <Card.Body className="text-center">
                                <div className="docto-feature-icon mb-3">
                                    <FontAwesomeIcon icon={faFolderOpen} size="3x" />
                                </div>
                                <Card.Title as="h3" className="mb-3">Organize Your Documents in Customizable Cabinets</Card.Title>
                                <Card.Text>
                                    Store and categorize your documents in intuitive cabinet-style folders. This feature allows you to organize invoices and other documents in a way that suits your business needs, making retrieval even faster and more efficient.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Feature Item 6 */}
                    <Col md={6} lg={4}>
                        <Card className="docto-feature-item h-100 p-4 rounded-4 shadow">
                            <Card.Body className="text-center">
                                <div className="docto-feature-icon mb-3">
                                    <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" />
                                </div>
                                <Card.Title as="h3" className="mb-3">Store Your Documents Anywhere</Card.Title>
                                <Card.Text>
                                    Flexibility in document storage, allowing you to store your files on any system or platform of your choice—whether it's a local server, cloud, or hybrid solution. This adaptability ensures that your document management process integrates seamlessly with your existing IT infrastructure.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* How to Get Started Section */}
            <Container fluid className="docto-how-to-get-started py-5">
                <Row className="align-items-center">
                    <Col lg={6} className="text-center text-lg-start mb-4 mb-lg-0">
                        <h2 className="docto-how-to-get-started-h2 display-5 fw-bold mb-3">How to Get Started</h2>
                        <p className="docto-how-to-get-started-intro lead">
                            Automate document generation easily from your browser - no installation required.
                            <a href="#" className="text-decoration-none docto-link ms-1">Contact us</a> to obtain access to the Documotor platform, and you're ready to get started!
                        </p>
                    </Col>
                    <Col lg={6}>
                        <div className="docto-steps-layout">
                            <div className="docto-steps-sidebar">
                                {steps.map((step, index) => (
                                    <div
                                        className={`docto-step-sidebar-item p-3 mb-2 rounded-3 ${activeStep === index ? 'docto-active' : ''}`}
                                        key={index}
                                        onClick={() => toggleStep(index)}
                                    >
                                        <h4 className="mb-1">{step.title}</h4>
                                        <p className="mb-0">{step.label}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="docto-steps-content p-4 rounded-3 shadow">
                                {steps[activeStep] && (
                                    <div className="docto-cartoon-slide-in">
                                        <h3 className="mb-3">{steps[activeStep].label}</h3>
                                        <p>{steps[activeStep].explanation}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* FAQ Section */}
            <Container className="docto-faq-section py-5">
                <h2 className="docto-faq-heading display-5 fw-bold text-center mb-5">Frequently Asked Questions</h2>
                <Accordion activeKey={expandedQuestion} onSelect={handleQuestionClick} className="mx-auto">
                    {faqData.map((faq, index) => (
                        <Accordion.Item eventKey={faq.question} key={`faq-${index}`} className="mb-3 rounded-3 shadow-sm">
                            <Accordion.Header className="docto-faq-question-header">
                                {faq.question}
                            </Accordion.Header>
                            <Accordion.Body className="docto-faq-answer-body">
                                {faq.answer}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>

                <div className="text-center mt-5">
                    {!isQueryOpen ? (
                        <Button
                            variant="primary"
                            size="lg"
                            className="docto-faq-query-button rounded-pill px-4 py-2"
                            onClick={openQueryBox}
                        >
                            Have a Question? Send us a Query
                        </Button>
                    ) : (
                        <Card className="docto-query-input-area mx-auto p-4 rounded-4 shadow-lg position-relative">
                            <Button
                                variant="link"
                                className="docto-query-close-button position-absolute top-0 end-0 m-3 fs-3 text-decoration-none"
                                onClick={closeQueryBox}
                                aria-label="Close"
                            >
                                &times;
                            </Button>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    className="docto-query-textbox form-control"
                                    placeholder="Enter your query here..."
                                    value={queryText}
                                    onChange={handleQueryChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="email"
                                    className="docto-query-Emailbox form-control"
                                    placeholder="Enter your Email"
                                    value={queryEmail}
                                    onChange={handleEmailChange}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                className="docto-query-submit-button rounded-pill px-4 py-2"
                                onClick={handleSendQuery}
                            >
                                Submit Query
                            </Button>
                        </Card>
                    )}
                </div>
            </Container>

            {/* Footer Section */}
            <div className="docto-footer-section py-4 text-center">
                <p className="docto-footer-text mb-0">
                    © Kodivian.scanify 2024. All rights reserved.
                </p>
            </div>
            <DemoBookingPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
        </div>
    );
};

export default Document;