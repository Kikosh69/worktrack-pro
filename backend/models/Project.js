const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
