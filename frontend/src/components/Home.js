import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

function Home() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Správa zamestnancov</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/employees">Zamestnanci</Nav.Link>
              <Nav.Link as={Link} to="/company">Firemné dáta</Nav.Link>
              <Nav.Link as={Link} to="/logout">Odhlásiť sa</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-5 text-white">
        <h1>Vitajte v aplikácii pre správu zamestnancov</h1>
      </Container>
    </>
  );
}

export default Home;