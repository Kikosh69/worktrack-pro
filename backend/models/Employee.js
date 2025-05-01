const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  project: {
    type: String,
  },
  country: {
    type: String,
  },
  hourlyRate: {
    type: Number,
  },
  accommodationAddress: {
    type: String,
  },
  accommodationPrice: {
    type: Number,
  },
  contracts: {
    type: [String],
    default: []
  },
  certificates: {
    type: [String],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
