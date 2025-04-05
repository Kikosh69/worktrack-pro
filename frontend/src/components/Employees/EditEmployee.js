// EditEmployee.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';
import axios from 'axios';

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/employees/${id}`);
        const emp = res.data;
        setFirstName(emp.firstName || '');
        setLastName(emp.lastName || '');
        setPosition(emp.position || '');
        setDepartment(emp.department || '');
      } catch (error) {
        console.error('Chyba pri načítaní zamestnanca:', error);
        alert('Zamestnanca sa nepodarilo načítať');
      }
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedEmployee = {
      firstName,
      lastName,
      position,
      department
    };

    try {
      await axios.put(`http://localhost:5001/api/employees/${id}`, updatedEmployee);
      navigate('/employees');
    } catch (error) {
      console.error('Chyba pri ukladaní zmien:', error);
      alert('Nepodarilo sa uložiť zmeny');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="text-center mb-4">Upraviť zamestnanca</h2>
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

          <Button className="mt-3" type="submit">Uložiť zmeny</Button>
        </Form>
      </Card>
    </Container>
  );
}

export default EditEmployee;
