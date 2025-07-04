const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware } = require('../middlewares/authMiddleware');
const {
  addToWishlistController,
  removeFromWishlistController,
  getWishlistController
} = require('../controllers/wishlistController');

router.post('/', jwtAuthMiddleware, addToWishlistController);
router.get('/', jwtAuthMiddleware, getWishlistController);
router.delete('/:productId', jwtAuthMiddleware, removeFromWishlistController);

module.exports = router;