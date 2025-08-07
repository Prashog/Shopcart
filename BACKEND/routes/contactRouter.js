const express = require('express');
const router = express.Router();

const { sendContactMessageController } = require('../controllers/contactController');

router.post('/', sendContactMessageController);

module.exports = router;