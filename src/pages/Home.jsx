import React from 'react';
import '../styles/Home.css'; // Import global styles

const Home = () => {
  return (
    <div className="home-page">
      <h1 className="home-title">Welcome to <span className="kodivian-title">Kodivian</span></h1>
      <p className="home-subtitle">We build smart, scalable, and futuristic software solutions.</p>
      <h2 className="home-tools-title">Our Trusted Tools & Technologies</h2>
      {/* You can add the tools/technologies section here if needed */}
    </div>
  );
};

export default Home;