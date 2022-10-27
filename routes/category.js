const express = require('express');
const router = express.Router();

const isAdmin = require('../middlewares/isAdmin');
const authMiddleware = require('../middlewares/authMiddleware');

const CategoriesController = require('../controllers/category.controller');
const categoriesController = new CategoriesController;


router.post('/',authMiddleware, isAdmin, categoriesController.createCategory);
router.put('/:categoryId',authMiddleware, isAdmin, categoriesController.updateCategory);
router.delete('/:categoryId',authMiddleware, isAdmin, categoriesController.deleteCategory);
router.get('/', categoriesController.getCategory);

module.exports = router;