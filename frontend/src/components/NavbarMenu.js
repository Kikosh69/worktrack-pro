import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function NavbarMenu() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <Navbar
      expand="lg"
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: 'rgba(10, 25, 47, 0.8)',
        borderBottom: '1px solid rgba(0, 150, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 150, 255, 0.25)',
        zIndex: 1030
      }}
      variant="dark"
      fixed="top"
    >
      <Container>
        <Navbar.Brand
          href="/dashboard"
          style={{
            fontWeight: 700,
            fontSize: '1.6rem',
            color: '#0ef',
            letterSpacing: '1px',
            textShadow: '0 0 8px #0ef'
          }}
        >
          🚀 WorkTrack
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/employees">Zamestnanci</Nav.Link>
            <Nav.Link href="/projects">Projekty</Nav.Link>
            <Nav.Link href="/company-items">Firemné položky</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="👤 Môj účet" id="account-dropdown" align="end">
              <NavDropdown.Item href="/edit-profile">🛠 Upraviť profil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>🚪 Odhlásiť sa</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;
