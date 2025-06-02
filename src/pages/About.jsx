import React, { useState, useEffect, useRef } from "react";
import "../styles/About.css";
import { Container, Row, Col, Card } from 'react-bootstrap';
import Belowbar from "../components/Belowbar";
import {
  ClockIcon,
  UserGroupIcon,
  HeartIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { FaLinkedin } from "react-icons/fa";

// Import images
import constructionImage from "../assets/Animated-Isometric-Construction.gif";
import about_intro from "../assets/about_intro.png";
import about_intro1 from "../assets/about_intro1.jpg";
import ponpureLogo from "../assets/ponpure.png";
import tiCycleLogo from "../assets/ti-cycle.png";
import murugappaLogo from "../assets/murugappa.png";
import khazanaLogo from "../assets/khazana.png";
import sharatIndustriesLogo from "../assets/sharat-industries.png";
import dabicoLogo from "../assets/dabico.png";
import dmccLogo from "../assets/dmcc.png";
import aavaBrandsLogo from "../assets/aava-brands.png";
import tiMedicallogo from "../assets/ti_medical.png";
import Innoventure_logo from "../assets/3xper_innoventure_limited_logo.png";
import shanthigearslogo from "../assets/shanthi-gears.png";
import ezcloud from "../assets/ezcloud.png";
import ionidea from "../assets/ionidea.png";
import eastman from "../assets/eastman.png";
import Chairman from "../assets/chairman.jpeg";
import Director from "../assets/directer.jpeg";
import Raja from "../assets/Raja.jpeg";
import Rithish from "../assets/Rithish.jpg"
import Anjana from "../assets/Anjana.jpeg";
import Mothi from "../assets/Mothi.jpeg";
import Suganthi from "../assets/Suganthi.jpeg";
import Kaviya from "../assets/Kaviya.jpeg";
import Preethi from "../assets/Preethi.jpeg";

const About = () => {
  const solutions = ["IntelliDocs", "Scanify", "RPA", "Process Builder"];
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
  const scrollingLogosRef = useRef(null);

  const clientLogos = [
    ponpureLogo, tiCycleLogo, murugappaLogo, khazanaLogo,
    ezcloud, ionidea, eastman, sharatIndustriesLogo,
    dabicoLogo, dmccLogo, aavaBrandsLogo, tiMedicallogo,
    Innoventure_logo, shanthigearslogo
  ];

  const teamMembers = [
    {
      name: "Sridhar Kamakoti",
      role: "Chairman",
      image: Chairman,
      linkedin: "https://www.linkedin.com/in/kamakoti-sridhar-27587724?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAUch7kBCCd8wTAX97TCLHtswuMIYbCqrwA&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BMmw3evXEQMyueKiRC2BnZw%3D%3D",
    },
    {
      name: "Vijay Sabari",
      role: "Managing Director",
      image: Director,
      linkedin: "https://www.linkedin.com/in/vijaysabari-mugunthan-16b57441?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAjN3uMBpbTq7jlVvOyJljD8N7eAobuAyFM&lipi=urn%3Ali%3Apage%3Acompanies_company_people_index%3B5747f2ad-23de-4df0-9690-11093ad7c7fe",
    },
    {
      name: "Raja SM",
      role: "Business Analyst/Solution Engineer",
      image: Raja,
      linkedin: "https://www.linkedin.com/in/rajashanmugam3?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADeOfkgBeq5fczrDnHNTcFzKmaE0qTVIgTo&lipi=urn%3Ali%3Apage%3Acompanies_company_people_index%3B5747f2ad-23de-4df0-9690-11093ad7c7fe",
    },
    {
      name: "Anjana",
      role: "Marketing & Branding Strategist",
      image: Anjana,
      linkedin: "https://www.linkedin.com/in/anjana-subramaniam-a4610313?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAKvVhYB9qzWJjiqOW6iOYYbhUOyy603gHQ&lipi=urn%3Ali%3Apage%3Acompanies_company_people_index%3B5747f2ad-23de-4df0-9690-11093ad7c7fe",
    },
    {
      name: "Mothi Kumaresan",
      role: "Business Development Manager",
      image: Mothi,
      linkedin: "https://www.linkedin.com/in/mothi-kumaresan-4a435b22?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAASt5fwBURhttUBecc5ESWUM-IEWPl3iLyY&lipi=urn%3Ali%3Apage%3Acompanies_company_people_index%3B5747f2ad-23de-4df0-9690-11093ad7c7fe",
    },
    {
      name: "Suganthi",
      role: "Technical Project Manager",
      image: Suganthi,
      linkedin: "https://www.linkedin.com/in/suganthi-s-91410124b?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAD3GB-ABmhGB1SJlO5H721Mj7aRK61shRa0&lipi=urn%3Ali%3Apage%3Acompanies_company_people_index%3B5747f2ad-23de-4df0-9690-11093ad7c7fe",
    },
    {
      name: "Kaviya",
      role: "Global PMO Executive",
      image: Kaviya,
      linkedin: "https://www.linkedin.com/in/kaviya-arivaratharaj-701436253?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAD6Iv3EBqYLk-gYm8vy1zSEloGtMluS_Ucw&lipi=urn%3Ali%3Apage%3Acompanies_company_people_index%3B5747f2ad-23de-4df0-9690-11093ad7c7fe",
    },
    {
      name: "Preethi JB",
      role: "Technical Consultant",
      image: Preethi,
      linkedin: "https://www.linkedin.com/in/preethijb03?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAE8SmBwBxakLMoqv_Rvvr7PShOA2griketE&lipi=urn%3Ali%3Apage%3Acompanies_company_people_index%3B5747f2ad-23de-4df0-9690-11093ad7c7fe",
    },
    {
      name: "Rithish PG",
      role: "Software Developer",
      image: Rithish,
      linkedin: "https://www.linkedin.com/in/rithish-pg?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADkrY1gBCpFun1vpv5JXKS5mU82zUES0lMg&lipi=urn%3Ali%3Apage%3Acompanies_company_people_index%3B5747f2ad-23de-4df0-9690-11093ad7c7fe",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSolutionIndex(
        (prevIndex) => (prevIndex + 1) % solutions.length
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [solutions.length]);

  const handleMouseEnter = () => {
    if (scrollingLogosRef.current) {
      scrollingLogosRef.current.style.animationPlayState = "paused";
    }
  };

  const handleMouseLeave = () => {
    if (scrollingLogosRef.current) {
      scrollingLogosRef.current.style.animationPlayState = "running";
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <Container fluid className="py-5 bg-white about-hero-section fade-up">
        <Row className="justify-content-center text-center">
          <Col lg={10}>
            <h1 className="display-4 fw-bold mb-4 rotating-solution-text">
              Shaping the future through innovative products{" "}
              <span className="colored-solution">
                {solutions[currentSolutionIndex]}
              </span>
            </h1>
          </Col>
        </Row>
      </Container>

      {/* Stats Section */}
      <Container className="py-5 about-stats-sections">
        <Row className="text-center justify-content-center">
          <Col xs={6} md={3} className="mb-4">
            <div className="p-4 bg-light rounded shadow-sm h-100 d-flex flex-column align-items-center justify-content-center">
              <ClockIcon className="w-10 h-10 mb-3" />
              <div className="fs-1 fw-bold">4</div>
              <p className="lead mb-0">Years Experience</p>
            </div>
          </Col>
          <Col xs={6} md={3} className="mb-4">
            <div className="p-4 bg-light rounded shadow-sm h-100 d-flex flex-column align-items-center justify-content-center">
              <UserGroupIcon className="w-10 h-10 mb-3" />
              <div className="fs-1 fw-bold ">30</div>
              <p className="lead mb-0">Team Members</p>
            </div>
          </Col>
          <Col xs={6} md={3} className="mb-4">
            <div className="p-4 bg-light rounded shadow-sm h-100 d-flex flex-column align-items-center justify-content-center">
              <HeartIcon className="w-10 h-10 mb-3" />
              <div className="fs-1 fw-bold">25</div>
              <p className="lead mb-0">Satisfied Clients</p>
            </div>
          </Col>
          <Col xs={6} md={3} className="mb-4">
            <div className="p-4 bg-light rounded shadow-sm h-100 d-flex flex-column align-items-center justify-content-center">
              <CheckCircleIcon className="w-10 h-10 y mb-3" />
              <div className="fs-1 fw-bold ">50</div>
              <p className="lead mb-0">Complete Projects</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Our Valued Clients Section */}
      <section id="our-client-ok" className="py-5 bg-white overflow-hidden">
        <Container fluid> {/* Use fluid for full width */}
          <h2 className="display-5 fw-bold text-center mb-5 ">Our Valued Clients</h2> {/* Using text-primary for violet */}
          <div
            className="client-logos-track"
            ref={scrollingLogosRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Render logos twice to create a seamless loop */}
            {clientLogos.map((logo, index) => (
              <div className="client-logo-item" key={`logo-1-${index}`}>
                <img src={logo} alt={`Client Logo ${index + 1}`} className="img-fluid" />
              </div>
            ))}
            {clientLogos.map((logo, index) => (
              <div className="client-logo-item" key={`logo-2-${index}`}>
                <img src={logo} alt={`Client Logo ${index + 1}`} className="img-fluid" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* About Content Sections */}
      <Container className="py-5">
        {/* Section 1: Image Left, Text Right */}
        <Row className="align-items-center mb-5 about-content-row">
          <Col md={6} className="text-center text-md-start mb-4 mb-md-0">
            <img
              src={constructionImage}
              alt="Construction Animation"
              className="img-fluid rounded shadow-lg"
            />
          </Col>
          <Col md={6}>
            <p className="lead intro_about_banner_1">
              Drive seamless operations and intelligent document management with our
              innovative automation suite. Featuring Scanify for streamlined data
              capture, Process Builder for codeless workflow creation, RPA for task
              automation, and IntelliDocs for dynamic document generation and
              delivery.
            </p>
          </Col>
        </Row>

        {/* Section 2: Text Left, Image Right */}
        <Row className="align-items-center mb-5 about-content-row">
          <Col md={6} className="order-md-2 text-center text-md-start mb-4 mb-md-0">
            <img
              src={about_intro1}
              alt="About Intro 1"
              className="img-fluid rounded shadow-lg"
            />
          </Col>
          <Col md={6} className="order-md-1">
            <p className="lead intro_about_banner">
              At the heart of our innovation lies a powerful suite of intelligent
              automation products — Scanify for seamless document scanning and data
              capture, Process Builder to streamline complex workflows with no-code
              logic, RPA to automate repetitive tasks and boost efficiency, and
              IntelliDocs to create, manage, and deliver smart, dynamic documents.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Section 3: Image Left, Text Right (Dark Background) - IMPROVED */}
      <Container fluid className="px-0">
  <Row className="align-items-center text-white bg-dark mb-5 g-0">
    <Col md={6} className="text-center text-md-start">
      <img
        src={about_intro}
        alt="About Intro"
        className="img-fluid rounded shadow-lg"
        style={{
          maxWidth: '75%', // 🔹 Reduce image size to 75% of its container
          height: 'auto',
        }}
      />
    </Col>
    <Col md={6} className="py-4 px-4 text-center text-md-start">
      <p className="lead mb-0">
        Our innovation engine drives efficiency through a powerful suite of
        intelligent automation tools. From Scannify's effortless document
        scanning and data capture to Process Builder's intuitive no-code
        workflow automation, RPA's ability to handle repetitive tasks, and
        IntelliDocs' smart document lifecycle management, we offer
        comprehensive solutions to elevate your operations.
      </p>
    </Col>
  </Row>
</Container>

      {/* Team Section */}
      <Container fluid className="team-section no-side-padding py-5 text-center">
        <h2 className="display-5 fw-bold mb-5 team-section-heading">
          Where vision meets execution meet the team powering Kodivian.
        </h2>

        {/* Highlighted Leaders */}
        <Row className="justify-content p-3 center mb-5">
          {teamMembers
            .filter(
              (member) =>
                member.name === "Sridhar Kamakoti" ||
                member.name === "Vijay Sabari"
            )
            .map((member, index) => (
              <Col xs={12} md={6} key={`highlighted-${index}`} className="mb-4">
                <Card className="highlighted-leader-card text-start shadow-lg border-0 h-100">
                  <Row className="g-0 align-items-center">
                    <Col md={5}>
                      <div style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
                        <Card.Img
                          src={member.image}
                          alt={member.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                          className="rounded-start"
                        />
                      </div>
                    </Col>
                    <Col md={7}>
                      <Card.Body>
                        <Card.Title className="h4 fw-bold mb-2">{member.name}</Card.Title>
                        <Card.Text className="text-muted mb-3">
                          {member.name === "Sridhar Kamakoti"
                            ? "Managing Director - SS Group of Companies"
                            : member.role}
                        </Card.Text>
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary d-inline-flex align-items-center justify-content-center gap-2 px-4 py-2 rounded-pill shadow-sm"
                        >
                          <FaLinkedin className="text-lg" />
                          Learn More...
                        </a>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
        </Row>

        {/* Remaining Team */}
        <Row className="justify-content-center p-3">
          {teamMembers
            .filter(
              (member) =>
                member.name !== "Sridhar Kamakoti" && member.name !== "Vijay Sabari"
            )
            .map((member, index) => (
              <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={`member-${index}`}>
                <Card className="h-100 shadow-sm border-0 team-member-card">
                  <div className="member-image-wrapper rounded-top overflow-hidden">
                    <Card.Img
                      variant="top"
                      src={member.image}
                      alt={member.name}
                      className="member-image w-100"
                      style={{ objectFit: "cover", height: "380px" }}
                    />
                  </div>
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title className="h6 fw-bold member-name mb-2">
                      {member.name}
                    </Card.Title>
                    <Card.Text className="text-muted member-role small mb-3">
                      {member.role}
                    </Card.Text>
                <a
  href={member.linkedin}
  target="_blank"
  rel="noopener noreferrer"
  className="d-flex align-items-center justify-content-center"
  style={{
    border: '2px solid #8A2BE2', // Violet border
    backgroundColor: '#ffffff',  // White inside
    borderRadius: '50px',        // Rounded pill shape
    color: '#8A2BE2',            // Violet text
    padding: '8px 16px',
    textDecoration: 'none',
    fontWeight: '500',
  }}
>
  <FaLinkedin size={18} style={{ color: '#0077B5', marginRight: '8px' }} />
  Connect
</a>



                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>

      <Belowbar />
    </div>
  );
};

export default About;