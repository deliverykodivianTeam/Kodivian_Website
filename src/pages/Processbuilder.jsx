import React, { useState } from 'react';
import '../styles/Processbuilder.css';
import website from '../assets/website.png'; // Default image
import intuitiveImage from '../assets/ab.png'; // Image for "Intuitive design tools"
import familiarImage from '../assets/ab.png'; // Image for "Familiar workflow"
import groupsImage from '../assets/ab.png'; // Image for "Groups and layers"

const Processbuilder = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [currentImg, setCurrentImg] = useState(website); // Initialize with the default image

  const handleSectionClick = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
      setCurrentImg(website); // Revert to default image when collapsing
    } else {
      setExpandedSection(section);
      switch (section) {
        case 'intuitive':
          setCurrentImg(intuitiveImage);
          break;
        case 'familiar':
          setCurrentImg(familiarImage);
          break;
        case 'groups':
          setCurrentImg(groupsImage);
          break;
        default:
          setCurrentImg(website); // Fallback to default if needed
      }
    }
  };

  return (
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
            <button className="process-start-button">Start for free</button>
            <button className="process-explore-button">Explore features</button>
          </div>
        </div>
        <div className="process-right-image">
          <img src={website} alt="No-code website builder" className="process-builder-image" />
        </div>
      </div>

      <div className="freehand-editor-section">
        <h1 className="freehand-editor-heading">Design without limits using <br />our powerful freehand editor</h1>
        <p className="freehand-editor-description">
        Create stunning apps effortlessly with our drag-and-drop platform.No coding needed <br/> just customize, launch, and manage everything from one powerful interface.
        </p>

        <div className="freehand-editor-accordion-wrapper">
          <div className="freehand-editor-accordion">
            <div className="accordion-item">
              <div className="accordion-header" onClick={() => handleSectionClick('intuitive')}>
                <span className="accordion-arrow">{expandedSection === 'intuitive' ? '▼' : '►'}</span>
                <h2>Intuitive design tools</h2>
              </div>
              {expandedSection === 'intuitive' && (
                <div className="accordion-content">
                  <p>The same editor tools and shortcuts you already know.</p>
                </div>
              )}
            </div>

            <div className="accordion-item">
              <div className="accordion-header" onClick={() => handleSectionClick('familiar')}>
                <span className="accordion-arrow">{expandedSection === 'familiar' ? '▼' : '►'}</span>
                <h2>Familiar workflow</h2>
              </div>
              {expandedSection === 'familiar' && (
                <div className="accordion-content">
                  <p>A workflow designed to feel natural and boost your productivity.</p>
                </div>
              )}
            </div>

            <div className="accordion-item">
              <div className="accordion-header" onClick={() => handleSectionClick('groups')}>
                <span className="accodion-arrow">{expandedSection === 'groups' ? '▼' : '►'}</span>
                <h2>Groups and layers</h2>
              </div>
              {expandedSection === 'groups' && (
                <div className="accordion-content">
                  <p>Organize your design elements with intuitive groups and layers.</p>
                </div>
              )}
            </div>
          </div>
          <div className="accordion-right-image">
            <img src={currentImg} alt="Section specific" className="accordion-section-image-right" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Processbuilder;