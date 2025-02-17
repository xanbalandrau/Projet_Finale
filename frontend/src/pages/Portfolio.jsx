import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

import SkillCards from "../components/card/Cards";
import Particle from "../components/partials/Particle";

const API_URL = process.env.REACT_APP_API_URL;
const Portfolio = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/skills/`);
        // Vérification de la réponse HTTP
        if (response.status < 200 || response.status >= 300) {
          throw new Error(
            `Error HTTP: ${response.status} ${response.statusText}`
          );
        }

        setSkills(response.data.skills);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setSkills([]);
      }
    };
    fetchSkills();
  }, []);
  return (
    <Container fluid className="project-section">
      <Particle />
      <h1 className="project-heading">Portfolio</h1>
      <Row style={{ justifyContent: "center" }}>
        {skills.map((skill) => (
          <Col xs={12} sm={6} lg={4} className="project-card">
            <SkillCards key={skill._id} {...skill} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Portfolio;
