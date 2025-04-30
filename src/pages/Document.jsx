import React, { useState } from 'react';
import "../styles/Document.css";// You'll need to create this CSS file
import pepping1 from "../assets/pepping1.png";
import pepping2 from "../assets/pepping2.png";
import pepping3 from "../assets/pepping3.png";


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
    question: ' Can I automate the document approval process?',
    answer: 'Yes, you can automate the entire approval workflow. The platform allows you to set specific approval levels for documents, track their status in real-time, and send automated notifications to users at each step of the approval process. This ensures faster approvals and reduces bottlenecks in the workflow.',
  },
]; 


const Document = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            title: 'Step 1',
            label: 'Template Management',
            explanation: 'Effortlessly design and manage document templates within Intellidocs. Whether you’re creating invoices, contracts, or reports, our platform allows you to define reusable templates that can be customized for specific needs. Automate the document creation process and ensure consistency across your organization every time.',
            img: pepping1 ,
          },
        {
            title: 'Step 2',
            label: 'Build dynamics Data Management',
            explanation: 'Data comes in various forms and structures, and our platform’s flexibility ensures that it can handle them all. Whether you are dealing with common formats like JSON or other data types, you can seamlessly integrate and process the data. Additionally, you have the ability to perform transformations within the system to ensure that the data fits your document templates perfectly, streamlining the entire document creation process.',
            img: pepping2 ,
          },
        {
            title: 'Step 3',
            label: 'Transform Your Document Workflows',
            explanation: 'With Intellidocs, you can transform your document workflows by automating routine tasks, streamlining approvals, and enhancing document processing speed. Our powerful transformation tools allow you to take your business documents to the next level, reducing errors, increasing efficiency, and ensuring compliance every step of the way.',
            img: pepping3 ,
        },
        // You can add more steps here if needed
    ];

    const toggleStep = (index) => {
        setActiveStep(index);
    };

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

    return (
    <div className="doc-document-page">
      {/* Hero Section */}
      <section className="doc-hero">
        <div className="doc-hero-content">
          <h1 className="doc-hero-h1">Streamlined Document Management for Modern Enterprises</h1>
          <h2 className="doc-hero-h2">Secure Storage, Intelligent Retrieval, and Full Control Over Your Data</h2>
          <p className="doc-hero-p"> document management system designed specifically for handling invoice data.</p>
          <p className="doc-hero-p"> It supports version control,digital signatures, and watermarking. </p>
          <p className="doc-hero-p"> You can configure custom storage path</p>
        </div>
        <div className="doc-hero-image">
          {/* You'll need to manage these image elements and their styling */}
          <div className="doc-hero-image-card doc-card-1">
            {/* Content for the first card */}
          </div>
          <div className="doc-hero-image-card doc-card-2">
            {/* Content for the second card */}
            <div className="doc-hero-image-central-icon doc-central-icon">
              {/* Placeholder for the central icon */}
              <div className="doc-circle">K</div>
            </div>
          </div>
          <div className="doc-hero-image-card doc-card-3">
            {/* Content for the third card */}
          </div>
          <div className="doc-hero-image-card doc-card-4">
            {/* Content for the fourth card */}
          </div>
        </div>
      </section>


      {/* Why Customers Choose Us Section */}
      <section className="doc-why-choose-us">
        <h2 className="doc-why-choose-us-h2">Why customers choose us</h2>
        <div className="doc-features-grid">
          <div className="doc-feature-item">
            <div className="doc-feature-icon">
              {/* Replace with your actual icon (e.g., an image or an icon font) */}
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zM12 6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4z" />
              </svg>
            </div>
            <h3 className="doc-feature-item-h3">Streamline Your Document Storage</h3>
            <p className="doc-feature-item-p"> provides a robust document management system tailored to efficiently store, organize, and manage all your invoice data. With a central repository, you can easily access, edit, and track your documents, ensuring data integrity and security at all times.</p>
          </div>
          <div className="doc-feature-item">
            <div className="doc-feature-icon">
              {/* Replace with your actual icon */}
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h16v4H4V4zm0 6h16v4H4v-4zm0 6h16v4H4v-4z" />
              </svg>
            </div>
            <h3 className="doc-feature-item-h3">Quick and Precise Document Retrieval</h3>
            <p className="doc-feature-item-p">, you can effortlessly retrieve documents by leveraging invoice-specific values like vendor details, invoice number, or date. Our advanced metadata-based search functionality ensures that you find the exact document you need in seconds, improving efficiency and reducing manual search time.</p>
          </div>
          <div className="doc-feature-item">
            <div className="doc-feature-icon">
              {/* Replace with your actual icon */}
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm6 8a6 6 0 0 0-12 0h12z" />
              </svg>
            </div>
            <h3 className="doc-feature-item-h3">Authenticate and Protect Your Documents</h3>
            <p className="doc-feature-item-p">Ensure the authenticity and security of your invoices with built-in digital signatures and watermarking features. These tools safeguard your documents, prevent unauthorized access, and protect sensitive information.</p>
          </div>
          {/* New Feature Items */}
          <div className="doc-feature-item">
            <div className="doc-feature-icon">
              {/* Replace with your actual icon */}
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" /></svg>
              </div>
            <h3 className="doc-feature-item-h3">Manage and Monitor Approval Processes</h3>
            <p className="doc-feature-item-p">Assign specific approval levels to documents and track their approval status in real-time. You can easily monitor which invoices are pending, approved, or rejected, ensuring smooth and timely document processing and reducing bottlenecks in your approval workflows.</p>
          </div>
          <div className="doc-feature-item">
            <div className="doc-feature-icon">
              {/* Replace with your actual icon */}
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 7h-8v6h8V7zM12 13V3H5v10h7zm7 0v-6c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v6h14z" /></svg>
            </div>
            <h3 className="doc-feature-item-h3">Organize Your Documents in Customizable Cabinets</h3>
            <p className="doc-feature-item-p">Store and categorize your documents in intuitive cabinet-style folders. This feature allows you to organize invoices and other documents in a way that suits your business needs, making retrieval even faster and more efficient.</p>
          </div>
          <div className="doc-feature-item">
            <div className="doc-feature-icon">
              {/* Replace with your actual icon */}
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm-6-7v-2h12v2H6zm0-4v-2h12v2H6z" /></svg>
            </div>
            <h3 className="doc-feature-item-h3">Store Your Documents Anywhere</h3>
            <p className="doc-feature-item-p">flexibility in document storage, allowing you to store your files on any system or platform of your choice—whether it's a local server, cloud, or hybrid solution. This adaptability ensures that your document management process integrates seamlessly with your existing IT infrastructure.</p>
          </div>
        </div>
      </section>

      <section className="doc-how-to-get-started-left">
        <h2 className="doc-how-to-get-started-h2">How to get started</h2>
        <p className="doc-how-to-get-started-intro">Automate document generation easily from your browser - no installation required. <a href="#">Contact us</a> to obtain access to the Documotor platform, and you're ready to get started!</p>
      </section>
      <section className="doc-how-to-get-started-right">
        <div className="doc-steps-layout">
          <div className="doc-steps-sidebar">
            {steps.map((step, index) => (
              <div
                className={`doc-step-sidebar-item ${activeStep === index ? 'doc-active' : ''}`}
                key={index}
                onClick={() => toggleStep(index)}
              >
                {step.title} <br /><br /> {step.label}
              </div>
            ))}
          </div>
          <div className="doc-steps-content">
            {steps[activeStep] && (
              <div className="doc-cartoon-slide-in open">
                  <div className="doc-step-explanation">
                  <h3> {steps[activeStep].label}</h3>
                  {steps[activeStep].explanation} 
                  
                </div>
              </div>
              
            )}
            
          </div>
          <img src={steps[activeStep].img} alt="Cartoon Illustration" className="doc-image" />
          
        </div>
      </section>


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
            <button className="book-demo-button">Book a Demo</button>
            <button className="talk-sales-button">Talk with Sales</button>
          </div>
        </div>
      {/* FAQ Section */}
      <div className="faq-section">
      <p className="faq-query-info">
            © Kodivian.scanify 2024. All rights reserved.
          </p>
      </div>
      </div>


    

          </div>
          );
          };

export default Document;          
