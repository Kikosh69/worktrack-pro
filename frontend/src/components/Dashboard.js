import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CountUp from 'react-countup';

// Import Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    employeeCount: 0,
    projectCount: 0,
    countryCount: 0,
    recentEmployees: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/dashboard/stats');
        setStats(res.data);
      } catch (error) {
        console.error('Chyba pri načítaní dashboard dát:', error);
      }
    };

    fetchStats();
  }, []);

  const date = new Date().toLocaleString('sk-SK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Container className="mt-5 pt-5">
      <div className="text-center text-white mb-4">
        <h2 className="dashboard-welcome">Vitaj späť, Maťo!</h2>
        <p className="dashboard-date">{date}</p>
      </div>

      <Row className="mb-4">
        {[
          { label: 'Zamestnanci', value: stats.employeeCount, icon: 'bi-people' },
          { label: 'Projekty', value: stats.projectCount, icon: 'bi-folder' },
          { label: 'Krajiny', value: stats.countryCount, icon: 'bi-globe' },
          { label: 'Dnes na smene', value: 0, icon: 'bi-hourglass' } // môže byť neskôr dynamické
        ].map((stat, i) => (
          <Col md={6} lg={3} className="mb-4" key={i}>
            <Card className="dashboard-stat-card">
              <Card.Body className="text-center">
                <i className={`bi ${stat.icon}`} style={{ fontSize: '2rem', color: '#fff' }}></i>
                <h3>
                  <CountUp end={stat.value} duration={1.5} separator=" " />
                </h3>
                <p style={{ marginBottom: 0 }}>{stat.label}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Shortcuty */}
      <Row className="mb-4">
        <Col md={6} className="mb-3">
          <Card className="dashboard-shortcut-card glass-card text-white text-center" onClick={() => navigate('/add-employee')}>
            <Card.Body>
              <h5>
                <i className="bi bi-plus-circle" style={{ marginRight: '8px' }}></i>
                Pridať zamestnanca
              </h5>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card className="dashboard-shortcut-card glass-card text-white text-center" onClick={() => navigate('/projects')}>
            <Card.Body>
              <h5>
                <i className="bi bi-collection" style={{ marginRight: '8px' }}></i>
                Prehľad projektov
              </h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Notifikácie */}
      <Card className="dashboard-notification-card glass-card text-white">
        <Card.Header className="dashboard-notification-header">
          <i className="bi bi-bell" style={{ marginRight: '8px' }}></i>
          Poslední zamestnanci
        </Card.Header>
        <Card.Body>
          <ul className="mb-0">
            {stats.recentEmployees.length === 0 && <li>Žiadni noví zamestnanci</li>}
            {stats.recentEmployees.map((emp) => (
              <li key={emp._id}>
                {emp.firstName} {emp.lastName} • {new Date(emp.createdAt).toLocaleDateString('sk-SK')}
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Dashboard;