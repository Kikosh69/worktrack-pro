import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

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
      <h1>Company Item List</h1>
      <Link to="/add-company-item" className="btn btn-primary mb-3">Add Company Item</Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companyItems.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>
                <Link to={`/edit-company-item/${item._id}`} className="btn btn-warning mr-2">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CompanyItemList;