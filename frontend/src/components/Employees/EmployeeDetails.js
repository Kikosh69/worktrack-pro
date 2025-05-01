import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/employees/${id}`);
        setEmployee(res.data);
      } catch (error) {
        console.error('Chyba pri načítaní zamestnanca:', error);
        alert('Nepodarilo sa načítať zamestnanca.');
      }
    };

    fetchEmployee();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5001/api/employees/${id}`, employee);
      alert('Zamestnanec bol úspešne upravený.');
    } catch (error) {
      console.error('Chyba pri ukladaní zmien:', error);
      alert('Nepodarilo sa uložiť zmeny.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  if (!employee) return <div>Načítavam...</div>;

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="text-center mb-4">Upraviť zamestnanca</h2>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Meno</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={employee.firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Priezvisko</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={employee.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group>
            <Form.Label>Pozícia</Form.Label>
            <Form.Control
              type="text"
              name="position"
              value={employee.position}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Oddelenie</Form.Label>
            <Form.Control
              type="text"
              name="department"
              value={employee.department}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button className="mt-3" onClick={handleUpdate}>Uložiť zmeny</Button>
        </Form>
      </Card>
    </Container>
  );
}

export default EmployeeDetails;