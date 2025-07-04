const express = require('express');
const router = express.Router();

const {
  getProducts,
  getProductById,
  getSuggestions, // 👈 for autocomplete
  searchProductsController // 👈 optional: if you separate full search logic
} = require('../controllers/productsController');

// Define specific routes first
router.get('/suggestions', getSuggestions); // 🔍 autocomplete
router.get('/search', searchProductsController); // optional full search

// General routes
router.get('/', getProducts);
router.get('/:id', getProductById); // MUST be last to avoid catching /search

module.exports = router;