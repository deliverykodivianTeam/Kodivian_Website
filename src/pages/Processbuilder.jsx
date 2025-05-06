import React, { useState } from 'react';
import '../styles/Processbuilder.css';
import process from '../assets/processbuuild.png';
import website from '../assets/website.png'; // Default image
import form from '../assets/form.png'; // Image for "Intuitive design tools"
import workflow from '../assets/workflow.png'; // Image for "Familiar workflow"
import groups from '../assets/user.png'; // Image for "Groups and layers"
import DemoBookingPopup from '../components/DemoBookingPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBrain,
  faNetworkWired,
  faDatabase,
  faLink,
  faTachometerAlt,
  faUserLock,
} from '@fortawesome/free-solid-svg-icons';


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

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
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

    const handleSendQuery = async () => {
      if (queryText.trim()) {
          try {
            const response = await fetch('http://localhost:5173/processbuilder', {       method: 'POST',
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
  const [currentImg, setCurrentImg] = useState(form); // Initialize with the corresponding image

  const handleSectionClick = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
      setCurrentImg(form); // Revert to default image when collapsing (optional)
    } else {
      setExpandedSection(section);
      switch (section) {
        case 'intuitive':
          setCurrentImg(form);
          break;
        case 'familiar':
          setCurrentImg(workflow);
          break;
        case 'groups':
          setCurrentImg(groups);
          break;
        default:
          setCurrentImg(website); // Fallback to default if needed
      }
    }
  };

  return (
    <div>
    <div className="process-container">
      <h1 className="process-main-heading-top">Click, Drag, Done.</h1>
      <div className="process-content-wrapper">
        <div className="process-left1-content">
          <h1 className="process-main-heading">Your App, <br/> Your Way!</h1>
          <p className="process-description">
            Streamline your operations and bring your ideas to life—without writing a single line of code. Our powerful no-code platform lets you automate workflows, manage user groups, and generate real-time dashboard reports with ease. Whether you're building internal tools, managing tasks, or integrating with third-party systems, everything is just a few clicks away.
          </p>
          <h1 className="process-subdescription">Empower your team to work smarter, faster, and more creatively.</h1>
          <div className="process-button-group">
            <button onClick={handleOpenPopup}  className="process-start-button">Start for free Demo</button><a  href="#explore">
           <DemoBookingPopup isOpen={isPopupOpen} onClose={handleClosePopup} />  


           <button className="process-explore-button"> Explore features</button>
           </a>
          </div>
        </div>
        <div className="process-right-image">
          <img src={process} alt="No-code website builder" className="process-builder-image" />
        </div>
      </div>

      <div className="freehand-editor-section">
        <h1 className="freehand-editor-heading">Design without limits using <br />our powerful freehand editor</h1>
        <p className="freehand-editor-description">
          Create stunning apps effortlessly with our drag-and-drop platform.No coding needed <br/> just customize, launch, and manage everything from one powerful interface.
        </p>

        <div className="freehand-editor-accordion-wrapper">
          <div className="accordion-left-image">
            <img src={currentImg} alt="Section specific" className="accordion-section-image-left" />
          </div>
          <div className="freehand-editor-accordion">
            <div className="accordion-item">
              <div className="accordion-header" onClick={() => handleSectionClick('intuitive')} id="explore">
                <span className="accordion-arrow">{expandedSection === 'intuitive' ? '▼' : '►'}</span>
               <h2 > Smart Form Builder</h2>
              </div>
              {expandedSection === 'intuitive' && (
                <div className="accordion-content">
                  <p>Effortlessly create labels, buttons, conditions, and form elements in a dynamic, intuitive interface — no complexity, just creativity.</p>
                </div>
              )}
            </div>

            <div className="accordion-item">
              <div className="accordion-header" onClick={() => handleSectionClick('familiar')}>
                <span className="accordion-arrow">{expandedSection === 'familiar' ? '▼' : '►'}</span>
                <h2> Seamless Workflow</h2>
              </div>
              {expandedSection === 'familiar' && (
                <div className="accordion-content">
                  <p>Assign approvals, set rejections, manage user groups, and control page visibility — all through a streamlined, flexible workflow system built for productivity.</p>
                </div>
              )}
            </div>

            <div className="accordion-item">
              <div className="accordion-header" onClick={() => handleSectionClick('groups')}>
                <span className="accodion-arrow">{expandedSection === 'groups' ? '▼' : '►'}</span>
                <h2>User Group Layer</h2>
              </div>
              {expandedSection === 'groups' && (
                <div className="accordion-content">
                  <p>Create user groups, assign specific users to workflows, control page approvals or rejections, and manage statuses like Active or Inactive.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      <div className="freehand2-editor-section">
  <h1 className="freehand2-editor-main-heading">Click. Build. Inspire. Repeat!</h1>
  <p className="freehand2-editor-main-description">
  With our flexible components and powerful features, you can create any website you imagine. Whether it’s setting intelligent payment gateways, managing user authentication, or integrating third-party apps, we make it easy to bring your vision to life. Our goal is to make building a no-code website seamless and effortless for you.
  </p>

  <div className="feature-cards-grid">
     {/* Card 1 */}
     <div className="feature-card">
        <div className="feature-icon">
          <FontAwesomeIcon icon={faBrain} size="2x" style={{ color: '#007bff' }} /> {/* Example styling */}
        </div>
        <h3 className="feature-title">AI Powered <span className="feature-badge">new</span></h3>
        <p className="feature-description">
          Simply input your preferences, and watch as our tool generates a stunning, fully-functional site to your needs.
        </p>
      </div>

    {/* Card 2 */}
    <div className="feature-card">
        <div className="feature-icon">
          <FontAwesomeIcon icon={faNetworkWired} size="2x" style={{ color: '#28a745' }} /> {/* Example styling */}
        </div>
        <h3 className="feature-title"> Gateway Integration</h3>
        <p className="feature-description">
          Set intelligent gateway permissions based on conditions automatically approve specific actions.
        </p>
      </div>

      {/* Card 3 */}
      <div className="feature-card">
        <div className="feature-icon">
          <FontAwesomeIcon icon={faDatabase} size="2x" style={{ color: '#dc3545' }} /> {/* Example styling */}
        </div>
        <h3 className="feature-title">Database Connectivity</h3>
        <p className="feature-description">
          Connect your forms data to real-time cloud databases and manage data .
        </p>
      </div>

      {/* Card 4 */}
      <div className="feature-card">
        <div className="feature-icon">
          <FontAwesomeIcon icon={faLink} size="2x" style={{ color: '#ffc107' }} /> {/* Example styling */}
        </div>
        <h3 className="feature-title">Third-Party App Integrations</h3> {/* Replace with the actual title */}
        <p className="feature-description">
          Create smarter workflows by connecting your site with the tools you already use.
        </p>
      </div>

      {/* Card 5 */}
      <div className="feature-card">
        <div className="feature-icon">
          <FontAwesomeIcon icon={faTachometerAlt} size="2x" style={{ color: '#17a2b8' }} /> {/* Example styling */}
        </div>
        <h3 className="feature-title">Dashboard Model</h3> {/* Replace with the actual title */}
        <p className="feature-description">
          Create smarter workflows by connecting your site with the tools you already use.
        </p>
      </div>

      {/* Card 6 */}
      <div className="feature-card">
        <div className="feature-icon">
          <FontAwesomeIcon icon={faUserLock} size="2x" style={{ color: '#6c757d' }} /> {/* Example styling */}
        </div>
        <h3 className="feature-title">User Authentication</h3> {/* Replace with the actual title */}
        <p className="feature-description">
          Manage user roles, permissions, and profiles effortlessly without coding and personalized for every visitor.
        </p>
      </div>
    
  </div>
   
  <div className="pro-section">
  <div className="pro-content">
    <p className="pro-intro">Introducing processbuilder Projects</p>
    <h1 className="hero-title">
      Build software <span className="pro-badge new">NEW</span>{' '}
      <span className="pro-together">together</span>{' '}
      <span className="pro-badge beta">BETA</span>
    </h1>
    <p className="pro-subtitle">
      Projects are version control for fast-moving teams. Create a project to
      collaborate seamlessly, securely, and asynchronously without the
      frustration of learning Git.
    </p>
    <div className="pro-buttons">
      <button className="button primary">Start building</button>
      <button onClick={handleOpenPopup}  className="button secondary">BOOK DEMO</button>
      <DemoBookingPopup isOpen={isPopupOpen} onClose={handleClosePopup} />  

    </div>
  </div>
</div>

</div>

</div>

      {/* FAQ Section */}
 <div className="pro-faq-section">
        <h2 className="pro-faq-heading">Frequently Asked Questions</h2>
        <ul className="pro-faq-list">
          {faqData.map((faq, index) => (
            <li key={index} className="faq-item">
              <div
                className="pro-faq-question"
                onClick={() => handleQuestionClick(faq.question)}
              >
                {faq.question}
                <span className="pro-faq-toggle">
                  {expandedQuestion === faq.question ? '-' : '+'}
                </span>
              </div>
              {expandedQuestion === faq.question && (
                <div className="pro-faq-answer">{faq.answer}</div>
              )}
            </li>
          ))}
        </ul>
        <div className="pro-faq-query-container">
          {!isQueryOpen ? (
            <button className="pro-faq-query-button" onClick={openQueryBox}>
              Have a Question? Send us a Query
            </button>
          ) : (
            <div className="pro-query-input-area">
              <textarea
                className="pro-query-textbox"
                placeholder="Enter your query here..."
                value={queryText}
                onChange={handleQueryChange}
              />
              <button className="pro-query-submit-button" onClick={handleSendQuery}>
                Submit Query
              </button>
            </div>
          )}
        </div>
      </div>
       
         {/* New Bottom Section */}
      <div className="pro-bottom-cta-section">
        <div className="pro-bottom-cta-content">
          <div className="pro-bottom-cta-left">
            <h3>Streamline your business with Pixl’s AI Enabled Solutions</h3>
          </div>
          <div className="pro-bottom-cta-buttons">
          <button onClick={handleOpenPopup} className="book-demo-button">Book a Demo</button>
            <DemoBookingPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
            <button className="talk-sales-button">Talk with Sales</button>
          </div>
        </div>
      {/* FAQ Section */}
      <div className="pro-faq-section">
      <p className="pro-faq-query-info">
            © Kodivian.processbuilder 2025. All rights reserved.
          </p>
      </div>
      </div>


       


    </div>
  );
};

export default Processbuilder;