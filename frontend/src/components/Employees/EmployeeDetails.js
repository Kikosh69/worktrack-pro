import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    type: '',
    country: '',
    project: '',
    hourlyRate: '',
    accommodationAddress: '',
    accommodationPrice: ''
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/employees/${id}`);
        if (response.data) {
          const {
            type = '',
            country = '',
            project = '',
            hourlyRate = '',
            accommodationAddress = '',
            accommodationPrice = ''
          } = response.data;

          setDetails({
            type,
            country,
            project,
            hourlyRate,
            accommodationAddress,
            accommodationPrice
          });
        }
      } catch (error) {
        console.error('Chyba pri načítaní firemných údajov:', error);
        alert('Nepodarilo sa načítať firemné údaje');
      }
    };

    fetchDetails();
  }, [id]);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/employees/${id}`, details);
      navigate('/employees');
    } catch (error) {
      console.error('Chyba pri ukladaní firemných údajov:', error);
      alert('Nepodarilo sa uložiť firemné údaje');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="text-center mb-4">Firemné údaje</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Typ</Form.Label>
            <Form.Control
              type="text"
              name="type"
              value={details.type}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Krajina</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={details.country}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Projekt</Form.Label>
            <Form.Control
              type="text"
              name="project"
              value={details.project}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Hodinová mzda</Form.Label>
            <Form.Control
              type="number"
              name="hourlyRate"
              value={details.hourlyRate}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Adresa ubytovania</Form.Label>
            <Form.Control
              type="text"
              name="accommodationAddress"
              value={details.accommodationAddress}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cena ubytovania</Form.Label>
            <Form.Control
              type="number"
              name="accommodationPrice"
              value={details.accommodationPrice}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" className="mt-3">Uložiť údaje</Button>
        </Form>
      </Card>
    </Container>
  );
}

export default EmployeeDetails;
