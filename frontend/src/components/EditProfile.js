import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EditProfile() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    axios.get('/api/auth/me', {
      headers: { 'x-auth-token': localStorage.getItem('token') }
    }).then(res => setForm({ ...form, ...res.data }));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.patch('/api/auth/me', form, {
      headers: { 'x-auth-token': localStorage.getItem('token') }
    });
    alert('Profil upravený');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Meno" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Nové heslo" />
      <button type="submit">Uložiť zmeny</button>
      <a href="/register">Vytvoriť nový účet</a>
    </form>
  );
}

export default EditProfile;