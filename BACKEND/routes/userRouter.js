const express = require('express');
const router = express.Router();

const { getUserProfileController, updateUserProfileController, getOrdersController, getWishListController } = require('../controllers/userController');
const { jwtAuthMiddleware } = require('../middlewares/authMiddleware')

router.get('/me', jwtAuthMiddleware, getUserProfileController);
router.put('/me', jwtAuthMiddleware, updateUserProfileController);
router.get('/orders', jwtAuthMiddleware, getOrdersController)
router.get('/wishlist', jwtAuthMiddleware, getWishListController);

module.exports = router;