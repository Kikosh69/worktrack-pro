import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function Dashboard() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/dashboard">Employee Management App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/employees">Manage Employees</Nav.Link>
              <Nav.Link href="/company-items">Manage Company Items</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-5 text-white">
        <h1>Dashboard</h1>
        <p>Welcome to the Employee Management App Dashboard. Use the navigation menu to manage employees and company items.</p>
      </Container>
    </div>
  );
}

export default Dashboard;
