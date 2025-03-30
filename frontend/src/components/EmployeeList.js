import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, Container, Alert } from 'react-bootstrap';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees', {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      setEmployees(response.data);
    } catch (err) {
      console.error(err);
      setError('Nepodarilo sa načítať zamestnancov.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Naozaj chcete zmazať tohto zamestnanca?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      setEmployees(employees.filter((emp) => emp._id !== id));
    } catch (err) {
      console.error(err);
      setError('Chyba pri odstraňovaní zamestnanca.');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-light mb-4 text-center">Zoznam zamestnancov</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add" className="btn btn-success">
          + Pridať zamestnanca
        </Link>
      </div>
      <Table striped bordered hover variant="dark" responsive>
        <thead>
          <tr>
            <th>Meno</th>
            <th>Pozícia</th>
            <th>Oddelenie</th>
            <th>Akcie</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                Žiadni zamestnanci
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.position}</td>
                <td>{emp.department}</td>
                <td>
                  <Link to={`/edit/${emp._id}`} className="btn btn-warning btn-sm me-2">
                    Upraviť
                  </Link>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(emp._id)}>
                    Zmazať
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default EmployeeList;
