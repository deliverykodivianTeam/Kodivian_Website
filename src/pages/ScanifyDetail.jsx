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


const ScanifyDetail = () => {

  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [isQueryOpen, setIsQueryOpen] = useState(false);
  const [queryText, setQueryText] = useState('');

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
      // In a real application, you would implement the logic to send the query
      // to your backend or directly trigger an email.
      alert(`Your query "${queryText}" has been noted. We will get back to you via email.`);
      setIsQueryOpen(false); // Close the query box after "sending"
      setQueryText('');     // Clear the query text
      // In a real scenario, you would use an API call here:
      // fetch('/api/send-query', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: queryText }) });
    } else {
      alert('Please enter your query.');
    }
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
    const handleOpenPopup = () => {
      setIsPopupOpen(true);
    };
  
    const handleClosePopup = () => {
      setIsPopupOpen(false);
    };

  return (
    <div>
    <div className="scanify-container">
      <div className="left-content">
        <div className="main-heading-container">
          <button className="main-heading-button">Introducing our Insights<span className="arrow-icon1">→</span></button>
        </div>
        <h6 className="sub-heading">
          Conquering Your Invoicing Challenges
        </h6>
        <p className="description">
          Customize your business journey effortlessly with our dashboard backed by a suite of powerful tools at your fingertips.
        </p>
        <div className="button-group">
          <button onClick={handleOpenPopup} className="get-started-button">Get Started</button>
          <DemoBookingPopup isOpen={isPopupOpen} onClose={handleClosePopup} />  
          <button className="how-it-works-button">
            How it works <span className="arrow-icon">→</span>
          </button>
        </div>
        <p className="trust-message">
          Trusted by 50,000+ businesses to scale outbound
        </p>
      </div>
      <div className="right-content">
        <img src={invoiceImage} alt="Invoice" className="invoice-image" />
      </div>
      </div>
      <div  className="hero-section-integrated">
        <h2 className="hero1-heading-integrated">Comprehensive</h2>
        <h1 className="hero-heading-integrated">
          Smart Invoice Extraction Platform Starts with SCANIFY </h1>
        <p className="hero-subheading-integrated">
          Effortlessly streamline your document workflow with advanced OCR
          extraction, seamless SAP integration, and JSON-based invoice data
        </p>
      </div>


       {/* New Extractable Fields Section (Styled as Pill Buttons) */}
       <div className="extractable-fields-section-pill">
          <div className="extractable-fields-content-pill">
             <div className="extractable-fields-image-container-pill">
              <img
                src={scannerImage}
                alt="Scanner"
                className="extractable-fields-image-pill"
              />
            </div>
            <div className="extractable-fields-buttons-left">
              <div className="flat-fields">
                <h3>Vendor Detail</h3>
                <button className="pill-button">
                  <span className="checkmark">✓</span> Tax ID
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span>Vendor Name
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span> Company name
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span> Address
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span> Contact
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span>Vendor GST
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span>Bank Detail
                </button>
              </div>
              <div className="flat-fields">
                <h3>Customer Detail</h3>
                <button className="pill-button">
                  <span className="checkmark">✓</span> Tax ID
                </button>
                <button className="pill-button">
                  <span classNamecheckmark>✓</span>Vendor Name
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span> Company name
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span> Address
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span> Contact
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span>Vendor GST
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span>Bank Detail
                </button>
              </div>
              <div className="flat-fields">
                <h3>Invoice Detail</h3>
                <button className="pill-button">
                  <span className="checkmark">✓</span> Invoice Number
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span> Date
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span>Due Date
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span> PO Number
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span> Total
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span> Currency
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span> SubTotal
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span> Tax
                </button>
              </div>
              <div className="line-items">
                <h3>Line Item</h3>
                <button className="pill-button">
                  <span className="checkmark">✓</span> Description
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span> Item Coder
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span> Quantity
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span> Unit Price
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span> Product Code
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span> Tax Rate
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span> Line Total
                </button>
                <button className="pill-button">
                  <span className="checkmark">✓</span> CGST
                </button>
              </div>
            </div>
          </div>
        </div>

   {/* New OCR Functions Section */}
   <div className="ocr-functions-section">
          <h2 className="ocr-functions-heading">
            Core Functions of OCR in Invoice Processing with SCANIFY
          </h2>
          <div className="ocr-functions-content">
            <div className="ocr-functions-text">
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
            <div className="ocr-functions-image-container">
              <img
                src={ocrFunctions}
                alt="OCR Functions"
                className="ocr-functions-image"
              />
            </div>
          </div>
        </div>

        {/* New All-in-one Invoice Platform Section */}
      <div className="all-in-one-platform-section">
        <h2 className="all-in-one-heading">All-in-one Smart invoice Management platform</h2>
        <p className="all-in-one-subheading">
        Effortlessly customize your business journey with our smart dashboard that enables invoice extraction to JSON and Excel, seamless SAP & Oracle integration, and powerful PDF tools.
        </p>
        <div className="all-in-one-features-container">
          <div className="all-in-one-feature">
            <div className="feature-icon-container">
             <FaFileInvoiceDollar></FaFileInvoiceDollar>
              {/* You'll need to style this container and potentially add an icon */}
           
            </div>
            <h3 className="feature-header">Smart Data Export</h3>
            <p className="feature-description">Easily download extracted invoice data in Excel and JSON formats for smooth reporting and analysis.</p>
          </div>
          {/* Add more feature blocks as needed */}
          <div className="all-in-one-feature">
            <div className="feature-icon-container">
              {/* You'll need to style this container and potentially add an icon */}
              <FaDownload></FaDownload>
            </div>
            <h3 className="feature-header">Automated Data Transfer</h3>
            <p className="feature-description">Automatically push invoice data to your ERP systems using robust API integrations.</p>
          </div>
          <div className="all-in-one-feature">
            <div className="feature-icon-container">
              {/* You'll need to style this container and potentially add an icon */}
              <FaExchangeAlt></FaExchangeAlt>
            </div>
            <h3 className="feature-header">ERP Connectivity</h3>
            <p className="feature-description">Seamlessly connect with major ERP platforms like SAP, Odoo, Microsoft Dynamics, Oracle EBS, Oracle Fusion, and NetSuite .</p>
          </div>
        </div>
        <div className="all-in-one-features-container">
          <div className="all-in-one-feature">
            <div className="feature-icon-container">
           
              {/* You'll need to style this container and potentially add an icon */}
              <FaNetworkWired></FaNetworkWired>
            </div>
            <h3 className="feature-header">Batch Invoice Processing</h3>
            <p className="feature-description">Select and manage multiple invoices at once—review, process, and approve them effortlessly in a single streamlined workflow.</p>
          </div>
          {/* Add more feature blocks as needed */}
          <div className="all-in-one-feature">
            <div className="feature-icon-container">
              {/* You'll need to style this container and potentially add an icon */}
              <FaTasks></FaTasks>
            </div>
            <h3 className="feature-header">Effortless Document Import</h3>
            <p className="feature-description">Easily upload invoices as PDFs or images from various sources including email, APIs, desktop, Google Drive, Dropbox, RPA tools, or any cloud storage service.</p>
          </div>
          <div className="all-in-one-feature">
            <div className="feature-icon-container">
              {/* You'll need to style this container and potentially add an icon */}
              <FaCloudUploadAlt></FaCloudUploadAlt>
            </div>
            <h3 className="feature-header">Multi-Language OCR Support</h3>
            <p className="feature-description">Our powerful Invoice OCR API extracts data from invoices written in multiple languages—making global document handling truly seamless.</p>
          </div>
        </div>
      </div>

       {/* FAQ Section */}
      <div className="faq-section">
        <h2 className="faq-heading">Frequently Asked Questions</h2>
        <ul className="faq-list">
          {faqData.map((faq, index) => (
            <li key={index} className="faq-item">
              <div
                className="faq-question"
                onClick={() => handleQuestionClick(faq.question)}
              >
                {faq.question}
                <span className="faq-toggle">
                  {expandedQuestion === faq.question ? '-' : '+'}
                </span>
              </div>
              {expandedQuestion === faq.question && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </li>
          ))}
        </ul>
        <div className="faq-query-container">
          {!isQueryOpen ? (
            <button className="faq-query-button" onClick={openQueryBox}>
              Have a Question? Send us a Query
            </button>
          ) : (
            <div className="query-input-area">
              <textarea
                className="query-textbox"
                placeholder="Enter your query here..."
                value={queryText}
                onChange={handleQueryChange}
              />
              <button className="query-submit-button" onClick={handleSendQuery}>
                Submit Query
              </button>
            </div>
          )}
        </div>
      </div>
       
         {/* New Bottom Section */}
      <div className="bottom-cta-section">
        <div className="bottom-cta-content">
          <div className="bottom-cta-left">
            <h3>Streamline your business with Pixl’s AI Enabled Solutions</h3>
          </div>
          <div className="bottom-cta-buttons">
            <button onClick={handleOpenPopup} className="book-demo-button">Book a Demo</button>
            <button className="talk-sales-button">Talk with Sales</button>
          </div>
        </div>
      {/* FAQ Section */}
      <div className="faq-section">
      <p className="faq-query-info">
            © Kodivian.scanify 2025. All rights reserved.
          </p>
      </div>
      </div>

    </div>
  );
};

export default ScanifyDetail;
