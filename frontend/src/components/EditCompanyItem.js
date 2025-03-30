import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditCompanyItem() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/company-items/${id}`, {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    }).then(res => setForm(res.data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/company-items/${id}`, form, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      navigate('/company-items');
    } catch (err) {
      alert('Chyba pri úprave');
    }
  };

  return (
    <div>
      <h2>Upraviť firemný predmet</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} />
        <input name="description" value={form.description} onChange={handleChange} />
        <input name="category" value={form.category} onChange={handleChange} />
        <button type="submit">Uložiť zmeny</button>
      </form>
    </div>
  );
}

export default EditCompanyItem;
