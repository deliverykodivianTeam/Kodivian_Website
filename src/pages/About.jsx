import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/About.css";
import "../styles/Certifications.css";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ISO9001Badge, ISO27001Badge } from "./Certifications";
import Belowbar from "../components/Belowbar"; // Assuming this is used elsewhere in your actual component
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
import tiCycleLogo from "../assets/tii-logo.png";
import murugappaLogo from "../assets/murugappa.png";
import khazanaLogo from "../assets/khazana.png";
import sharatIndustriesLogo from "../assets/sharat-industries.png";
import dmccLogo from "../assets/dmcc.png";
import aavaBrandsLogo from "../assets/aava-logo.jpeg";
import tiMedicallogo from "../assets/ti-medical-logo.png";
import Innoventure_logo from "../assets/3xper_innoventure_limited_logo.png";
import shanthigearslogo from "../assets/shanthi-gears.png";
import ezcloud from "../assets/ezcloud.png";
import ionidea from "../assets/ionidea.png";
import eastman from "../assets/eastman.png";
import stedmanlogo from '../assets/stedman-logo.jpeg';
import teamlogo from '../assets/Team-logo.jpeg';
import lifecelllogo from '../assets/lifecell-logo.png';
import svr from '../assets/SV&R.png';
import jkf from '../assets/JKF.png';
import tafe from '../assets/TAFE.svg';
import tvs from "../assets/TVS.png";

// import Kodivian Team members
import Chairman from "../assets/chairman.jpeg";
import Director from "../assets/directer.jpeg";
import Mothi from "../assets/Mothi.jpeg";
import Kaviya from "../assets/Kaviya.jpeg";
import Preethi from "../assets/Preethi.jpeg";
import Hari from "../assets/Hari.jpg";
import Kavi from "../assets/kavi.jpg";
import Ramanan from "../assets/Ramanan.jpg";
import Manoranjan from "../assets/Manoranjan.jpeg"

const About = () => {
  const solutions = ["Scanify", "Process Builder", "Support Forge"];
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
  const scrollingLogosRef = useRef(null);

  // State for animated counters
  const [yearsExperience, setYearsExperience] = useState(0);
  const [teamMembersCount, setTeamMembersCount] = useState(0);
  const [satisfiedClients, setSatisfiedClients] = useState(0);
  const [completeProjects, setCompleteProjects] = useState(0);

  const clientLogos = [
    ponpureLogo, tiCycleLogo, murugappaLogo, khazanaLogo,
    ezcloud, ionidea, eastman, sharatIndustriesLogo,
    dmccLogo, aavaBrandsLogo, tiMedicallogo,
    Innoventure_logo, shanthigearslogo, stedmanlogo, teamlogo, lifecelllogo, svr, jkf, tafe, tvs
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
      name: "Mothi Kumaresan",
      role: "Business Development Manager",
      image: Mothi,
      linkedin: "https://www.linkedin.com/in/mothi-kumaresan-4a435b22?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAASt5fwBURhttUBecc5ESWUM-IEWPl3iLyY&lipi=urn%3Ali%3Apage%3Acompanies_company_people_index%3B5747f2ad-23de-4df0-9690-11093ad7c7fe",
    },
    {
      name: "Kaviya Arivaratharaj",
      role: "Global PMO Executive",
      image: Kaviya,
      linkedin: "https://www.linkedin.com/in/kaviya-arivaratharaj-701436253?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAD6Iv3EBqYLk-gYm8vy1zSEloGtMluS_Ucw&lipi=urn%3Ali%3Apage%3Acompanies_company_people_index%3B5747f2ad-23de-4df0-9690-11093ad7c7fe",
    },
    {
      name: "Preethi JB",
      role: "Python Developer",
      image: Preethi,
      linkedin: "https://www.linkedin.com/in/preethijb03?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAE8SmBwBxakLMoqv_Rvvr7PShOA2griketE&lipi=urn%3Ali%3Apage%3Acompanies_company_people_index%3B5747f2ad-23de-4df0-9690-11093ad7c7fe",
    },

    {
      name: "Hari Sankar M ",
      role: "Infra Support Engineer",
      image: Hari,
      linkedin: "https://www.linkedin.com/in/hari-shankar-57a081310/",
    },
    {
      name: "Kaviarasan S",
      role: "Software Developer",
      image: Kavi,
      linkedin: "https://www.linkedin.com/in/kaviarasan2012/",
    },
    {
      name: "Ramanan D",
      role: "Software Developer",
      image: Ramanan,
      linkedin: "https://www.linkedin.com/in/ramanan2904/",
    },
    {
      name: "Manoranjan.KS",
      role: "Business Analyst",
      image: Manoranjan,
      linkedin: "https://www.linkedin.com/in/manoranjan-k-s-137b47242?utm",
    },


  ];

  // Effect for rotating solutions text
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSolutionIndex(
        (prevIndex) => (prevIndex + 1) % solutions.length
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [solutions.length]);

  // Effects for counting animations
  useEffect(() => {
    const animateCount = (setter, target, duration = 1000) => {
      let start = 0;
      const increment = target / (duration / 10); // Adjust 10ms for smoother animation
      const timer = setInterval(() => {
        start += increment;
        if (start < target) {
          setter(Math.ceil(start));
        } else {
          setter(target);
          clearInterval(timer);
        }
      }, 10);
      return () => clearInterval(timer);
    };

    const stopYears = animateCount(setYearsExperience, 5, 1500); // 5 years, 1.5 seconds
    const stopTeam = animateCount(setTeamMembersCount, 30, 2000); // 30 members, 2 seconds
    const stopClients = animateCount(setSatisfiedClients, 60, 1800); // 60 clients, 1.8 seconds
    const stopProjects = animateCount(setCompleteProjects, 60, 2200); // 60 projects, 2.2 seconds

    return () => {
      stopYears();
      stopTeam();
      stopClients();
      stopProjects();
    };
  }, []); // Run once on component mount

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
      <Container fluid className="py-5 mt-0 bg-white about-hero-section fade-up">
        <Row className="py-0 mt-2 justify-content-center text-center">
          <Col lg={10}>
            <h1 className="display-4 fw-bold mb-4 rotating-solution-text text-center">
              Shaping the future through <br />
              innovative products{" "}
              <span className="colored-solution">
                {solutions[currentSolutionIndex]}
              </span>
            </h1>

          </Col>
        </Row>
      </Container>

      {/* Stats Section */}
      <Container className="py-5 about-stats-sections">
        <Row className="text-center justify-content-center g-4">
          <Col xs={6} md={2} className="mb-4">
            <div className="p-4 bg-light rounded shadow-sm h-100 d-flex flex-column align-items-center justify-content-center">
              <ClockIcon className="w-10 h-10 mb-3" />
              <div className="fs-1 fw-bold text-violet-600">{yearsExperience}</div>

              <p className="lead mb-0">Years Experience</p>
            </div>
          </Col>
          <Col xs={6} md={2} className="mb-4">
            <div className="p-4 bg-light rounded shadow-sm h-100 d-flex flex-column align-items-center justify-content-center">
              <UserGroupIcon className="w-10 h-10 mb-3" />
              <div className="fs-1 fw-bold text-violet-600">{teamMembersCount}</div>
              <p className="lead mb-0">Team Members</p>
            </div>
          </Col>
          <Col xs={6} md={2} className="mb-4">
            <div className="p-4 bg-light rounded shadow-sm h-100 d-flex flex-column align-items-center justify-content-center">
              <HeartIcon className="w-10 h-10 mb-3" />
              <div className="fs-1 fw-bold text-violet-600">{satisfiedClients}</div>
              <p className="lead mb-0">Satisfied Clients</p>
            </div>
          </Col>
          <Col xs={6} md={2} className="mb-4">
            <div className="p-4 bg-light rounded shadow-sm h-100 d-flex flex-column align-items-center justify-content-center">
              <CheckCircleIcon className="w-10 h-10 y mb-3" />
              <div className="fs-1 fw-bold text-violet-600">{completeProjects}</div>
              <p className="lead mb-0">Complete Projects</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Our Valued Clients Section */}
      <section id="our-cliented" className="py-5 bg-white overflow-hidden">
        <Container fluid>
          <h2 className="display-5 fw-bold text-center mb-5 text-violet">
            Our Valued Clients
          </h2>
          <div className="clients-grid">
            {clientLogos.map((logo, index) => {
              const isLastSingle =
                clientLogos.length % 3 === 1 &&
                index === clientLogos.length - 1;
              const isTVS = logo && logo.includes('TVS');

              return (
                <div
                  key={index}
                  className={`client-logo-box ${isLastSingle ? "center-last-logo" : ""}`}
                >
                  <img 
                    src={logo} 
                    alt={`Client ${index + 1}`} 
                    className={isTVS ? "tvs-logo" : ""} 
                  />
                </div>
              );
            })}
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
              capture, Process Builder for codeless workflow creation.
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
              logic.
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
            <p className="lead mb-0 text-white">
              Our innovation engine drives efficiency through a powerful suite of
              intelligent automation tools. From Scannify's effortless document
              scanning and data capture to Process Builder's intuitive no-code
              workflow automation.
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

      {/* Certifications & Compliance Section */}
      <Container className="py-5 certifications-section border-top border-light-purple" id="certifications">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-violet">Certifications & Compliance</h2>
          <div className="section-heading-under" />
          <p className="lead text-muted max-w-2xl mx-auto">
            Our commitment to international quality, data security, and cyber defense standards.
          </p>
        </div>
        <Row className="justify-content-center g-4 py-3">
          <Col lg={5} md={6}>
            <div className="certification-card iso-9001">
              <div>
                <Link to="/certifications/iso-9001">
                  <div className="cert-badge-wrapper">
                    <ISO9001Badge />
                  </div>
                </Link>
                <div className="cert-card-subtitle">ISO 9001:2015</div>
                <h3 className="cert-card-title">Quality Management System</h3>
                <p className="cert-card-desc">
                  Demonstrating our commitment to quality excellence, customer satisfaction, operational consistency, and continual improvement.
                </p>
              </div>
              <Link to="/certifications/iso-9001" className="cert-card-btn text-decoration-none">
                View Details
              </Link>
            </div>
          </Col>
          <Col lg={5} md={6}>
            <div className="certification-card iso-27001">
              <div>
                <Link to="/certifications/iso-27001">
                  <div className="cert-badge-wrapper">
                    <ISO27001Badge />
                  </div>
                </Link>
                <div className="cert-card-subtitle">ISO/IEC 27001:2022</div>
                <h3 className="cert-card-title">Information Security Management System</h3>
                <p className="cert-card-desc">
                  Ensuring the highest standards of information security, cybersecurity resilience, data protection, and risk management.
                </p>
              </div>
              <Link to="/certifications/iso-27001" className="cert-card-btn text-decoration-none">
                View Details
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
async function getClientIP() {
  const res = await fetch("https://api64.ipify.org?format=json");
  const data = await res.json();
  return data.ip;
}


export default About;