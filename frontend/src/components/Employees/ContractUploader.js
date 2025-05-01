import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const ContractUploader = ({ employeeId, onUpload }) => {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('contract', file);

    try {
      const res = await axios.post(`http://localhost:5001/api/employees/${employeeId}/upload-contract`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Zmluva bola úspešne nahratá.');
      setError('');
      setFile(null);
      if (onUpload) onUpload(res.data.updatedEmployee);
    } catch (err) {
      setSuccess('');
      setError('Chyba pri nahrávaní súboru.');
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleUpload}>
      <Form.Group controlId="contractUpload" className="mb-2">
        <Form.Label>Pridať zmluvu</Form.Label>
        <Form.Control type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
      </Form.Group>
      <Button type="submit" variant="outline-info" disabled={!file}>
        Nahrať
      </Button>
      {success && <Alert variant="success" className="mt-2">{success}</Alert>}
      {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
    </Form>
  );
};

export default ContractUploader;
