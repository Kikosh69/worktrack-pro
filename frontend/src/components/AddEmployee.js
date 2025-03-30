import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';

function AddEmployee() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    position: '',
    department: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employee.name || !employee.position || !employee.department) {
      setError('Vyplňte všetky polia!');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/employees', employee, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        }
      });
      navigate('/employees');
    } catch (err) {
      console.error(err);
      setError('Chyba pri ukladaní zamestnanca.');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 bg-dark text-light shadow">
        <h2 className="mb-4 text-center">Pridať zamestnanca</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Meno</Form.Label>
            <Form.Control
              type="text"
              placeholder="Zadajte meno"
              name="name"
              value={employee.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Pozícia</Form.Label>
            <Form.Control
              type="text"
              placeholder="Zadajte pozíciu"
              name="position"
              value={employee.position}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Oddelenie</Form.Label>
            <Form.Control
              type="text"
              placeholder="Zadajte oddelenie"
              name="department"
              value={employee.department}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Uložiť
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default AddEmployee;
