import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap'; // Odstránili sme Button
import axios from 'axios';
import NavbarMenu from './NavbarMenu';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Chyba pri načítaní projektov:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <NavbarMenu />
      <Container className="mt-5 text-white">
        <h1>Projekty</h1>
        <Table striped bordered hover variant="dark" className="mt-3">
          <thead>
            <tr>
              <th>Názov</th>
              <th>Popis</th>
              <th>Stav</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{project.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Projects;