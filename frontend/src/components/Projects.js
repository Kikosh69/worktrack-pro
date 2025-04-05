import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/projects', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data);
      } catch (err) {
        setError('Nepodarilo sa načítať projekty. Skontroluj pripojenie k serveru.');
        console.error(err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Container>
      <h1 className="mt-4">Projekty</h1>
      {error && <div className="text-danger mt-2">{error}</div>}
      {projects.map((project) => (
        <Card key={project._id} className="mt-4">
          <Card.Body>
            <Card.Title>{project.name}</Card.Title>
            <Card.Text>{project.description}</Card.Text>
            <Button variant="primary">Zobraziť detail</Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Projects;
