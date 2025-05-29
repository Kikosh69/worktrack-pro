const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  name: { type: String },
  email: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);