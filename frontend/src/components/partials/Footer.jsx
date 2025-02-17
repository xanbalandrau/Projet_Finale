import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ButtonCookie from "./ButtonCookie";


import "../../styles/Footer.css";

const Footer = () => {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <p className="footer-text">Designed by Soumyajit Basak</p>
        </Col>
        <Col md="4" className="footer-copywright">
          <p className="footer-text">Copyright © {year} SB</p>
        </Col>
        <Col md="4" style={{ textAlign: "center" }}>
          <ButtonCookie />
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
