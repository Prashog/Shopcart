const express = require('express');
const router = express.Router();

const { getDashBoardStatsController } = require('../controllers/adminServicesController');
const { jwtAdminMiddleware } = require('../middlewares/adminMiddleware');

router.get('/stats', jwtAdminMiddleware, getDashBoardStatsController);

module.exports = router;