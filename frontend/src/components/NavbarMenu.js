import React, { useContext } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavbarMenu = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate(); // <- navigácia po odhlásení

  const handleLogout = () => {
    logout();           // odstráni token a nastaví false
    navigate('/login'); // presmeruje na login
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">Správa zamestnancov</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse id="navbar-content">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/employees">Zamestnanci</Nav.Link>
            <Nav.Link as={Link} to="/company-items">Firemné dáta</Nav.Link>
            <Nav.Link as={Link} to="/projects">Vytvoriť projekt</Nav.Link>
            <Nav.Link as={Link} to="/create-profile">Vytvoriť profil</Nav.Link>
          </Nav>

          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-light" id="user-dropdown">
              ☰
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/edit-profile">Upraviť profil</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Odhlásiť sa</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMenu;
