import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Import Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

function NavbarMenu() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="navbar" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/dashboard" className="navbar-brand">
          <i className="bi bi-rocket"></i> WorkTrack
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">
              <i className="bi bi-speedometer2"></i> Dashboard
            </Nav.Link>
            <Nav.Link href="/employees">
              <i className="bi bi-people"></i> Zamestnanci
            </Nav.Link>
            <Nav.Link href="/projects">
              <i className="bi bi-folder"></i> Projekty
            </Nav.Link>
            <Nav.Link href="/company-items">
              <i className="bi bi-box"></i> Firemné položky
            </Nav.Link>
            <Nav.Link href="/calendar">
              <i className="bi bi-calendar"></i> Kalendár
            </Nav.Link>
            <Nav.Link href="/contacts">
              <i className="bi bi-person-lines-fill"></i> Kontakty
            </Nav.Link>
            <Nav.Link href="/payments">
              <i className="bi bi-cash-stack"></i> Platby
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown 
              title={
                <span>
                  <i className="bi bi-person-circle"></i> Môj účet
                </span>
              } 
              id="account-dropdown" 
              align="end"
            >
              <NavDropdown.Item href="/edit-profile">
                <i className="bi bi-gear"></i> Upraviť profil
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                <i className="bi bi-box-arrow-right"></i> Odhlásiť sa
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;