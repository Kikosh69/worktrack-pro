import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import NavbarMenu from './NavbarMenu';

function CreateProfile() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { username, password, role, name, email });
      alert('Profil vytvorený úspešne');
    } catch (error) {
      console.error('Chyba pri vytváraní profilu:', error);
      alert('Chyba pri vytváraní profilu');
    }
  };

  return (
    <div>
      <NavbarMenu />
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="p-4 shadow-lg">
              <h1 className="text-center">Vytvoriť Profil</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Používateľské meno</Form.Label>
                  <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Heslo</Form.Label>
                  <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Rola</Form.Label>
                  <Form.Control type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Meno</Form.Label>
                  <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </Form.Group>
                <Button type="submit" className="btn btn-primary w-100 mt-4">Vytvoriť Profil</Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CreateProfile;