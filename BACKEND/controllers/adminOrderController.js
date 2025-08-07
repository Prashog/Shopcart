const orderModel = require('../models/orderModel')

async function getAllOrdersController(req, res) {
    try {
        const orders = await orderModel.find();

        if(!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Orders not found'
            })
        }

        res.status(200).json({
            success: true,
            orders
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
};

async function updateOrderDeliveryStatusController(req, res) {
    try {
        const orderId = req.params.id;
        const order = await orderModel.findById(orderId);

        if(!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            })
        }

        if(order.isDelivered === false) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            order.orderStatus = 'Delivered';
        }

        await order.save();

        res.status(200).json({
            success: true,
            message: 'Order Status Updated Successfully'
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
};

async function getRecentOrdersController(req, res) {
    try {
        const now = new Date;
        const dateTenDayAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate()-10);

        const orders = await orderModel.find({
            createdAt: {
                $gte: dateTenDayAgo
            }
        });

        res.status(200).json({
            success: false,
            response: orders
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        })
    }
}

async function getUnDeliveredOrders(req, res) {
    try {
        const orders = await orderModel.find({isDelivered: false})

        res.status(200).json({
            success: true,
            response: orders
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        })
    }
}

module.exports = {
    getAllOrdersController,
    updateOrderDeliveryStatusController,
    getRecentOrdersController,
    getUnDeliveredOrders
}