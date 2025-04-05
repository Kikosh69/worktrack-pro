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
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
