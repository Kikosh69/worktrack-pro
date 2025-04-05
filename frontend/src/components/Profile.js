import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, Form } from 'react-bootstrap';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Fetch profile data when the component mounts
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
      setFormData(response.data);
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.put('http://localhost:5001/api/profile', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProfile(formData);
    setEditing(false);
  };

  return (
    <Container>
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Profile</Card.Title>
          {editing ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Save
              </Button>
            </Form>
          ) : (
            <div>
              <p>Username: {profile.username}</p>
              <Button variant="primary" onClick={() => setEditing(true)}>
                Edit
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;