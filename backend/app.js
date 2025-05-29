const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/auth');
const { createAdmin } = require('./controllers/authController');

const app = express();
app.use(cors());
app.use(express.json());

const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);

mongoose.connect('mongodb://localhost:27017/worktrack-pro', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB connected');
  await createAdmin();
})
.catch((err) => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/employees', employeeRoutes);
app.use('/api/auth', authRoutes);

// Server start
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});