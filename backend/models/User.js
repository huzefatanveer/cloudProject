// userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: Number }, // Add the id field
  email: { type: String},
  name: { type: String },
  phone: { type: String },
  password: { type: String },
  skills: { type: String },
  language: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
