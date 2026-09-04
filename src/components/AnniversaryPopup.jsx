import React, { useState, useEffect } from 'react';

const AnniversaryPopup = () => {
  const [show, setShow] = useState(false);
  const [anniversaryYear, setAnniversaryYear] = useState(0);

  useEffect(() => {
    // We do NOT use sessionStorage here as requested: "when was refresh screen again it shown"
    
    const today = new Date();
    setAnniversaryYear(today.getFullYear() - 2021);
    setShow(true);
  }, []);

  useEffect(() => {
    // When the banner is shown, push the fixed navbar and content down
    const navbar = document.querySelector('.custom-navbar');
    const content = document.querySelector('.content');
    
    if (show) {
      if (navbar) navbar.style.setProperty('top', '44px', 'important'); // Height of banner
      if (content) content.style.paddingTop = '134px'; // 90px original + 44px banner
    } else {
      if (navbar) navbar.style.setProperty('top', '0px', 'important');
      if (content) content.style.paddingTop = '90px';
    }
    
    return () => {
      if (navbar) navbar.style.setProperty('top', '0px', 'important');
      if (content) content.style.paddingTop = '90px';
    };
  }, [show]);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: '#572c5f',
      color: '#fff',
      padding: '10px 40px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      zIndex: 99999
    }}>
      <style>
        {`
          @keyframes scrollText {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .scrolling-text {
            display: inline-block;
            white-space: nowrap;
            animation: scrollText 20s linear infinite;
            font-weight: 500;
            font-size: 1.1rem;
            width: 100%;
          }
        `}
      </style>
      
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', width: '100%' }}>
        <div className="scrolling-text">
          We are proudly celebrating our {anniversaryYear}th Anniversary! Founded on September 3, 2021. Thank you for being part of our incredible journey!
        </div>
      </div>
      
      <button 
        onClick={() => setShow(false)} 
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: '1.5rem',
          cursor: 'pointer',
          position: 'absolute',
          right: '15px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          lineHeight: '1'
        }}
      >
        &times;
      </button>
    </div>
  );
};

export default AnniversaryPopup;
