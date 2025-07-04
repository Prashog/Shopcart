const express = require('express');
const router = express.Router();

const { getAllOrdersController, updateOrderStatusController } = require('../controllers/adminOrderController');
const { jwtAdminMiddleware } = require('../middlewares/adminMiddleware')

router.get('/', jwtAdminMiddleware, getAllOrdersController);
router.put('/:id', jwtAdminMiddleware, updateOrderStatusController);

module.exports = router;