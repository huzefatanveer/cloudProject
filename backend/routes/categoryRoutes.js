const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/categories', categoryController.getCategories);
router.post('/categories', categoryController.addCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;
