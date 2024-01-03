const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id : String,
  name: String,
  description: String,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
