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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTicketAlt,
    faUserCog,
    faSitemap,
    faBell,
    faComments,
    faChartBar,
    faShieldAlt,
} from '@fortawesome/free-solid-svg-icons';

import DemoBookingPopup from '../components/DemoBookingPopup';

// Reuse your existing images or update paths as needed
import processImage from '../assets/processbuuild.png';
import websiteImage from '../assets/website.png';
import formImage from '../assets/form.png';
import workflowImage from '../assets/workflow.png';
import groupsImage from '../assets/user.png';

import '../styles/SupportForge.css';

const faqData = [
    {
        question: 'What is the Kodivian Ticketing Management System?',
        answer: 'It is a workflow-driven platform that manages service requests, approvals, escalations, and resolutions across departments with full transparency.',
    },
    {
        question: 'Can workflows and roles be customized?',
        answer: 'Yes, you can configure requestor, supporting staff, and HOD flows, along with custom statuses, priorities, and department-wise routing.',
    },
    {
        question: 'Does the system support real-time notifications?',
        answer: 'Yes, users receive instant email and in-app alerts for ticket creation, updates, escalations, and closures.',
    },
    {
        question: 'Can we track SLAs and performance?',
        answer: 'Interactive dashboards show ticket volume, resolution times, department performance, and SLA compliance for data-driven decisions.',
    },
    {
        question: 'Is my data secure?',
        answer: 'Yes, the system uses role-based permissions, access control, and secure architecture aligned with industry best practices.',
    },
];

const SupportForge = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [expandedQuestion, setExpandedQuestion] = useState(null);
    const [isQueryOpen, setIsQueryOpen] = useState(false);
    const [queryText, setQueryText] = useState('');

    const handleOpenPopup = () => setIsPopupOpen(true);
    const handleClosePopup = () => setIsPopupOpen(false);

    const handleQuestionClick = (question) => {
        setExpandedQuestion(expandedQuestion === question ? null : question);
    };

    const openQueryBox = () => setIsQueryOpen(true);
    const closeQueryBox = () => setIsQueryOpen(false);

    const handleQueryChange = (event) => {
        setQueryText(event.target.value);
    };

    const handleSendQuery = async () => {
        if (queryText.trim()) {
            try {
                // Update endpoint as per your backend route
                const response = await fetch('http://localhost:5173/SupportForge', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query: queryText }),
                });

                if (response.ok) {
                    alert('Your query has been sent. We will get back to you via email.');
                    setIsQueryOpen(false);
                    setQueryText('');
                } else {
                    alert('Failed to send your query. Please try again later.');
                    console.error('Error sending query:', response.status);
                }
            } catch (error) {
                alert('An error occurred while sending your query.');
                console.error('Fetch error:', error);
            }
        } else {
            alert('Please enter your query.');
        }
    };

    const [expandedSection, setExpandedSection] = useState('requestor');
    const [currentImg, setCurrentImg] = useState(formImage);

    const handleSectionClick = (section) => {
        if (expandedSection === section) {
            setExpandedSection(null);
            setCurrentImg(websiteImage);
        } else {
            setExpandedSection(section);
            switch (section) {
                case 'requestor':
                    setCurrentImg(formImage);
                    break;
                case 'supporting':
                    setCurrentImg(workflowImage);
                    break;
                case 'hod':
                    setCurrentImg(groupsImage);
                    break;
                case 'ack':
                    setCurrentImg(processImage);
                    break;
                default:
                    setCurrentImg(websiteImage);
            }
        }
    };

    return (
        <div className="tms-main-page-wrapper">
            {/* Hero Section */}
            <Container fluid className="tms-hero-section py-5">
                <h1 className="tms-hero-top-heading display-3 fw-bold text-center mb-3">
                    Smart Ticketing. <br /> Faster Resolutions.
                </h1>
                <p className="tms-hero-intro lead text-center mb-4 mx-auto">
                    Kodivian Ticketing Management System (TMS) is an intelligent workflow platform
                    to manage service requests, approvals, escalations, and resolutions with
                    complete visibility.
                </p>
                <p className="tms-hero-sub-intro text-center mb-5 mx-auto">
                    From IT helpdesk and facilities to HR and admin services, every request stays
                    organized, traceable, and accountable from creation to closure.
                </p>

                <Container className="text-center tms-hero-content-container">
                    <Row className="tms-hero-row align-items-center justify-content-center pt-5">
                        <Col lg={6} className="tms-hero-left-col text-center text-lg-start mb-4 mb-lg-0">
                            <h1 className="tms-hero-main-heading display-2 fw-bold mb-4">
                                Raise. Track. Resolve.
                            </h1>
                            <h2 className="tms-hero-main-subheading fw-semibold mb-4">
                                Your service requests in one unified workspace.
                            </h2>
                            <p className="tms-hero-description lead mb-4">
                                Automate ticket creation, approvals, escalations, and closure confirmations.
                                Role-based dashboards, integrated chat, and real-time alerts ensure nothing
                                slips through the cracks.
                            </p>
                            <h3 className="tms-hero-sub-description fw-semibold mb-4">
                                Empower teams to respond faster, stay accountable, and deliver better service.
                            </h3>
                            <div className="tms-hero-button-group d-flex flex-column flex-md-row gap-3 justify-content-center justify-content-lg-start">
                                <Button
                                    size="lg"
                                    className="tms-hero-start-button rounded-pill px-4 py-2"
                                    onClick={handleOpenPopup}
                                >
                                    Book a Free Demo
                                </Button>

                                <DemoBookingPopup isOpen={isPopupOpen} onClose={handleClosePopup} />

                                <Button
                                    variant="outline-dark"
                                    size="lg"
                                    className="tms-hero-explore-button rounded-pill px-4 py-2"
                                >
                                    Explore ticketing features <span className="tms-hero-explore-arrow ms-2">&rarr;</span>
                                </Button>
                            </div>
                        </Col>
                        <Col lg={6} className="tms-hero-right-col text-center">
                            <Image
                                src={processImage}
                                alt="Ticketing workflow preview"
                                fluid
                                className="tms-hero-image rounded shadow-lg"
                            />
                        </Col>
                    </Row>
                </Container>
            </Container>

            {/* What the System Does Section */}
            <Container className="tms-what-section py-5">
                <h2 className="tms-section-heading display-5 fw-bold text-center mb-3">
                    Keep every request organized, accountable, and traceable.
                </h2>
                <p className="tms-section-description lead text-center mb-5 mx-auto">
                    The Ticketing Management System streamlines your operational workflow with structured
                    ticket flows, clear ownership, and real-time collaboration.
                </p>

                <Row className="tms-what-row g-4 justify-content-center">
                    <Col md={6} lg={4}>
                        <Card className="tms-what-card h-100 p-4 border-0 rounded-4 shadow-sm">
                            <Card.Body className="tms-what-card-body text-center">
                                <h3 className="tms-what-title mb-3">Effortless Ticket Creation</h3>
                                <p className="tms-what-text">
                                    Employees raise requests with priorities, attachments, expected dates,
                                    and department selection—each ticket gets a unique tracking ID.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card className="tms-what-card h-100 p-4 border-0 rounded-4 shadow-sm">
                            <Card.Body className="tms-what-card-body text-center">
                                <h3 className="tms-what-title mb-3">Role-Based Dashboards</h3>
                                <p className="tms-what-text">
                                    Requestors, supporting staff, and HODs each get dedicated dashboards to
                                    submit, act on, and approve tickets.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card className="tms-what-card h-100 p-4 border-0 rounded-4 shadow-sm">
                            <Card.Body className="tms-what-card-body text-center">
                                <h3 className="tms-what-title mb-3">End-to-End Visibility</h3>
                                <p className="tms-what-text">
                                    Every action—submission, review, escalation, resolution, and acknowledgement—
                                    is fully tracked in one place.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Workflow Section */}
            <Container fluid className="tms-workflow-section py-5">
                <h2 className="tms-workflow-heading display-5 fw-bold text-center mb-3">
                    Structured workflow from first click to final closure.
                </h2>
                <p className="tms-workflow-description lead text-center mb-5 mx-auto">
                    A clear, step-by-step flow ensures every ticket is handled with clarity,
                    accountability, and timely action.
                </p>

                <Row className="tms-workflow-row align-items-center justify-content-center">
                    <Col lg={7} className="tms-workflow-img-col mb-4 mb-lg-0 text-center">
                        <Image
                            src={currentImg}
                            alt="Ticketing workflow visual"
                            fluid
                            className="tms-workflow-image rounded shadow-lg"
                        />
                    </Col>
                    <Col lg={5} className="tms-workflow-accordion-col">
                        <Accordion
                            activeKey={expandedSection}
                            onSelect={handleSectionClick}
                            className="tms-workflow-accordion"
                        >
                            <Accordion.Item eventKey="requestor" className="tms-accordion-item">
                                <Accordion.Header className="tms-accordion-header">
                                    <h2 className="tms-accordion-title">1. Requestor</h2>
                                </Accordion.Header>
                                <Accordion.Body className="tms-accordion-body">
                                    <p>
                                        Creates a ticket with all required details. If revisions are requested,
                                        they update and resubmit for processing.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="supporting" className="tms-accordion-item">
                                <Accordion.Header className="tms-accordion-header">
                                    <h2 className="tms-accordion-title">2. Supporting Staff</h2>
                                </Accordion.Header>
                                <Accordion.Body className="tms-accordion-body">
                                    <p>
                                        Reviews incoming tickets, accepts or rejects requests, resolves them, or
                                        escalates complex issues to the HOD.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="hod" className="tms-accordion-item">
                                <Accordion.Header className="tms-accordion-header">
                                    <h2 className="tms-accordion-title">3. Department Head (HOD)</h2>
                                </Accordion.Header>
                                <Accordion.Body className="tms-accordion-body">
                                    <p>
                                        Handles escalated tickets with actions such as resolve or close, bringing
                                        higher-level decisions into the workflow.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="ack" className="tms-accordion-item">
                                <Accordion.Header className="tms-accordion-header">
                                    <h2 className="tms-accordion-title">4. Requestor Acknowledgement</h2>
                                </Accordion.Header>
                                <Accordion.Body className="tms-accordion-body">
                                    <p>
                                        The requestor confirms the resolution, ensuring the ticket is officially
                                        closed with full satisfaction and record.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </Container>

            {/* Key Features Grid */}
            <Container className="tms-features-grid-section py-5">
                <h2 className="tms-features-main-heading display-5 fw-bold text-center mb-3">
                    Everything you need to manage tickets with precision.
                </h2>
                <p className="tms-features-description lead text-center mb-5 mx-auto">
                    From smart ticket creation and automated routing to escalation management,
                    chat, reports, and secure architecture—TMS covers the full lifecycle.
                </p>

                <Row className="tms-features-grid-row g-4 justify-content-center">
                    <Col md={6} lg={4}>
                        <Card className="tms-feature-card h-100 p-4 border-0 rounded-4 shadow-sm">
                            <Card.Body className="tms-feature-card-body d-flex flex-column align-items-center text-center">
                                <div className="tms-feature-icon-wrapper mb-3">
                                    <FontAwesomeIcon icon={faTicketAlt} size="2x" className="tms-feature-icon" />
                                </div>
                                <Card.Title as="h3" className="tms-feature-card-title mb-2">
                                    Smart Ticket Creation
                                </Card.Title>
                                <Card.Text className="tms-feature-card-text">
                                    Capture detailed requests with priorities, attachments, expected resolutions, and auto-generated tracking IDs.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card className="tms-feature-card h-100 p-4 border-0 rounded-4 shadow-sm">
                            <Card.Body className="tms-feature-card-body d-flex flex-column align-items-center text-center">
                                <div className="tms-feature-icon-wrapper mb-3">
                                    <FontAwesomeIcon icon={faUserCog} size="2x" className="tms-feature-icon" />
                                </div>
                                <Card.Title as="h3" className="tms-feature-card-title mb-2">
                                    Role-Based Dashboards
                                </Card.Title>
                                <Card.Text className="tms-feature-card-text">
                                    Dedicated views for requestors, supporting staff, and HODs ensure clarity on responsibilities and next actions.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card className="tms-feature-card h-100 p-4 border-0 rounded-4 shadow-sm">
                            <Card.Body className="tms-feature-card-body d-flex flex-column align-items-center text-center">
                                <div className="tms-feature-icon-wrapper mb-3">
                                    <FontAwesomeIcon icon={faSitemap} size="2x" className="tms-feature-icon" />
                                </div>
                                <Card.Title as="h3" className="tms-feature-card-title mb-2">
                                    Automated Workflow
                                </Card.Title>
                                <Card.Text className="tms-feature-card-text">
                                    Configurable flows from submission to approval, resolution, escalation, and closure keep tickets moving smoothly.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card className="tms-feature-card h-100 p-4 border-0 rounded-4 shadow-sm">
                            <Card.Body className="tms-feature-card-body d-flex flex-column align-items-center text-center">
                                <div className="tms-feature-icon-wrapper mb-3">
                                    <FontAwesomeIcon icon={faBell} size="2x" className="tms-feature-icon" />
                                </div>
                                <Card.Title as="h3" className="tms-feature-card-title mb-2">
                                    Real-Time Notifications
                                </Card.Title>
                                <Card.Text className="tms-feature-card-text">
                                    Automatic email and in-app alerts ensure every stakeholder stays updated at each stage of the ticket lifecycle.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card className="tms-feature-card h-100 p-4 border-0 rounded-4 shadow-sm">
                            <Card.Body className="tms-feature-card-body d-flex flex-column align-items-center text-center">
                                <div className="tms-feature-icon-wrapper mb-3">
                                    <FontAwesomeIcon icon={faComments} size="2x" className="tms-feature-icon" />
                                </div>
                                <Card.Title as="h3" className="tms-feature-card-title mb-2">
                                    Built-in Chat
                                </Card.Title>
                                <Card.Text className="tms-feature-card-text">
                                    Collaborate within each ticket via contextual chat to clarify requirements and resolve issues faster.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card className="tms-feature-card h-100 p-4 border-0 rounded-4 shadow-sm">
                            <Card.Body className="tms-feature-card-body d-flex flex-column align-items-center text-center">
                                <div className="tms-feature-icon-wrapper mb-3">
                                    <FontAwesomeIcon icon={faChartBar} size="2x" className="tms-feature-icon" />
                                </div>
                                <Card.Title as="h3" className="tms-feature-card-title mb-2">
                                    Reports & Analytics
                                </Card.Title>
                                <Card.Text className="tms-feature-card-text">
                                    Track ticket volume, resolution time, department performance, and SLA compliance with interactive dashboards.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card className="tms-feature-card h-100 p-4 border-0 rounded-4 shadow-sm">
                            <Card.Body className="tms-feature-card-body d-flex flex-column align-items-center text-center">
                                <div className="tms-feature-icon-wrapper mb-3">
                                    <FontAwesomeIcon icon={faShieldAlt} size="2x" className="tms-feature-icon" />
                                </div>
                                <Card.Title as="h3" className="tms-feature-card-title mb-2">
                                    Secure Architecture
                                </Card.Title>
                                <Card.Text className="tms-feature-card-text">
                                    Role-based permissions, encryption-ready design, and cloud-ready deployment on AWS for scale and reliability.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Benefits Section */}
            <Container fluid className="tms-benefits-section py-5">
                <Container>
                    <h2 className="tms-benefits-heading display-5 fw-bold text-center mb-3">
                        Benefits for your organization.
                    </h2>
                    <p className="tms-benefits-description lead text-center mb-5 mx-auto">
                        Improve productivity, accountability, and user satisfaction with a single,
                        unified ticketing backbone.
                    </p>

                    <Row className="tms-benefits-row g-4 justify-content-center">
                        <Col md={6} lg={4}>
                            <Card className="tms-benefit-card h-100 p-4 border-0 rounded-4 shadow-sm">
                                <Card.Body>
                                    <h3 className="tms-benefit-title mb-3">Increased Productivity</h3>
                                    <p className="tms-benefit-text">
                                        Automated workflows and clear roles reduce manual follow-ups, delays,
                                        and confusion across teams.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="tms-benefit-card h-100 p-4 border-0 rounded-4 shadow-sm">
                                <Card.Body>
                                    <h3 className="tms-benefit-title mb-3">Transparent Communication</h3>
                                    <p className="tms-benefit-text">
                                        Every action on a ticket is logged, visible, and traceable for all
                                        relevant stakeholders.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="tms-benefit-card h-100 p-4 border-0 rounded-4 shadow-sm">
                                <Card.Body>
                                    <h3 className="tms-benefit-title mb-3">Faster Resolution Times</h3>
                                    <p className="tms-benefit-text">
                                        Instant alerts, clear routing, and escalation paths ensure quick
                                        decisions and faster closures.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="tms-benefit-card h-100 p-4 border-0 rounded-4 shadow-sm">
                                <Card.Body>
                                    <h3 className="tms-benefit-title mb-3">Improved Accountability</h3>
                                    <p className="tms-benefit-text">
                                        Roles and status histories make it clear who is responsible for each
                                        step of the process.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="tms-benefit-card h-100 p-4 border-0 rounded-4 shadow-sm">
                                <Card.Body>
                                    <h3 className="tms-benefit-title mb-3">Actionable Insights</h3>
                                    <p className="tms-benefit-text">
                                        Analytics help managers plan resources, track SLAs, and continuously
                                        improve service quality.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="tms-benefit-card h-100 p-4 border-0 rounded-4 shadow-sm">
                                <Card.Body>
                                    <h3 className="tms-benefit-title mb-3">Reduced Operational Overhead</h3>
                                    <p className="tms-benefit-text">
                                        Digital workflows eliminate paper trails, redundant communication, and
                                        manual data errors.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Container>

            {/* Why Kodivian Section */}
            <Container className="tms-why-section py-5">
                <Row className="align-items-center justify-content-center">
                    <Col lg={6} className="mb-4 mb-lg-0">
                        <h2 className="tms-why-heading display-5 fw-bold mb-4">
                            Why choose Kodivian’s Ticketing System?
                        </h2>
                        <ul className="tms-why-list">
                            <li>Built with React &amp; Python for performance and scalability.</li>
                            <li>Cloud-ready architecture with AWS EC2, S3, and load balancers.</li>
                            <li>Designed for Manufacturing, IT, HR, Facilities, and Admin teams.</li>
                            <li>Fully customizable workflows to match your organization’s needs.</li>
                            <li>Professional support, continuous upgrades, and future-ready enhancements.</li>
                        </ul>
                        <p className="tms-why-footnote mt-3">
                            Kodivian delivers a reliable, fast, and user-friendly ticketing platform tailored for modern enterprises.
                        </p>
                    </Col>
                    <Col lg={5} className="text-center">
                        <Image
                            src={websiteImage}
                            alt="Kodivian SupportForge dashboard"
                            fluid
                            className="tms-why-image rounded shadow-lg"
                        />
                    </Col>
                </Row>
            </Container>

            {/* Conclusion – short in 2 lines */}
            <Container fluid className="tms-conclusion-section py-5 text-center">
                <p className="tms-conclusion-text lead mb-2">
                    Kodivian Ticketing Tool Management System is your operational backbone for managing service requests across departments.
                </p>
                <p className="tms-conclusion-text lead mb-0">
                    From the moment a ticket is raised to final confirmation, TMS brings structure, speed, and clarity to every interaction.
                </p>
            </Container>

            {/* FAQ Section */}
            <Container className="tms-faq-section py-5">
                <h2 className="tms-faq-main-heading display-5 fw-bold text-center mb-5">
                    Frequently Asked Questions
                </h2>
                <Accordion
                    activeKey={expandedQuestion}
                    onSelect={handleQuestionClick}
                    className="tms-faq-accordion text-center mx-auto"
                >
                    {faqData.map((faq, index) => (
                        <Accordion.Item
                            eventKey={faq.question}
                            key={`faq-${index}`}
                            className="tms-faq-accordion-item text-center mb-3"
                        >
                            <Accordion.Header className="tms-faq-accordion-header text-center">
                                {faq.question}
                            </Accordion.Header>
                            <Accordion.Body className="tms-faq-accordion-body">
                                {faq.answer}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>

                {/* Query Box */}
                <div className="tms-query-form-container text-center mt-5">
                    {!isQueryOpen ? (
                        <Button
                            variant="primary"
                            size="lg"
                            className="tms-query-toggle-button rounded-pill px-4 py-4"
                            onClick={openQueryBox}
                        >
                            Have a question about TMS? Send us a query
                        </Button>
                    ) : (
                        <div className="tms-query-form-box mx-auto p-4 rounded-4 shadow-lg position-relative">
                            <Button
                                variant="link"
                                className="tms-close-query-button position-absolute top-0 end-0 m-3 fs-3 text-dark"
                                onClick={closeQueryBox}
                                aria-label="Close"
                            >
                                &times;
                            </Button>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    className="tms-query-textarea form-control"
                                    placeholder="Enter your query here..."
                                    value={queryText}
                                    onChange={handleQueryChange}
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                className="tms-submit-query-button rounded-pill px-4 py-2"
                                onClick={handleSendQuery}
                            >
                                Submit Query
                            </Button>
                        </div>
                    )}
                </div>
            </Container>

            {/* Footer Section */}
            <div className="tms-footer-section py-4 text-center">
                <p className="tms-footer-text mb-0">
                    © Kodivian Ticketing Management System 2025. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default SupportForge;