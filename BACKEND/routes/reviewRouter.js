const express = require('express');
const router = express.Router();
const { addReviewController } = require('../controllers/reviewController');
const { jwtAuthMiddleware } = require('../middlewares/authMiddleware');

// Add a review to a product
router.post('/:productId', jwtAuthMiddleware, addReviewController);

module.exports = router;