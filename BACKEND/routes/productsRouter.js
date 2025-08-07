const express = require('express');
const router = express.Router();

const { getProducts, getProductById, getBestSellingProducts, dealOfTheDay, newArrival, discountedProduct, comingSoon } = require('../controllers/productsController');

router.get('/', getProducts);
router.get('/bestsellers', getBestSellingProducts);
router.get('/deal-of-day', dealOfTheDay);
router.get('/new-arrival', newArrival);
router.get('/discounted', discountedProduct);
router.get('/coming-soon', comingSoon);
router.get('/:id', getProductById);

module.exports = router;