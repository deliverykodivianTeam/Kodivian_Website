import React, { useState, useEffect, useRef } from 'react';
import '../styles/About.css';
import { ClockIcon, UserGroupIcon, HeartIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import ponpureLogo from '../assets/ponpure.png';
import tiCycleLogo from '../assets/ti-cycle.png';
import murugappaLogo from '../assets/murugappa.png';
import khazanaLogo from '../assets/khazana.png';
import sharatIndustriesLogo from '../assets/sharat-industries.png';
import dabicoLogo from '../assets/dabico.png';
import dmccLogo from '../assets/dmcc.png';
import aavaBrandsLogo from '../assets/aava-brands.png';

const About = () => {
  const solutions = ["IntelliDocs", "Scanify", "RPA", "Process Builder"];
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
  const scrollingLogosRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSolutionIndex((prevIndex) => (prevIndex + 1) % solutions.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [solutions.length]);

  const handleMouseEnter = () => {
    if (scrollingLogosRef.current) {
      scrollingLogosRef.current.style.animationPlayState = 'paused';
    }
  };

  const handleMouseLeave = () => {
    if (scrollingLogosRef.current) {
      scrollingLogosRef.current.style.animationPlayState = 'running';
    }
  };

  return (
    <div className="about-page">
      <div className="rotating-solution-text">
        Shaping the future through innovative products - <span className="colored-solution">{solutions[currentSolutionIndex]}</span>
      </div>

      <div className="about-stats-container">
        <div className="about-stat-box">
          <div className="stat-icon">
            <ClockIcon className="w-8 h-8 text-purple-500" />
          </div>
          <div className="stat-number">3</div>
          <div className="stat-label">Years Experience</div>
        </div>

        <div className="about-stat-box">
          <div className="stat-icon">
            <UserGroupIcon className="w-8 h-8 text-purple-500" />
          </div>
          <div className="stat-number">30</div>
          <div className="stat-label">Team Members</div>
        </div>

        <div className="about-stat-box">
          <div className="stat-icon">
            <HeartIcon className="w-8 h-8 text-purple-500" />
          </div>
          <div className="stat-number">25</div>
          <div className="stat-label">Satisfied Clients</div>
        </div>

        <div className="about-stat-box">
          <div className="stat-icon">
            <CheckCircleIcon className="w-8 h-8 text-purple-500" />
          </div>
          <div className="stat-number">50</div>
          <div className="stat-label">Complete Projects</div>
        </div>
      </div>

      <div className="scrolling-logos-container">
        <h1 className='framer-text'>Innovation. Trust. Delivered with excellence</h1>
        <div
          ref={scrollingLogosRef}
          className="scrolling-logos"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="logos-set">
            <img src={ponpureLogo} alt="Ponpure Logo" className="logo" />
            <img src={tiCycleLogo} alt="TI Cycle Logo" className="logo" />
            <img src={murugappaLogo} alt="Murugappa Logo" className="logo" />
            <img src={khazanaLogo} alt="Khazana Logo" className="logo" />
            <img src={sharatIndustriesLogo} alt="Sharat Industries Logo" className="logo" />
            <img src={dabicoLogo} alt="Dabico Logo" className="logo" />
            <img src={dmccLogo} alt="DMCC Logo" className="logo" />
            <img src={aavaBrandsLogo} alt="Aava Brands Logo" className="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;