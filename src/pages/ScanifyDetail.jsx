import React from 'react';
import '../styles/Scanify.css';
import invoiceImage from '../assets/invoice.png';
import ocrFunctions from '../assets/ocrFunctions.png';
import scannerImage from '../assets/ocrFunctions.png';


const ScanifyDetail = () => {
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
          <button className="get-started-button">Get Started</button>
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
      <div className="hero-section-integrated">
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
          <div className="extractable-fields-image-container-pill">
            <img
              src={scannerImage}
              alt="Scanner"
              className="extractable-fields-image-pill"
            />
          </div>
        </div>
      </div>


 {/* New OCR Functions Section */}
 <div className="ocr-functions-section">
        <h2 className="ocr-functions-heading">
          Core Functions of OCR in Invoice Processing with SCANIFY
        </h2>
        <div className="ocr-functions-content">
          <div className="ocr-functions-image-container">
            <img
              src={ocrFunctions}
              alt="OCR Functions"
              className="ocr-functions-image"
            />
          </div>
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
                  OCR technology efficiently scans and extracts critical data from
                  invoices, providing an easy-to-use interface for verification.
                  This ensures that all extracted information is accurate and
                  error-free with minimal effort.
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
        </div>
      </div>

    </div>
  );
};

export default ScanifyDetail;
