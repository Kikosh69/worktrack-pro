import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CountUp from 'react-countup';


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
        <h2 style={{ textShadow: '0 0 6px #0ef' }}>Vitaj späť, Maťo!</h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.85 }}>{date}</p>
      </div>

      <Row className="mb-4">
        {[
          { label: 'Zamestnanci', value: stats.employeeCount, icon: '👷' },
          { label: 'Projekty', value: stats.projectCount, icon: '📁' },
          { label: 'Krajiny', value: stats.countryCount, icon: '🌍' },
          { label: 'Dnes na smene', value: 0, icon: '⏳' } // môže byť neskôr dynamické
        ].map((stat, i) => (
          <Col md={6} lg={3} className="mb-4" key={i}>
            <Card
              style={{
                background: 'rgba(0,0,0,0.45)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px rgba(0,150,255,0.25)',
                color: '#0ef'
              }}
            >
              <Card.Body className="text-center">
                <h1>{stat.icon}</h1>
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
          <Card className="glass-card text-white text-center" onClick={() => navigate('/add-employee')} style={{ cursor: 'pointer' }}>
            <Card.Body>
              <h5>➕ Pridať zamestnanca</h5>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card className="glass-card text-white text-center" onClick={() => navigate('/projects')} style={{ cursor: 'pointer' }}>
            <Card.Body>
              <h5>🗂 Prehľad projektov</h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Notifikácie */}
      <Card
        className="glass-card text-white"
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 4px 24px rgba(0,150,255,0.15)'
        }}
      >
        <Card.Header style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          🔔 Poslední zamestnanci
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
