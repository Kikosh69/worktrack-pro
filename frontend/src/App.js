import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Auth & Layout
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import NavbarMenu from './components/NavbarMenu';

// Pages
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Projects from './components/Projects';
import CreateProfile from './components/CreateProfile';
import EditProfile from './components/EditProfile';

// Employees
import EmployeeList from './components/Employees/EmployeeList';
import AddEmployee from './components/Employees/AddEmployee';
import EditEmployee from './components/Employees/EditEmployee';
import EmployeeDetails from './components/Employees/EmployeeDetails';
import Employees from './components/Employees';

// Company Items
import CompanyItemList from './components/CompanyItemList';
import AddCompanyItem from './components/AddCompanyItem';
import EditCompanyItem from './components/EditCompanyItem';

// New Pages
import Calendar from './components/Calendar'; // Import kalendára
import Contacts from './components/Contacts'; // Import kontaktov
import Payments from './components/Payments'; // Import platieb

// Import Bootstrap Icons globally
import 'bootstrap-icons/font/bootstrap-icons.css';

function AppContent() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      {isAuthenticated && <NavbarMenu />}
      <div style={{ paddingTop: isAuthenticated ? '80px' : '0px' }}>
        <Routes>
          {!isAuthenticated && <Route path="/*" element={<Login />} />}
          {isAuthenticated && (
            <>
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/employees" element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
              <Route path="/add-employee" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
              <Route path="/edit-employee/:id" element={<ProtectedRoute><EditEmployee /></ProtectedRoute>} />
              <Route path="/edit-details/:id" element={<ProtectedRoute><EmployeeDetails /></ProtectedRoute>} />
              <Route path="/company-items" element={<ProtectedRoute><CompanyItemList /></ProtectedRoute>} />
              <Route path="/add-company-item" element={<ProtectedRoute><AddCompanyItem /></ProtectedRoute>} />
              <Route path="/edit-company-item/:id" element={<ProtectedRoute><EditCompanyItem /></ProtectedRoute>} />
              <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} /> {/* Cesta pre kalendár */}
              <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} /> {/* Cesta pre kontakty */}
              <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} /> {/* Cesta pre platby */}
              <Route path="/create-profile" element={<ProtectedRoute><CreateProfile /></ProtectedRoute>} />
              <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
              <Route path="/*" element={<Navigate to="/dashboard" replace />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}