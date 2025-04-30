import React from 'react';
import '../styles/Robort.css'; // Create this CSS file

const Robort = () => {

  return (

    <div className="robort-layout-image-style-container">
      <div className="robort-scrollable-left">
        <div className="robort-left-content">
          <div className="robort-work-label">WORK</div>
          <h2>Featured Projects</h2>
          <p>Our design approach prioritizes the needs and preferences of users. We focus on creating products that enhance the user experience, ensuring that they are both functional and enjoyable to use.</p>
          {/* Add more scrollable content here */}
          <div style={{ height: '200px', background: '#333', margin: '20px 0', color: 'white', padding: '20px' }}>Scrollable Content 1</div>
          <div style={{ height: '300px', background: '#555', margin: '20px 0', color: 'white', padding: '20px' }}>Scrollable Content 2</div>
          <div style={{ height: '250px', background: '#444', margin: '20px 0', color: 'white', padding: '20px' }}>Scrollable Content 3</div>
          {/* Add more scrollable sections */}
        </div>
      </div>
      <div className="robort-fixed-right">
        <div className="robort-right-content">
          <h3>ElectraX</h3>
          <p className="robort-electrax-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div className="robort-card-container">
          <h2>Featured Projects</h2>
          <p>Our design approach prioritizes the needs and preferences of users. We focus on creating products that enhance the user experience, ensuring that they are both functional and enjoyable to use.</p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Robort;