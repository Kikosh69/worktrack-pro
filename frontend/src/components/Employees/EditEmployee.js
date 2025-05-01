import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    position: ''
  });

  useEffect(() => {
    // Fetch employee data when the component mounts
    const fetchEmployee = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5001/api/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData(response.data);
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5001/api/employees/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert('Employee updated successfully');
  };

  return (
    <Container>
      <h1 className="mt-4">Edit Employee</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Employee
        </Button>
      </Form>
    </Container>
  );
};

export default EditEmployee;