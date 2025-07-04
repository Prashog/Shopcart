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

async function updateOrderStatusController(req, res) {
    try {
        const orderId = req.params.id;
        const order = await orderModel.findById(orderId);
        const {isDelivered, orderStatus} = req.body;

        if(!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            })
        }

        if(isDelivered === true) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        }

        if(orderStatus && orderStatus !== 0) {
            order.orderStatus = orderStatus;
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


module.exports = {
    getAllOrdersController,
    updateOrderStatusController
}