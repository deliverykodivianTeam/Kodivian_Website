import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../styles/Blog.css';
import blogjkf from "../assets/blogjkf.png";
import svc0004 from "../assets/SVC0004.jpeg";
import svg_0004 from "../assets/SVG - 0004.jpg";
import svg_0060 from "../assets/SVG - 0060.jpg";
import svg_0070 from "../assets/SVG - 0070.jpg";
import svg_0225 from "../assets/SVG - 0225.jpg";
import svg_0296 from "../assets/SVG - 0296.jpg";
import svg_0322 from "../assets/SVG - 0322.jpg";
import svg_0326 from "../assets/SVG - 0326.jpg";
import svg_0001 from "../assets/SVG- 0001.jpeg";
import svg_0002 from "../assets/SVG- 0002.jpeg";
import svg_0003 from "../assets/SVG- 0003.jpeg";
import svg_0006 from "../assets/SVG-0006.png";
import img_6Q8A5617 from "../assets/6Q8A5617.JPG";
import img_6Q8A5630 from "../assets/6Q8A5630.JPG";
import img_6Q8A5698 from "../assets/6Q8A5698.JPG";
import img_6Q8A5738 from "../assets/6Q8A5738.JPG";
import office1 from "../assets/office1.jpeg";
import office2 from "../assets/office2.jpeg";
import event_4L1A2506 from "../assets/4L1A2506.JPG";
import event_4L1A2777 from "../assets/4L1A2777.JPG";
import scanify from "../assets/scanify.png";
import scanifyLogo1 from "../assets/scanify-logo1.png";
import event_4L1A2183 from "../assets/4L1A2183.JPG";
import event_4L1A2212 from "../assets/4L1A2212.JPG";
import event_4L1A2488 from "../assets/4L1A2488.JPG";
import event_4L1A2699 from "../assets/4L1A2699.JPG";
import event_4L1A2159 from "../assets/4L1A2159.JPG";
import event_4L1A2179 from "../assets/4L1A2179.JPG";
import event_4L1A2235 from "../assets/4L1A2235.JPG";
import event_4L1A2241 from "../assets/4L1A2241.JPG";
import event_4L1A2745 from "../assets/4L1A2745.JPG";
import event_4L1A2779 from "../assets/4L1A2779.JPG";
import event_4L1A2163 from "../assets/4L1A2163.JPG";
import event_4L1A2174 from "../assets/4L1A2174.JPG";
import event_4L1A2689 from "../assets/4L1A2689.JPG";
import event_4L1A2204 from "../assets/4L1A2204.JPG";
import event_4L1A1979 from "../assets/4L1A1979.JPG";
import event_4L1A2231 from "../assets/4L1A2231.JPG";




// Initial Mock Photos (24 Photos for the main gallery grid)
const initialPhotos = [
    { id: 25, url: office1, title: "Kodivian Workspace", category: "Celebrations", date: "Apr 2026" },
    { id: 26, url: office2, title: "Collaborative Coding", category: "Celebrations", date: "Jun 2026" },
    { id: 27, url: event_4L1A2506, title: "Kodivian Event Moment", category: "Events", date: "Jul 2026" },
    { id: 28, url: event_4L1A2777, title: "Team Gathering", category: "Events", date: "Jul 2026" },
    { id: 29, url: event_4L1A2183, title: "Kodivian Summit", category: "Events", date: "Jul 2026" },
    { id: 30, url: event_4L1A2212, title: "Event Collaboration", category: "Events", date: "Jul 2026" },
    { id: 31, url: event_4L1A2488, title: "Special Gathering", category: "Events", date: "Jul 2026" },
    { id: 32, url: event_4L1A2699, title: "Keynote Discussion", category: "Events", date: "Jul 2026" },
    { id: 33, url: event_4L1A2159, title: "Corporate Seminar", category: "Events", date: "Jul 2026" },
    { id: 34, url: event_4L1A2179, title: "Interaction Session", category: "Events", date: "Jul 2026" },
    { id: 35, url: event_4L1A2235, title: "Workshop & Summit", category: "Events", date: "Jul 2026" },
    { id: 36, url: event_4L1A2241, title: "Panel Discussion", category: "Events", date: "Jul 2026" },
    { id: 37, url: event_4L1A2745, title: "Innovative Brainstorming", category: "Events", date: "Jul 2026" },
    { id: 38, url: event_4L1A2779, title: "Team Achievement Discussion", category: "Events", date: "Jul 2026" },
    { id: 39, url: event_4L1A2163, title: "Kodivian Meetup", category: "Events", date: "Jul 2026" },
    { id: 40, url: event_4L1A2174, title: "Group Session", category: "Events", date: "Jul 2026" },
    { id: 41, url: event_4L1A2689, title: "Office Presentation", category: "Events", date: "Jul 2026" },
    { id: 42, url: event_4L1A2204, title: "Corporate Seminar Meet", category: "Events", date: "Jul 2026" },
    { id: 43, url: event_4L1A1979, title: "Kodivian Interactive Meet", category: "Events", date: "Jul 2026" },
    { id: 44, url: event_4L1A2231, title: "Kodivian Workshop Session", category: "Events", date: "Jul 2026" }
];

// Events Data
const eventsData = [
    {
        id: "cfo-event",
        title: "Kodivian Goes Gold : Empowering CFOs at the 45th CFO Summit 2026",
        subtitle: "Gold Partner",
        date: "June 12, 2026",
        category: "Events",
        summary: "As a Gold Partner at the 45th CFO Summit 2026, Kodivian Technologies showcased Scanify AI, our intelligent automation solution designed to streamline AP and AR processes through the power of AI.",
        description: "Kodivian Technologies was honored to participate as a Gold Partner at the 45th CFO Summit 2026, held on June 12 at GRT Grand, Chennai. The event brought together leading CFOs, finance professionals, and industry experts to explore the evolving role of technology in modern finance.\n\nAs part of the summit, Kodivian showcased Scanify AI, our intelligent automation solution built specifically for the CFO desk — designed to streamline Accounts Payable (AP) and Accounts Receivable (AR) processes through the power of AI. Attendees engaged with live demonstrations of how Scanify AI reduces manual effort, improves accuracy, and accelerates financial workflows for growing enterprises. The summit offered rich discussions on AI, automation, digital transformation, and the future of enterprise decision-making — themes that align closely with Kodivian's mission to help organizations modernize their finance operations through smart, scalable technology.\n\nWe're grateful for the meaningful conversations, new connections, and the opportunity to demonstrate how Kodivian's AI-powered solutions are helping businesses streamline operations and accelerate growth. We look forward to building stronger partnerships and driving innovation together in the finance ecosystem.",
        mainImage: svg_0070,
        photos: [
            svg_0070,
            svg_0001,
            svg_0002,
            svg_0003,
            svg_0004,
            svc0004,
            svg_0060,
            svg_0225,
            svg_0296,
            svg_0322,
            svg_0326
        ]
    },

    {
        id: "jk-fenner-case-study",
        title: "JK Fenner (India) Ltd. – AI-Powered Document Processing with Kodivian Scanify",
        subtitle: "Transforming Accounts Payable & Receivable Automation",
        date: "April 08, 2026",
        category: "Case Studies",
        summary:
            "Kodivian Technologies implemented Scanify for JK Fenner (India) Ltd. to automate Accounts Payable (AP) invoice and Accounts Receivable (AR) payment advice processing using AI-powered OCR, business rule validation, and structured document automation.",

        description:
            "Kodivian Technologies implemented Scanify for JK Fenner (India) Ltd. to automate the processing of Accounts Payable (AP) invoices and Accounts Receivable (AR) payment advice documents. The solution streamlines document ingestion, AI-powered OCR extraction, business rule validation, and structured data generation, reducing manual effort and improving operational efficiency.",

        deliverables: [
            "Automated document ingestion from Microsoft 365 mailboxes.",
            "AI-powered OCR extraction for Domestic Invoices, Import Invoices, AP Payment Advice, and AR Payment Advice.",
            "Intelligent document classification and extraction of header and line-item business fields.",
            "Configurable business rule validation for extracted data.",
            "Structured Excel and CSV output generation for downstream processing.",
            "Secure Document Management System (DMS) integration for document storage and retrieval.",
            "Microsoft OneDrive integration for automated output file delivery.",
            "Role-based user management with secure authentication.",
            "Email processing reports, audit logs, and operational dashboards for complete processing visibility.",
            "End-to-end document traceability with secure audit trails."
        ],

        mainImage: blogjkf,

        photos: [
            blogjkf,
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop"
        ]
    },
    {
        id: "scanify-analysis",
        title: "Scanify AI – Enterprise Intelligent Document Automation Analysis",
        subtitle: "Deep Dive into Layout-Aware OCR & Semantic Data Extraction",
        date: "June 25, 2026",
        category: "Case Studies",
        summary: "A comprehensive analysis of how Scanify AI uses layout-aware OCR pipelines, trained LLM extraction, and configurable business rules to automate enterprise document workflows with 99.5% accuracy.",
        description: "Scanify AI is Kodivian Technologies' signature Intelligent Document Processing (IDP) platform designed to automate the extraction of critical structured information from unstructured and semi-structured documents, such as supplier invoices, payment advice notes, purchase orders, bill of ladings, bank statements, contracts, and certificates. Using deep learning and advanced Optical Character Recognition (OCR), Scanify AI automatically extracts data with high accuracy, validates it using customizable business rules, and feeds it directly into downstream ERP systems like Microsoft Dynamics 365, SAP, NetSuite, and Sage X3.\n\nFrom ingestion to final storage, Scanify AI processes documents through a multi-stage pipeline:\n1. Intelligent Ingestion: Automatically imports files from emails (Microsoft 365/Gmail), local folders, or APIs.\n2. OCR and OCR-free Layout Analysis: Extracts spatial text and table grids, keeping the document context intact.\n3. Semantic Field Extraction: Uses layout transformers to isolate header details (Vendor, Date, Tax, Totals) and line items (Item Code, Description, Quantity, Unit Price) with over 99% accuracy.\n4. Business Rule Validation: Compares extracted data against purchase orders or vendor databases, flagging discrepancies.\n5. Automated Output & Integration: Syncs structured data directly with ERPs or exports standard formats (CSV, Excel, JSON).\n\nBy deploying Scanify AI, enterprises reduce document processing times by up to 85%, eliminate manual entry errors, and scale their accounts payable and receivable operations effortlessly without increasing headcount.",
        deliverables: [
            "AI-powered OCR and spatial document extraction.",
            "Multi-stage document parsing for invoices, purchase orders, and payment advice.",
            "Layout-aware semantic field mapping and line-item extraction.",
            "Dynamic business rule validation and three-way matching.",
            "Seamless integrations with top ERP systems (SAP, MS Dynamics, NetSuite).",
            "Automated document ingestion from various mailboxes and APIs.",
            "Interactive dashboard with real-time audit trails and discrepancy logs.",
            "Enterprise-grade security and role-based user management."
        ],
        mainImage: scanifyLogo1,
        photos: [
            scanifyLogo1,
            blogjkf
        ]
    }
];

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [activeEvent, setActiveEvent] = useState(null);
    const [lightboxImage, setLightboxImage] = useState(null);

    // Filter categories for the main photo gallery
    const categories = ["All", "Events", "Celebrations"];

    const filteredPhotos = selectedCategory === "All"
        ? initialPhotos
        : initialPhotos.filter(photo => photo.category === selectedCategory);

    // Open single event details popup modal
    const handleOpenEventModal = (event) => {
        setActiveEvent(event);
        document.body.style.overflow = "hidden"; // Disable scroll when modal is open
    };

    // Close single event details popup modal
    const handleCloseEventModal = () => {
        setActiveEvent(null);
        document.body.style.overflow = "unset";
    };

    // Open lightbox Zoom view
    const handleOpenLightbox = (photoUrl, photoTitle, photoMeta = "") => {
        setLightboxImage({ url: photoUrl, title: photoTitle, meta: photoMeta });
    };

    // Close lightbox Zoom view
    const handleCloseLightbox = () => {
        setLightboxImage(null);
    };

    return (
        <div className="blog-page-wrapper">
            {/* Hero Section */}
            <section className="blog-hero-section">
                <Container>
                    <h1 className="blog-hero-title">Kodivian Life & Events</h1>
                    <p className="blog-hero-subtitle">
                        Explore our company events, team achievements, office culture, and technological milestones.
                    </p>
                </Container>
            </section>

            {/* Featured CFO Event Banner (Overlapping Layout) */}
            <Container className="mb-5">
                <Row className="justify-content-center">
                    <Col lg={11}>
                        <div className="featured-event-banner p-4 p-md-5">
                            <Row className="align-items-center">
                                <Col md={6} className="mb-4 mb-md-0">
                                    <div className="pe-md-4">
                                        <h2 className="display-6 fw-bold text-dark-purple mb-3">
                                            {eventsData[0].title}
                                        </h2>
                                        <p className="text-muted mb-2">
                                            <i className="bi bi-calendar-event me-2 text-primary-purple"></i>
                                            {eventsData[0].date} | <strong>{eventsData[0].subtitle}</strong>
                                        </p>
                                        <p className="lead fs-6 text-secondary mb-4">
                                            {eventsData[0].summary}
                                        </p>
                                        <Button
                                            variant="primary"
                                            className="btn-blog-detail px-4 py-2"
                                            onClick={() => handleOpenEventModal(eventsData[0])}
                                        >
                                            View Event Details & Gallery
                                        </Button>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="position-relative overflow-hidden rounded-4" style={{ height: "320px", cursor: "pointer" }} onClick={() => handleOpenEventModal(eventsData[0])}>
                                        <img
                                            src={eventsData[0].mainImage}
                                            alt={eventsData[0].title}
                                            className="w-100 h-100 object-fit-cover event-img"
                                            style={{ transition: "transform 0.4s ease" }}
                                        />
                                        <div className="position-absolute bottom-0 end-0 bg-dark text-white px-3 py-1 m-3 rounded-2 opacity-75">
                                            <i className="bi bi-images me-1"></i> {eventsData[0].photos.length} Photos
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Other Events Grid */}
            <Container className="py-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bold text-dark-purple">Corporate Events & Summits</h2>
                    <p className="text-muted">A glimpse of our corporate culture</p>
                </div>

                <Row className="g-4 justify-content-center">
                    {eventsData.slice(1).map(event => (
                        <Col md={6} lg={5} key={event.id}>
                            <Card className="event-card">
                                <div className="event-img-wrapper" onClick={() => handleOpenEventModal(event)}>
                                    <img src={event.mainImage} alt={event.title} className="event-img" />
                                    <div className="event-date-badge">{event.date}</div>
                                </div>
                                <Card.Body className="event-card-body d-flex flex-column">
                                    <h4 className="event-card-title">{event.title}</h4>
                                    <Card.Text className="event-card-desc flex-grow-1">
                                        {event.summary}
                                    </Card.Text>
                                    <div className="mt-auto">
                                        <Button
                                            variant="primary"
                                            className="btn-blog-detail w-100"
                                            onClick={() => handleOpenEventModal(event)}
                                        >
                                            Explore Event Details
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* General Filterable Photo Gallery */}
            <Container className="py-5 bg-white rounded-5 shadow-sm mb-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bold text-dark-purple">Kodivian Moments Gallery</h2>
                    <p className="text-muted">High-resolution glimpses into our office lifestyle, celebrations, and conferences</p>
                </div>

                {/* Filter pill tabs */}
                <div className="filter-wrapper">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Photo Grid */}
                <Row className="g-4">
                    {filteredPhotos.map(photo => (
                        <Col sm={6} md={4} lg={3} key={photo.id}>
                            <div
                                className="gallery-item-wrapper"
                                onClick={() => handleOpenLightbox(photo.url, photo.title, `${photo.category} | ${photo.date}`)}
                            >
                                <img
                                    src={photo.url}
                                    alt={photo.title}
                                    className="gallery-photo"
                                    loading="lazy"
                                />
                                <div className="gallery-overlay">
                                    <span className="gallery-category">{photo.category}</span>
                                    <h5 className="gallery-title">{photo.title}</h5>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Individual Event Detail Modal */}
            {activeEvent && (
                <div className="event-modal-backdrop" onClick={handleCloseEventModal}>
                    <div className="event-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="event-modal-close-btn" onClick={handleCloseEventModal}>
                            &times;
                        </button>

                        <div className="event-modal-header-img-new">
                            <img src={activeEvent.mainImage} alt={activeEvent.title} />
                        </div>

                        <div className="event-modal-body">
                            <div className="event-modal-header-info mb-4">
                                <div className="event-modal-meta-new mb-2">
                                    <span className="event-modal-date">
                                        <i className="bi bi-calendar3 me-1"></i> {activeEvent.date}
                                    </span>
                                    <span className="mx-2 text-muted">|</span>
                                    <span className="event-modal-category-badge">
                                        <i className="bi bi-bookmark-fill me-1"></i> {activeEvent.category}
                                    </span>
                                </div>
                                <h2 className="event-modal-title-new">{activeEvent.title}</h2>
                                {activeEvent.subtitle && (
                                    <p className="event-modal-subtitle-new text-muted">{activeEvent.subtitle}</p>
                                )}
                                <hr className="my-3" style={{ opacity: 0.15 }} />
                            </div>

                            <p className="event-modal-description">{activeEvent.description}</p>

                            {activeEvent.deliverables && activeEvent.deliverables.length > 0 && (
                                <div className="event-modal-deliverables mb-4">
                                    <h4 className="event-modal-gallery-title">Key Deliverables & Features</h4>
                                    <ul className="list-unstyled ps-0">
                                        {activeEvent.deliverables.map((item, idx) => (
                                            <li key={idx} className="mb-2 d-flex align-items-start text-dark" style={{ fontSize: "1.05rem", lineHeight: "1.6" }}>
                                                <i className="bi bi-patch-check-fill text-primary-purple me-2 mt-1" style={{ fontSize: "1.1rem" }}></i>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <h4 className="event-modal-gallery-title">Event Photo Album</h4>
                            <div className="event-modal-grid">
                                {activeEvent.photos.map((photoUrl, idx) => (
                                    <div
                                        key={idx}
                                        className="event-modal-grid-item"
                                        onClick={() => handleOpenLightbox(photoUrl, `${activeEvent.title} - Photo ${idx + 1}`, `${activeEvent.category} | ${activeEvent.date}`)}
                                    >
                                        <img src={photoUrl} alt={`Event photo ${idx + 1}`} loading="lazy" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Full-Screen Lightbox Zoom View */}
            {lightboxImage && (
                <div className="lightbox-backdrop" onClick={handleCloseLightbox}>
                    <button className="lightbox-close-btn" onClick={handleCloseLightbox}>
                        &times;
                    </button>
                    <div className="lightbox-img-wrapper" onClick={e => e.stopPropagation()}>
                        <img src={lightboxImage.url} alt={lightboxImage.title} className="lightbox-img" />
                    </div>
                    <div className="lightbox-caption">
                        {lightboxImage.title}
                        {lightboxImage.meta && <div className="lightbox-meta">{lightboxImage.meta}</div>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blog;
