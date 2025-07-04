const express = require('express');
const router = express.Router();

const { registerController, loginController, forgotPasswordController, changePasswordController, verifyOtpController, resetPasswordViaOtpController } = require('../controllers/authController');
const { jwtAuthMiddleware } = require('../middlewares/authMiddleware')

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/forgot-password', forgotPasswordController)
router.put('/change-password', jwtAuthMiddleware, changePasswordController);
router.post('/verify-otp', verifyOtpController);
router.post('/reset-password', resetPasswordViaOtpController);

module.exports = router;