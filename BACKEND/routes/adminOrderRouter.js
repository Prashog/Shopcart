const express = require('express');
const router = express.Router();

const { getAllOrdersController, updateOrderDeliveryStatusController, getRecentOrdersController, getUnDeliveredOrders } = require('../controllers/adminOrderController');
const { jwtAdminMiddleware } = require('../middlewares/adminMiddleware')

router.get('/', jwtAdminMiddleware, getAllOrdersController);
router.put('/delivery-status/:id', jwtAdminMiddleware, updateOrderDeliveryStatusController);
router.get('/recent', jwtAdminMiddleware, getRecentOrdersController);
router.get('/undelivered', jwtAdminMiddleware, getUnDeliveredOrders);

module.exports = router;