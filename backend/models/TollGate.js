const mongoose = require('mongoose');

const tollGateSchema = new mongoose.Schema({
  name: String,
  location: String,
  fee: String,
});

const TollGate = mongoose.model('TollGate', tollGateSchema);

module.exports = TollGate;
