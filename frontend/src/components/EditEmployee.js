import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    position: '',
    department: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/${id}`, {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        setEmployee(response.data);
      } catch (err) {
        console.error(err);
        setError('Nepodarilo sa načítať zamestnanca.');
      }
    };

    fetchEmployee();
  }, [id]);

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
      await axios.put(`http://localhost:5000/api/employees/${id}`, employee, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        }
      });
      navigate('/employees');
    } catch (err) {
      console.error(err);
      setError('Chyba pri aktualizácii zamestnanca.');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 bg-dark text-light shadow">
        <h2 className="mb-4 text-center">Upraviť zamestnanca</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Meno</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              placeholder="Zadajte meno"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Pozícia</Form.Label>
            <Form.Control
              type="text"
              name="position"
              value={employee.position}
              onChange={handleChange}
              placeholder="Zadajte pozíciu"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Oddelenie</Form.Label>
            <Form.Control
              type="text"
              name="department"
              value={employee.department}
              onChange={handleChange}
              placeholder="Zadajte oddelenie"
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Uložiť zmeny
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default EditEmployee;
