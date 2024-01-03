const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
    id : String,
  name: String,
  email: String,
  address: String
});

const Recipient = mongoose.model('Recipient', recipientSchema);

module.exports = Recipient;
