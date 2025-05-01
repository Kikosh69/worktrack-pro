const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/auth');
const { createAdmin } = require('./controllers/authController'); // ✅ Import

const app = express();
app.use(cors());
app.use(express.json());

const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/worktrack', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB connected');
  await createAdmin(); // ✅ Spustenie funkcie na vytvorenie admina
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
