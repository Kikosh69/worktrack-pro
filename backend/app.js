const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // musí byť prvé

const { createAdmin } = require('./controllers/authController');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Kontrola MONGO_URI
if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is not defined in .env file!");
  process.exit(1);
}

// Pripojenie k MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  createAdmin(); // správne spustenie
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// Routes
app.use('/api/employees', require('./routes/employees'));
app.use('/api/company-items', require('./routes/companyItems'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
