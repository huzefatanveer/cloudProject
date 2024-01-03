const mongoose = require('mongoose');

const passSchema = new mongoose.Schema({
  id: String,
  dateCreated: String,
  passCode: String,
  owner: String,
  category: String,
  toll: String,
  cost: String,
});

const Pass = mongoose.model('Pass', passSchema);

module.exports = Pass;
