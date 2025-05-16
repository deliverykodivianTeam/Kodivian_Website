import React, { useState } from 'react';
import '../styles/Scanify.css';
import invoiceImage from '../assets/invoice.png';
import DemoBookingPopup from '../components/DemoBookingPopup';
import ocrFunctions from '../assets/ocrFunctions.png';
import scannerImage from '../assets/Scannerimage.png';
import {
    FaFileInvoiceDollar,
    FaDownload,
    FaExchangeAlt,
    FaNetworkWired,
    FaTasks,
    FaCloudUploadAlt,
} from "react-icons/fa";

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

const ScanifyDetailScan = () => {
    const [expandedQuestion, setExpandedQuestion] = useState(null);
    const [isQueryOpen, setIsQueryOpen] = useState(false);
    const [queryText, setQueryText] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleQuestionClick = (question) => {
        setExpandedQuestion(expandedQuestion === question ? null : question);
    };

    const openQueryBox = () => {
        setIsQueryOpen(true);
    };

    const handleQueryChange = (event) => {
        setQueryText(event.target.value);
    };

    const handleSendQuery = () => {
        if (queryText.trim()) {
            alert(`Your query "${queryText}" has been noted. We will get back to you via email.`);
            setIsQueryOpen(false);
            setQueryText('');
            // In a real scenario, you would use an API call here:
            // fetch('/api/send-query', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: queryText }) });
        } else {
            alert('Please enter your query.');
        }
    };

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="scanify-page-scan">
            <div className="scanify-hero-scan">
                <div className="hero-left-scan">
                    <div className="tagline-container-scan">
                        <button className="tagline-button-scan">Introducing our Insights<span className="arrow-icon1-scan">→</span></button>
                    </div>
                    <h2 className="hero-subheading-scan">
                        Conquering Your Invoicing Challenges
                    </h2>
                    <p className="hero-description-scan">
                        Customize your business journey effortlessly with our dashboard backed by a suite of powerful tools at your fingertips.
                    </p>
                    <div className="hero-buttons-scan">
                        <button onClick={handleOpenPopup} className="get-started-button-scan">Get Started a demo</button>
                        <DemoBookingPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
                        <button className="how-it-works-button-scan">
                            How it works <span className="arrow-icon-scan">→</span>
                        </button>
                    </div>
                    <p className="trust-message-scan">
                        Trusted by 50,000+ businesses to scale outbound
                    </p>
                </div>
                <div className="hero-right-scan">
                    <img src={invoiceImage} alt="Invoice" className="invoice-image-scan" />
                </div>
            </div>

            <div className="hero-secondary-scan">
                <h3 className="secondary-tagline-scan">Comprehensive</h3>
                <h1 className="secondary-heading-scan">
                    Smart Invoice Extraction Platform Starts with SCANIFY
                </h1>
                <p className="secondary-description-scan">
                    Effortlessly streamline your document workflow with advanced OCR
                    extraction, seamless SAP integration, and JSON-based invoice data
                </p>
            </div>

            {/* New Extractable Fields Section (Styled as Pill Buttons) */}
            <div className="extractable-fields-section-scan">
                <div className="extractable-fields-content-scan">
                    <div className="extractable-fields-image-container-scan">
                        <img
                            src={scannerImage}
                            alt="Scanner"
                            className="extractable-fields-image-scan"
                        />
                    </div>
                    <div className="extractable-fields-details-scan">
                        <div className="flat-fields-group-scan">
                            <h3>Vendor Detail</h3>
                            <div className="pill-buttons-container-scan">
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Tax ID</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Vendor Name</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Company name</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Address</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Contact</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Vendor GST</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Bank Detail</button>
                            </div>
                        </div>
                        <div className="flat-fields-group-scan">
                            <h3>Customer Detail</h3>
                            <div className="pill-buttons-container-scan">
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Tax ID</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Vendor Name</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Company name</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Address</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Contact</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Vendor GST</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Bank Detail</button>
                            </div>
                        </div>
                        <div className="flat-fields-group-scan">
                            <h3>Invoice Detail</h3>
                            <div className="pill-buttons-container-scan">
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Invoice Number</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Date</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Due Date</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> PO Number</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Total</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Currency</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> SubTotal</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Tax</button>
                            </div>
                        </div>
                        <div className="line-items-group-scan">
                            <h3>Line Item</h3>
                            <div className="pill-buttons-container-scan">
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Description</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Item Coder</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Quantity</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Unit Price</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Product Code</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Tax Rate</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> Line Total</button>
                                <button className="pill-button-scan"><span className="checkmark-scan">✓</span> CGST</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* New OCR Functions Section */}
            <div className="ocr-functions-section-scan">
                <h2 className="ocr-functions-heading-scan">
                    Core Functions of OCR in Invoice Processing with SCANIFY
                </h2>
                <div className="ocr-functions-content-scan">
                    <div className="ocr-functions-text-scan">
                        <ul>
                            <li>
                                <p>
                                    Easily upload PDFs or images from various sources such as
                                    email, cloud storage, or your desktop. With just a click, the
                                    documents are quickly uploaded and ready for extraction in a
                                    matter of seconds.
                                </p>
                            </li>
                            <li>
                                <p>
                                    OCR technology efficiently scans and extracts critical data
                                    from invoices, providing an easy-to-use interface for
                                    verification. This ensures that all extracted information is
                                    accurate and error-free with minimal effort.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Upload invoices in batches, each containing multiple
                                    documents. Extract data from all invoices in seconds,
                                    streamlining the entire process and eliminating manual entry.
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className="ocr-functions-image-container-scan">
                        <img
                            src={ocrFunctions}
                            alt="OCR Functions"
                            className="ocr-functions-image-scan"
                        />
                    </div>
                </div>
            </div>

            {/* New All-in-one Invoice Platform Section */}
            <div className="all-in-one-platform-section-scan">
                <h2 className="all-in-one-heading-scan">All-in-one Smart invoice Management platform</h2>
                <p className="all-in-one-subheading-scan">
                    Effortlessly customize your business journey with our smart dashboard that enables invoice extraction to JSON and Excel, seamless SAP & Oracle integration, and powerful PDF tools.
                </p>
                <div className="all-in-one-features-container-scan">
                    <div className="all-in-one-feature-scan">
                        <div className="feature-icon-container-scan">
                            <FaFileInvoiceDollar />
                        </div>
                        <h3 className="feature-header-scan">Smart Data Export</h3>
                        <p className="feature-description-scan">Easily download extracted invoice data in Excel and JSON formats for smooth reporting and analysis.</p>
                    </div>
                    <div className="all-in-one-feature-scan">
                        <div className="feature-icon-container-scan">
                            <FaDownload />
                        </div>
                        <h3 className="feature-header-scan">Automated Data Transfer</h3>
                        <p className="feature-description-scan">Automatically push invoice data to your ERP systems using robust API integrations.</p>
                    </div>
                    <div className="all-in-one-feature-scan">
                        <div className="feature-icon-container-scan">
                            <FaExchangeAlt />
                        </div>
                        <h3 className="feature-header-scan">ERP Connectivity</h3>
                        <p className="feature-description-scan">Seamlessly connect with major ERP platforms like SAP, Odoo, Microsoft Dynamics, Oracle EBS, Oracle Fusion, and NetSuite .</p>
                    </div>
                    <div className="all-in-one-feature-scan">
                        <div className="feature-icon-container-scan">
                            <FaNetworkWired />
                        </div>
                        <h3 className="feature-header-scan">Batch Invoice Processing</h3>
                        <p className="feature-description-scan">Select and manage multiple invoices at once—review, process, and approve them effortlessly in a single streamlined workflow.</p>
                    </div>
                    <div className="all-in-one-feature-scan">
                        <div className="feature-icon-container-scan">
                            <FaTasks />
                        </div>
                        <h3 className="feature-header-scan">Effortless Document Import</h3>
                        <p className="feature-description-scan">Easily upload invoices as PDFs or images from various sources including email, APIs, desktop, Google Drive, Dropbox, RPA tools, or any cloud storage service.</p>
                    </div>
                    <div className="all-in-one-feature-scan">
                        <div className="feature-icon-container-scan">
                            <FaCloudUploadAlt />
                        </div>
                        <h3 className="feature-header-scan">Multi-Language OCR Support</h3>
                        <p className="feature-description-scan">Our powerful Invoice OCR API extracts data from invoices written in multiple languages—making global document handling truly seamless.</p>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="faq-section-scan">
                <h2 className="faq-heading-scan">Frequently Asked Questions</h2>
                <ul className="faq-list-scan">
                    {faqData.map((faq, index) => (
                        <li key={index} className="faq-item-scan">
                            <div
                                className="faq-question-scan"
                                onClick={() => handleQuestionClick(faq.question)}
                            >
                                {faq.question}
                                <span className="faq-toggle-scan">
                                    {expandedQuestion === faq.question ? '-' : '+'}
                                </span>
                            </div>
                            {expandedQuestion === faq.question && (
                                <div className="faq-answer-scan">{faq.answer}</div>
                            )}
                        </li>
                    ))}
                </ul>
                <div className="faq-query-container-scan">
                    {!isQueryOpen ? (
                        <button className="faq-query-button-scan" onClick={openQueryBox}>
                            Have a Question? Send us a Query
                        </button>
                    ) : (
                        <div className="query-input-area-scan">
                            <textarea
                                className="query-textbox-scan"
                                placeholder="Enter your query here..."
                                value={queryText}
                                onChange={handleQueryChange}
                            />
                            <button className="query-submit-button-scan" onClick={handleSendQuery}>
                                Submit Query
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* New Bottom Section */}
            <div className="bottom-cta-section-scan">
                <p className="copyright-info-scan">
                    © Kodivian.scanify 2025. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default ScanifyDetailScan;