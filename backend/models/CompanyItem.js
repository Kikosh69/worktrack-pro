const mongoose = require('mongoose');

const CompanyItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  acquisitionDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CompanyItem', CompanyItemSchema);