import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

// Import Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

function CompanyItemList() {
  const [companyItems, setCompanyItems] = useState([]);

  useEffect(() => {
    axios.get('/api/company-items')
      .then(response => {
        setCompanyItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the company items!', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1>
        <i className="bi bi-box"></i> Firemné položky
      </h1>
      <Link to="/add-company-item" className="btn btn-primary mb-3">
        <i className="bi bi-plus-circle"></i> Pridať firemnú položku
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Názov</th>
            <th>Popis</th>
            <th>Kategória</th>
            <th>Akcie</th>
          </tr>
        </thead>
        <tbody>
          {companyItems.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>
                <Link to={`/edit-company-item/${item._id}`} className="btn btn-warning mr-2">
                  <i className="bi bi-pencil"></i> Upraviť
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CompanyItemList;