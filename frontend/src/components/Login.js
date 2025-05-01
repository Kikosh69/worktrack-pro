import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', {
        username,
        password,
      });

      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (error) {
      console.error('Chyba pri prihlásení:', error?.response?.data || error.message);
      alert('Nesprávne meno alebo heslo');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Card className="p-4 shadow" style={{ minWidth: '300px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Meno</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="admin"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Heslo</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="adminpassword"
            />
          </Form.Group>

          <Button type="submit" className="w-100">Login</Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;
