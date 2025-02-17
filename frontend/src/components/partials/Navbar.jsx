import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";

const NavBar = () => {
  const [expand, updateExpanded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateAuthenticationStatus = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // true si le token existe, sinon false
  };

  // Effet qui s'exécute au montage du composant
  useEffect(() => {
    updateAuthenticationStatus();
  }, []);

  return (
    <Navbar expanded={expand} fixed="top" expand="md" className="navbar">
      <Container>
        <NavbarBrand>
          <Link to="/" onClick={() => updateExpanded(false)}>
            Home
          </Link>
        </NavbarBrand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Link to="/portfolio" onClick={() => updateExpanded(false)}>
                Portfolio
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link to="/login" onClick={() => updateExpanded(false)}>
                Login
              </Link>
            </Nav.Item>
            {isAuthenticated ? (
              <Nav.Item>
                <Link to="/dashboard" onClick={() => updateExpanded(false)}>
                  Dashboard
                </Link>
              </Nav.Item>
            ) : (
              ""
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
