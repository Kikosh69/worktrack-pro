import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddCompanyItem() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/company-items', form, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      navigate('/company-items');
    } catch (err) {
      alert('Chyba pri ukladaní');
    }
  };

  return (
    <div>
      <h2>Pridať firemný predmet</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Názov" onChange={handleChange} required />
        <input name="description" placeholder="Popis" onChange={handleChange} required />
        <input name="category" placeholder="Kategória" onChange={handleChange} required />
        <button type="submit">Uložiť</button>
      </form>
    </div>
  );
}

export default AddCompanyItem;
