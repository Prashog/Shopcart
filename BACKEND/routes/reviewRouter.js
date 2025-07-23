const express = require('express');
const router = express.Router();
const { addReviewController, getReviews } = require('../controllers/reviewController');
const { jwtAuthMiddleware } = require('../middlewares/authMiddleware');

router.post('/:productId', jwtAuthMiddleware, addReviewController);
router.get('/:productId', getReviews);

module.exports = router;