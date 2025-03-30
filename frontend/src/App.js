import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import CompanyItemList from './components/CompanyItemList';
import AddCompanyItem from './components/AddCompanyItem';
import EditCompanyItem from './components/EditCompanyItem';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard'; // opravený import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/employees" element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
        <Route path="/add-employee" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
        <Route path="/edit-employee/:id" element={<ProtectedRoute><EditEmployee /></ProtectedRoute>} />
        <Route path="/company-items" element={<ProtectedRoute><CompanyItemList /></ProtectedRoute>} />
        <Route path="/add-company-item" element={<ProtectedRoute><AddCompanyItem /></ProtectedRoute>} />
        <Route path="/edit-company-item/:id" element={<ProtectedRoute><EditCompanyItem /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
