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
    faBrain,
    faNetworkWired,
    faDatabase,
    faLink,
    faTachometerAlt,
    faUserLock,
} from '@fortawesome/free-solid-svg-icons';

import DemoBookingPopup from '../components/DemoBookingPopup';
import processImage from '../assets/processbuuild.png';
import websiteImage from '../assets/website.png'; // Default image
import formImage from '../assets/form.png'; // Image for "Intuitive design tools"
import workflowImage from '../assets/workflow.png'; // Image for "Familiar workflow"
import groupsImage from '../assets/user.png'; // Image for "Groups and layers"

import '../styles/Processbuilder.css'; // Custom styles

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

const Processbuilder = () => {
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
    const closeQueryBox = () => setIsQueryOpen(false); // Added close function

    const handleQueryChange = (event) => {
        setQueryText(event.target.value);
    };

    const handleSendQuery = async () => {
        if (queryText.trim()) {
            try {
                // In a real application, replace this with your actual API endpoint
                const response = await fetch('http://localhost:5173/processbuilder', {
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

    const [expandedSection, setExpandedSection] = useState('intuitive'); // Initialize with 'intuitive' open
    const [currentImg, setCurrentImg] = useState(formImage); // Initialize with the corresponding image

    const handleSectionClick = (section) => {
        if (expandedSection === section) {
            setExpandedSection(null);
            setCurrentImg(websiteImage); // Revert to a general default image when collapsing (optional)
        } else {
            setExpandedSection(section);
            switch (section) {
                case 'intuitive':
                    setCurrentImg(formImage);
                    break;
                case 'familiar':
                    setCurrentImg(workflowImage);
                    break;
                case 'groups':
                    setCurrentImg(groupsImage);
                    break;
                default:
                    setCurrentImg(websiteImage); // Fallback to default if needed
            }
        }
    };

    return (
        <div className="pb-main-page-wrapper">
            {/* Hero Section */}
            <Container fluid className="pb-hero-section py-5">
              <h1 className="pb-hero-top-heading display-3 fw-bold text-center mb-3">Design without limits using <br />our powerful freehand editor</h1>
                <p className="pb-freehand-editor-description lead text-center mb-5 mx-auto">
                    Create stunning apps effortlessly with our drag-and-drop platform. No coding needed, just customize, launch, and manage everything from one powerful interface.
                </p>
                <Container className="text-center pb-hero-content-container">
                    <Row className="pb-hero-row align-items-center justify-content-center pt-5">
                        <Col lg={6} className="pb-hero-left-col text-center text-lg-start mb-4 mb-lg-0">
                         <h1 className="pb-hero-main-heading display-2 fw-bold mb-4">Click, Drag, Done.</h1>
                            <h1 className="pb-hero-main-heading display-2 fw-bold mb-4">Your App, <br /> Your Way!</h1>
                            <p className="pb-hero-description lead mb-4">
                                Streamline your operations and bring your ideas to life—without writing a single line of code. Our powerful no-code platform lets you automate workflows, manage user groups, and generate real-time dashboard reports with ease. Whether you're building internal tools, managing tasks, or integrating with third-party systems, everything is just a few clicks away.
                            </p>
                            <h3 className="pb-hero-sub-description fw-semibold mb-4">Empower your team to work smarter, faster, and more creatively.</h3>
                            <div className="pb-hero-button-group d-flex flex-column flex-md-row gap-3 justify-content-center justify-content-lg-start">
                               <Button
  size="lg"
  className="pb-hero-start-button rounded-pill px-4 py-2"
  onClick={handleOpenPopup}
>
  Start for free Demo
</Button>

                                <DemoBookingPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
                                <Button variant="outline-dark" size="lg" className="pb-hero-explore-button rounded-pill px-4 py-2">
                                    Explore features <span className="pb-hero-explore-arrow ms-2">&rarr;</span>
                                </Button>
                            </div>
                        </Col>
                        <Col lg={6} className="pb-hero-right-col text-center">
                            <Image src={processImage} alt="No-code website builder" fluid className="pb-hero-image rounded shadow-lg" />
                        </Col>
                    </Row>
                </Container>
            </Container>

            {/* Freehand Editor Section */}
            <Container fluid className="pb-freehand-editor-section py-5">
                <h1 className="pb-freehand-editor-heading display-5 fw-bold text-center mb-3">Design without limits using <br />our powerful freehand editor</h1>
                <p className="pb-freehand-editor-description lead text-center mb-5 mx-auto">
                    Create stunning apps effortlessly with our drag-and-drop platform. No coding needed, just customize, launch, and manage everything from one powerful interface.
                </p>

                <Row className="pb-freehand-editor-row align-items-center justify-content-center">
                    <Col lg={7} className="pb-freehand-editor-img-col mb-4 mb-lg-0 text-center">
                        <Image src={currentImg} alt="Section specific" fluid className="pb-freehand-editor-image rounded shadow-lg" />
                    </Col>
                    <Col lg={5} className="pb-freehand-editor-accordion-col">
                        <Accordion activeKey={expandedSection} onSelect={handleSectionClick} className="pb-freehand-editor-accordion">
                            <Accordion.Item eventKey="intuitive" className="pb-accordion-item-intuitive">
                                <Accordion.Header className="pb-accordion-header-intuitive">
                                    <h2 className="pb-accordion-title-intuitive">Smart Form Builder</h2>
                                </Accordion.Header>
                                <Accordion.Body className="pb-accordion-body-intuitive">
                                    <p className="pb-accordion-content-intuitive">Effortlessly create labels, buttons, conditions, and form elements in a dynamic, intuitive interface — no complexity, just creativity.</p>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="familiar" className="pb-accordion-item-familiar">
                                <Accordion.Header className="pb-accordion-header-familiar">
                                    <h2 className="pb-accordion-title-familiar">Seamless Workflow</h2>
                                </Accordion.Header>
                                <Accordion.Body className="pb-accordion-body-familiar">
                                    <p className="pb-accordion-content-familiar">Assign approvals, set rejections, manage user groups, and control page visibility — all through a streamlined, flexible workflow system built for productivity.</p>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="groups" className="pb-accordion-item-groups">
                                <Accordion.Header className="pb-accordion-header-groups">
                                    <h2 className="pb-accordion-title-groups">User Group Layer</h2>
                                </Accordion.Header>
                                <Accordion.Body className="pb-accordion-body-groups">
                                    <p className="pb-accordion-content-groups">Create user groups, assign specific users to workflows, control page approvals or rejections, and manage statuses like Active or Inactive.</p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </Container>

            {/* Features Grid Section */}
            <Container className="pb-features-grid-section py-5">
                <h1 className="pb-features-grid-main-heading display-5 fw-bold text-center mb-3">Click. Build. Inspire. Repeat!</h1>
                <p className="pb-features-grid-description lead text-center mb-5 mx-auto">
                    With our flexible components and powerful features, you can create any website you imagine. Whether it’s setting intelligent payment gateways, managing user authentication, or integrating third-party apps, we make it easy to bring your vision to life. Our goal is to make building a no-code website seamless and effortless for you.
                </p>

                <Row className="pb-features-grid-row g-4 justify-content-center">
                    {/* Card 1 */}
                    <Col md={6} lg={4}>
                        <Card className="pb-feature-card h-100 p-4 border-0 rounded-4 shadow-sm">
                            <Card.Body className="pb-feature-card-body d-flex flex-column align-items-center text-center">
                                <div className="pb-feature-icon-wrapper mb-3">
                                    <FontAwesomeIcon icon={faBrain} size="2x" className="pb-feature-icon-brain" />
                                </div>
                                <Card.Title as="h3" className="pb-feature-card-title mb-2">AI Powered <span className="pb-feature-badge-new badge bg-success ms-2">New</span></Card.Title>
                                <Card.Text className="pb-feature-card-text">
                                    Simply input your preferences, and watch as our tool generates a stunning, fully-functional site to your needs.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Card 2 */}
                    <Col md={6} lg={4}>
                        <Card className="pb-feature-card h-100 p-4 border-0 rounded-4 shadow-sm">
                            <Card.Body className="pb-feature-card-body d-flex flex-column align-items-center text-center">
                                <div className="pb-feature-icon-wrapper mb-3">
                                    <FontAwesomeIcon icon={faNetworkWired} size="2x" className="pb-feature-icon-network" />
                                </div>
                                <Card.Title as="h3" className="pb-feature-card-title mb-2">Gateway Integration</Card.Title>
                                <Card.Text className="pb-feature-card-text">
                                    Set intelligent gateway permissions based on conditions automatically approve specific actions.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Card 3 */}
                    <Col md={6} lg={4}>
                        <Card className="pb-feature-card h-100 p-4 border-0 rounded-4 shadow-sm">
                            <Card.Body className="pb-feature-card-body d-flex flex-column align-items-center text-center">
                                <div className="pb-feature-icon-wrapper mb-3">
                                    <FontAwesomeIcon icon={faDatabase} size="2x" className="pb-feature-icon-database" />
                                </div>
                                <Card.Title as="h3" className="pb-feature-card-title mb-2">Database Connectivity</Card.Title>
                                <Card.Text className="pb-feature-card-text">
                                    Connect your forms data to real-time cloud databases and manage data.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Card 4 */}
                    <Col md={6} lg={4}>
                        <Card className="pb-feature-card h-100 p-4 border-0 rounded-4 shadow-sm">
                            <Card.Body className="pb-feature-card-body d-flex flex-column align-items-center text-center">
                                <div className="pb-feature-icon-wrapper mb-3">
                                    <FontAwesomeIcon icon={faLink} size="2x" className="pb-feature-icon-link" />
                                </div>
                                <Card.Title as="h3" className="pb-feature-card-title mb-2">Third-Party App Integrations</Card.Title>
                                <Card.Text className="pb-feature-card-text">
                                    Create smarter workflows by connecting your site with the tools you already use.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Card 5 */}
                    <Col md={6} lg={4}>
                        <Card className="pb-feature-card h-100 p-4 border-0 rounded-4 shadow-sm">
                            <Card.Body className="pb-feature-card-body d-flex flex-column align-items-center text-center">
                                <div className="pb-feature-icon-wrapper mb-3">
                                    <FontAwesomeIcon icon={faTachometerAlt} size="2x" className="pb-feature-icon-tachometer" />
                                </div>
                                <Card.Title as="h3" className="pb-feature-card-title mb-2">Dashboard Model</Card.Title>
                                <Card.Text className="pb-feature-card-text">
                                    Create smarter workflows by connecting your site with the tools you already use.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Card 6 */}
                    <Col md={6} lg={4}>
                        <Card className="pb-feature-card h-100 p-4 border-0 rounded-4 shadow-sm">
                            <Card.Body className="pb-feature-card-body d-flex flex-column align-items-center text-center">
                                <div className="pb-feature-icon-wrapper mb-3">
                                    <FontAwesomeIcon icon={faUserLock} size="2x" className="pb-feature-icon-user-lock" />
                                </div>
                                <Card.Title as="h3" className="pb-feature-card-title mb-2">User Authentication</Card.Title>
                                <Card.Text className="pb-feature-card-text">
                                    Manage user roles, permissions, and profiles effortlessly without coding and personalized for every visitor.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Projects Section */}
            <Container fluid className="pb-projects-section py-5 text-center">
                <Container className="pb-projects-content-container">
                    <p className="pb-projects-intro lead mb-2 text-primary">Introducing processbuilder Projects</p>
                    <h1 className="pb-projects-main-heading display-4 fw-bold mb-4">
                        Build software <span className="pb-projects-badge-new badge bg-success fs-5">NEW</span>{' '}
                        <span className="pb-projects-together">together</span>{' '}
                        <span className="pb-projects-badge-beta badge bg-warning text-dark fs-5">BETA</span>
                    </h1>
                    <p className="pb-projects-subtitle lead mb-5 mx-auto">
                        Projects are version control for fast-moving teams. Create a project to
                        collaborate seamlessly, securely, and asynchronously without the
                        frustration of learning Git.
                    </p>
                    <div className="pb-projects-button-group d-flex flex-column flex-md-row gap-3 justify-content-center">
                        <Button variant="primary" size="lg" className="pb-projects-start-button rounded-pill px-4 py-2">
                            Start building
                        </Button>
                        <Button variant="outline-dark" size="lg" className="pb-projects-book-demo-button rounded-pill px-4 py-2" onClick={handleOpenPopup}>
                            BOOK DEMO
                        </Button>
                        <DemoBookingPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
                    </div>
                </Container>
            </Container>

            {/* FAQ Section */}
            <Container className="pb-faq-section py-5">
                <h2 className="pb-faq-main-heading display-5 fw-bold text-center mb-5">Frequently Asked Questions</h2>
                <Accordion activeKey={expandedQuestion} onSelect={handleQuestionClick} className="pb-faq-accordion mx-auto">
                    {faqData.map((faq, index) => (
                        <Accordion.Item eventKey={faq.question} key={`faq-${index}`} className="pb-faq-accordion-item mb-3">
                            <Accordion.Header className="pb-faq-accordion-header">
                                {faq.question}
                            </Accordion.Header>
                            <Accordion.Body className="pb-faq-accordion-body">
                                {faq.answer}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>

               <div className="query-form-container text-center mt-5">
  {!isQueryOpen ? (
    <Button
      variant="primary"
      size="lg"
      className="query-toggle-button rounded-pill px-4 py-2"
      onClick={openQueryBox}
    >
      Have a Question? Send us a Query
    </Button>
  ) : (
    <div className="query-form-box mx-auto p-4 rounded-4 shadow-lg position-relative">
      <Button
        variant="link"
        className="close-query-button position-absolute top-0 end-0 m-3 fs-3 text-dark"
        onClick={closeQueryBox}
        aria-label="Close"
      >
        &times;
      </Button>

      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={4}
          className="query-textarea form-control"
          placeholder="Enter your query here..."
          value={queryText}
          onChange={handleQueryChange}
        />
      </Form.Group>

      <Button
        variant="primary"
        className="submit-query-button rounded-pill px-4 py-2"
        onClick={handleSendQuery}
      >
        Submit Query
      </Button>
    </div>
  )}
</div>

            </Container>

            {/* Footer Section */}
            <div className="pb-footer-section py-4 text-center">
                <p className="pb-footer-text mb-0">
                    © Kodivian.processbuilder 2025. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Processbuilder;