import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Row, Col, ListGroup, Badge } from 'react-bootstrap';
import axios from 'axios';
import ContractUploader from './ContractUploader';

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/employees/${id}`);
        setEmployee(res.data);
      } catch (err) {
        console.error('Chyba pri načítaní profilu zamestnanca:', err);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <p className="text-white text-center mt-5">Načítavam profil...</p>;
  }

  return (
    <Container className="pt-5 mt-4">
      <Card
        className="p-4 shadow-lg mb-4"
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(12px)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Card.Title className="mb-3">
          👤 {employee.firstName} {employee.lastName}
        </Card.Title>

        <Row>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>📍 Pozícia: <b>{employee.position}</b></ListGroup.Item>
              <ListGroup.Item>📞 Telefón: {employee.phone}</ListGroup.Item>
              <ListGroup.Item>📧 Email: {employee.email}</ListGroup.Item>
              <ListGroup.Item>🏢 Projekt: {employee.project}</ListGroup.Item>
              <ListGroup.Item>🌍 Krajina: {employee.country}</ListGroup.Item>
              <ListGroup.Item>💶 Mzda: {employee.hourlyRate} €/h</ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>🏨 Ubytovanie: {employee.accommodationAddress}</ListGroup.Item>
              <ListGroup.Item>💰 Cena ubytovania: {employee.accommodationPrice} €</ListGroup.Item>
              <ListGroup.Item>
                📄 Zmluvy:{" "}
                {employee.contracts?.length > 0 ? (
                  employee.contracts.map((c, i) => (
                    <div key={i}>
                      <a href={`http://localhost:5001/uploads/${c}`} target="_blank" rel="noreferrer">
                        {c}
                      </a>
                    </div>
                  ))
                ) : (
                  <Badge bg="secondary">Žiadne zmluvy</Badge>
                )}
                {/* Tu je uploader */}
                <div className="mt-2">
                  <ContractUploader
                    employeeId={employee._id}
                    onUpload={(updated) => setEmployee(updated)}
                  />
                </div>
              </ListGroup.Item>

              <ListGroup.Item>
                🧾 Certifikáty:{" "}
                {employee.certificates?.length > 0 ? (
                  employee.certificates.map((cert, i) => (
                    <Badge key={i} bg="info" className="me-1">
                      {cert}
                    </Badge>
                  ))
                ) : (
                  <Badge bg="secondary">Žiadne</Badge>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>

        <div className="mt-4 d-flex justify-content-end">
          <Button variant="outline-light" onClick={() => navigate(`/edit-employee/${employee._id}`)}>
            ✏️ Upraviť profil
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default EmployeeProfile;
