// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const { sendContactMessageController } = require('../controllers/contactController');

router.post('/contact', sendContactMessageController);

module.exports = router;
