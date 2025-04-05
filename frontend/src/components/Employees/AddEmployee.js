import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';
import axios from 'axios';

function AddEmployee() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEmployee = {
      firstName,
      lastName,
      position,
      department,
      startDate: new Date()
    };

    try {
      await axios.post('http://localhost:5001/api/employees', newEmployee);
      navigate('/employees');
    } catch (error) {
      console.error('Chyba pri ukladaní zamestnanca:', error.response?.data || error.message);
      alert('Chyba pri ukladaní zamestnanca');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="text-center mb-4">Pridať zamestnanca</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Meno</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Priezvisko</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Pozícia</Form.Label>
            <Form.Control
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Oddelenie</Form.Label>
            <Form.Control
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </Form.Group>

          <Button className="mt-3" type="submit">Uložiť</Button>
        </Form>
      </Card>
    </Container>
  );
}

export default AddEmployee;
