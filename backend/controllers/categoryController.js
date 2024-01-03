const Category = require('../models/Category');

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addCategory: async (req, res) => {
    try {
      const newCategory = new Category(req.body);
      await newCategory.save();
      res.json({ message: 'Category added successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

 deleteCategory : async (req, res) => {
  try {
    const { id } = req.params.id;

    // Delete the category by ID from the database
    await Category.findByIdAndDelete(id);

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }

}
};
module.exports = categoryController;
