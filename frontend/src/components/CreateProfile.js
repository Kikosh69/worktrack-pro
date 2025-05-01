import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function CreateProfile() {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/profiles', profile);
      alert('Profil bol úspešne vytvorený.');
    } catch (error) {
      console.error('Chyba pri vytváraní profilu:', error);
      alert('Nepodarilo sa vytvoriť profil.');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="text-center mb-4">Vytvoriť profil</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Užívateľské meno</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Heslo</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button className="mt-3" type="submit">Vytvoriť</Button>
        </Form>
      </Card>
    </Container>
  );
}

export default CreateProfile;