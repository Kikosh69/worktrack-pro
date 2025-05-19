import React from 'react';
import { Container, Card } from 'react-bootstrap';

// Import Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

function Projects() {
  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="text-center mb-4">
          <i className="bi bi-folder"></i> Projekty
        </h2>
        {/* Tu môžeš pridať obsah pre projekty */}
        <p className="text-center">
          <i className="bi bi-folder-fill"></i> Žiadne projekty zatiaľ neboli pridané.
        </p>
      </Card>
    </Container>
  );
}

export default Projects;