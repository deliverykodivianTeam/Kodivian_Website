import React , { useState }  from 'react';
import '../styles/Robort.css'; // Ensure this CSS file is linked
import rob from '../assets/aiimage.png';
import automationrpa from "../assets/attended.png";
import unattendedrpa from "../assets/unattended.png";
import hybridrpa from "../assets/hybrid.png";

const faqData = [
  {
    question: 'What kind of tasks can RPA automate?',
    answer: 'RPA is ideal for tasks that are time-consuming, repetitive, and structured — like filling forms, extracting data from invoices, updating records in databases, and sending automated emails.',
  },
  {
    question: 'How quickly can we implement RPA in our business?',
    answer: 'Simple automations can be deployed in just a few days or weeks. Complex workflows may take longer depending on the processes and systems involved. Our team helps streamline the implementation process for faster ROI.',
  },
  {
    question: 'Is RPA secure for handling sensitive business data?',
    answer: 'Yes. RPA solutions are built with enterprise-grade security, including role-based access, encryption, audit trails, and compliance with industry standards like GDPR and HIPAA.',
  },
  {
    question:  'Will RPA replace human jobs?',
    answer: 'RPA is designed to assist — not replace — humans by taking over tedious tasks. This allows employees to focus on more strategic, creative, and high-value work.',
  },
  {
    question: ' Can RPA integrate with our existing systems and applications?',
    answer: 'Yes. RPA works at the user interface level and can integrate with most existing applications — including legacy systems, web apps, ERPs, CRMs, and more — without requiring major changes to your current infrastructure.',
  },
]; 


const Robort = () => {
  
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
    <div className="main">
    <div className="rob-top">
        <h6 className="rob-heading">
        Revolutionizing Business Processes with RPA
        </h6>
        <p className="rob-description">
        Transformative AI-powered technology that enables businesses to automate repetitive, rule-based tasks across systems and applications—eliminating the need for manual data entry and reducing operational costs.        </p>
        <div className="rob-button-group">
          <button className="rob-get-started-button">Get Started</button>
          <button className="rob-how-it-works-button">
            How it works <span className="rob-arrow-icon">→</span>
          </button>
        </div>
      </div>
      <div className="rob-img-right">
                <img src={rob} alt="Invoice" className="rob-image" />
              </div>
      <div className="robort-1-container">
        <h2>Empowering Enterprises with AI-Driven Robotic Process Automation</h2>
            <p>Robotic Process Automation (RPA) is a core capability of the Kodivian Process Builder—a powerful, AI/ML-led low-code platform designed to eliminate repetitive manual tasks and streamline enterprise workflows. With seamless integration, intelligent bots, and rule-driven logic, RPA transforms how organizations operate, delivering faster, error-free, and scalable solutions.
            </p>
      </div>
    <div className="robort-layout-violet-theme-container">
      <div className="robort-scrollable-left">
        <div className="robort-top-text">Harnessing the Power of RPA</div>
        <div className="robort-left-content">
          <div className="robort-work-label">SERVICES</div>
          <h3 className="rob-h3">Eliminate Manual Work</h3>
          <div className="rob-div" >Automate repetitive and time-consuming tasks to free your team from manual data entry, document handling, and routine processes. Our platform streamlines workflows so your employees can focus on high-value tasks, reducing human error and operational bottlenecks. Experience fewer delays and more efficient operations with automation built for scale.
          </div>
          <h3 className="rob2-h3">Increase Speed & Accuracy</h3>
          <div className="rob-div1">Leverage automation to process data in real-time with precision. Our solution ensures rapid task execution with built-in validations and logic to minimize errors. Whether it's processing invoices, managing forms, or handling user requests, you'll achieve faster turnaround times while maintaining high accuracy.</div>
          <h3 className="rob-h3">Cost Savings up to 10X</h3>
          <div className="rob-div2">By reducing labor hours, minimizing errors, and eliminating inefficiencies, our platform delivers significant cost savings—often up to 10X compared to traditional methods. Save on staffing, training, and overhead costs while improving productivity across the board.</div>
          <h3 className="rob2-h3">Citizen Developer Friendly</h3>
          <div className="rob-div3">Designed for non-technical users, our platform empowers business teams to build, modify, and deploy workflows without writing a single line of code. With intuitive drag-and-drop tools, guided logic, and reusable templates, your staff becomes more agile and self-reliant—no IT bottlenecks required.
          </div>
          <h3 className="rob-h3">Web & Mobile Ready</h3>
          <div className="rob-div4">Kodivian's RPA platform is designed to be fully accessible across web and mobile devices, enabling users to manage and monitor workflows anytime, anywhere. Whether in the office or on the move, employees and managers can interact with automation through an intuitive, responsive interface. </div>

        </div>
      </div>
      <div className="robort-fixed-right">
        <div className="robort-right-content">
          <h3>Automation That Transforms Businesses</h3>
          <p className="robort-electrax-description">Smarter Workflows. Faster Execution. Zero Manual Effort.</p>
          <div className="robort-card-container">
            <h2>Featured RPA Services</h2>
            <p> integrates Robotic Process Automation (RPA) seamlessly into your enterprise ecosystem to drive operational efficiency, boost productivity, and minimize human effort. Here's how Kodivian RPA delivers powerful outcomes across business functions.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="robort1-container">
            <h2>Get Started with RPA Today</h2>
            <p>Embracing Robotic Process Automation is more than just adopting a new tool — it's a strategic move toward digital transformation. Whether you're a small business looking to reduce manual work or a large enterprise aiming to streamline complex operations, RPA offers scalable, high-impact solutions.Our team will analyze your current workflows, identify automation opportunities, and design customized bots that deliver measurable results. The future of work is automated — let’s build it together.</p>
          </div>
          <div className="robort1-layout-violet-theme-container">
      <div className="robort1-scrollable-left">
        <div className="robort1-top-text">Streamlining Data Tasks with RPA.</div>
        <div className="robort1-left-content">
          <div className="robort1-work-label">Automating Repetitive Data Tasks for Enhanced Efficiency and Accuracy</div>
          <h2>Optimization</h2>
          <p>Robotic Process Automation (RPA) is transforming the way businesses manage and process data. By automating repetitive and time-consuming tasks, RPA eliminates the need for manual intervention, improving speed and accuracy across various data operations. Tasks such as data entry, validation, extraction, and report generation can all be performed seamlessly by bots, significantly reducing the time spent on routine work.</p>
          {/* Add more scrollable content here */}
          <h3 className="rob1-h3">Attended Automation</h3>
          <div className="rob1-div" >Works alongside employees, triggered manually when needed
            <img
                            src={automationrpa}
                            alt="Scanner"
                            className="img1-rob"
                          />
          </div>
          <h3 className="rob11-h3">Un-Attended Automation</h3>
          <div className="rob1-div1">Operates independently in the background on a schedule or event-trigger
          <img
                            src={unattendedrpa}
                            alt="Scanner"
                            className="img1-rob"
                          />
          </div>
          <h3 className="rob1-h3">Hybrid Automation</h3>
          <div className="rob1-div2">providing end-to-end automation across departments.
          <img
                            src={hybridrpa}
                            alt="Scanner"
                            className="img1-rob"
                          />
          </div>
          </div>
      </div>
      <div className="robort1-fixed-right">
        <div className="robort1-right-content">
          <h3>AutoLife</h3>
          <p className="robort1-electrax-description">Automating the Routine, Empowering the Day.</p>
          <div className="robort1-card-container">
            <h2>Attended, Unattended & Hybrid Automation</h2>
            <p>RPA (Robotic Process Automation) is revolutionizing the way organizations handle repetitive, rule-based processes by automating daily tasks across departments. Whether it’s processing invoices, extracting data from emails, entering records into CRMs, or generating reports, RPA bots can perform these actions faster and with zero errors.</p>
          </div>
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

export default Robort;