import React, { useState } from 'react';
import axios from 'axios';

const CreateProfile = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/auth/register', {
        ...form,
        role: 'user'
      });
      alert('Profil úspešne vytvorený!');
    } catch (err) {
      alert('Chyba: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Používateľské meno" value={form.username} onChange={handleChange} required />
      <input name="name" placeholder="Meno" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="password" type="password" placeholder="Heslo" value={form.password} onChange={handleChange} required />
      <button type="submit">Vytvoriť profil</button>
    </form>
  );
};

export default CreateProfile;