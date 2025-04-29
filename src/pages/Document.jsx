import React, { useState } from 'react';
import "../styles/Document.css";// You'll need to create this CSS file
import cartoonImage from "../assets/ab.png";


const Document = () => {
    const [activeStep, setActiveStep] = useState(null);

    const steps = [
        {
            title: 'Step 1',
            label: 'Obtain a sample data set',
            explanation: 'Use the editor to supply the platform with a sample data set. Simply upload, paste, or create a data set in the editor directly. Documotor is built around the JSON data format, but if you are using another format, rest easy - we can easily convert data from other formats to JSON. We are now ready to start building a template for our data set.',
        },
        {
            title: 'Step 2',
            label: 'Build dynamics into your template',
            explanation: 'With your data set ready, you can now start building a dynamic template. Use our intuitive interface to define placeholders and rules that will govern how your data is merged into the document. You have full control over the layout and formatting.',
        },
        {
            title: 'Step 3',
            label: 'Preview the results and start automating',
            explanation: 'Once your template is set up, you can preview the generated documents with your sample data. If everything looks good, you are ready to connect your data sources and automate your document creation process. Integrate with our API for seamless workflows.',
        },
        // You can add more steps here if needed
    ];

    const toggleStep = (index) => {
        setActiveStep(activeStep === index ? null : index);
    };

    return (
    <div className="doc-document-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-h1">Automate document creation</h1>
          <h2 className="hero-h2">Streamline your business processes</h2>
          <p className="hero-p">Documotor transforms your document workflows</p>
          <p className="hero-p">Say goodbye to manual document creation and hello to efficiency</p>
        </div>
        <div className="hero-image">
          {/* You'll need to manage these image elements and their styling */}
          <div className="hero-image-card doc-card-1">
            {/* Content for the first card */}
          </div>
          <div className="hero-image-card doc-card-2">
            {/* Content for the second card */}
            <div className="hero-image-central-icon doc-central-icon">
              {/* Placeholder for the central icon */}
              <div className="doc-circle">K</div>
            </div>
          </div>
          <div className="hero-image-card doc-card-3">
            {/* Content for the third card */}
          </div>
          <div className="hero-image-card doc-card-4">
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
            <h3 className="doc-feature-item-h3">Immediate time savings</h3>
            <p className="doc-feature-item-p">Say goodbye to manual errors with automated document generation. Save time, ensure consistent high-quality outputs, and eliminate the need for training. Everyone's on the same page from day one.</p>
          </div>
          <div className="doc-feature-item">
            <div className="doc-feature-icon">
              {/* Replace with your actual icon */}
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h16v4H4V4zm0 6h16v4H4v-4zm0 6h16v4H4v-4z" />
              </svg>
            </div>
            <h3 className="doc-feature-item-h3">Flexible like no others</h3>
            <p className="doc-feature-item-p">Break free from the notion that automation means boring standardization. Our tools offer unmatched flexibility in both templating and data structure. Craft sophisticated documents and presentations that don't compromise on your unique brand.</p>
          </div>
          <div className="doc-feature-item">
            <div className="doc-feature-icon">
              {/* Replace with your actual icon */}
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm6 8a6 6 0 0 0-12 0h12z" />
              </svg>
            </div>
            <h3 className="doc-feature-item-h3">Proven automation expertise</h3>
            <p className="doc-feature-item-p">Benefit from our years of experience in document automation. Ditch the in-house, developer-dependent solutions. Expert assistance and invaluable know-how are just a call away.</p>
          </div>
          {/* New Feature Items */}
          <div className="doc-feature-item">
            <div className="doc-feature-icon">
              {/* Replace with your actual icon */}
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 7h-8v6h8V7zM12 13V3H5v10h7zm7 0v-6c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v6h14z" /></svg>
            </div>
            <h3 className="doc-feature-item-h3">Enhanced Collaboration</h3>
            <p className="doc-feature-item-p">Streamline teamwork with real-time collaboration features. Multiple team members can work on documents simultaneously, improving efficiency and reducing errors.</p>
          </div>
          <div className="doc-feature-item">
            <div className="doc-feature-icon">
              {/* Replace with your actual icon */}
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" /></svg>
            </div>
            <h3 className="doc-feature-item-h3">Seamless Integration</h3>
            <p className="doc-feature-item-p">Connect Documotor with your existing tools and platforms. Our API allows for seamless integration with CRM, ERP, and other business systems, automating data flow and eliminating manual data entry.</p>
          </div>
          <div className="doc-feature-item">
            <div className="doc-feature-icon">
              {/* Replace with your actual icon */}
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm-6-7v-2h12v2H6zm0-4v-2h12v2H6z" /></svg>
            </div>
            <h3 className="doc-feature-item-h3">Customizable Templates</h3>
            <p className="doc-feature-item-p">Create and customize document templates to match your brand and specific needs. Our intuitive template editor requires no coding knowledge, empowering you to design professional-looking documents easily.</p>
          </div>
        </div>
      </section>

      <section className={`doc-how-to-get-started ${activeStep !== null ? 'explanation-open' : ''}`}>
                <h2 className="doc-how-to-get-started-h2">How to get started</h2>
                <p className="doc-how-to-get-started-intro">Automate document generation easily from your browser - no installation required. <a href="#">Contact us</a> to obtain access to the Documotor platform, and you're ready to get started!</p>
                <div className="doc-steps-layout">
                    <div className="doc-steps-sidebar">
                        {steps.map((step, index) => (
                            <div className={`doc-step-sidebar-item ${activeStep === index ? 'doc-active' : ''}`} key={index} onClick={() => toggleStep(index)}>
                                {step.title} - {step.label}
                            </div>
                        ))}
                    </div>
                    <div className="doc-steps-content">
                        {activeStep !== null && (
                            <div className="doc-cartoon-slide-in open">
                                <img src={cartoonImage} alt="Cartoon Illustration" />
                                <div className="doc-step-explanation">
                                    <h3>{steps[activeStep].title} - {steps[activeStep].label}</h3>
                                    {steps[activeStep].explanation}
                                </div>
                            </div>
                        )}
                        {activeStep === null && (
                             <div className="doc-cartoon-slide-in open">
                             <img src={cartoonImage} alt="Cartoon Illustration" />
                             <div className="doc-step-explanation">
                                
                             </div>
                         </div>
                        )}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Document;