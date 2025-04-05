import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Container, Card } from 'react-bootstrap';
import axios from 'axios';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/employees');
      setEmployees(res.data);
    } catch (error) {
      console.error('Chyba pri načítaní zoznamu:', error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Chyba pri mazaní zamestnanca:', error);
      alert('Zamestnanca sa nepodarilo odstrániť.');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="text-center mb-4">Zamestnanci</h2>
        <Button className="mb-3" onClick={() => navigate('/add-employee')}>+ Pridať zamestnanca</Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Meno</th>
              <th>Priezvisko</th>
              <th>Pozícia</th>
              <th>Oddelenie</th>
              <th>Akcie</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp._id}>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.position}</td>
                <td>{emp.department}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => navigate(`/edit-employee/${emp._id}`)}>Upraviť</Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => deleteEmployee(emp._id)}>Zmazať</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}

export default EmployeeList;
