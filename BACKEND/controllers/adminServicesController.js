const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');

async function getDashBoardStatsController(req, res) {
    try {
        const countUsers = await userModel.countDocuments();
        const countOrders = await orderModel.countDocuments();

        // calculating revenue
        const now = new Date();

        const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth()-1, 1);
        const firstDayNextMonth = new Date(now.getFullYear(), now.getMonth()+1, 1);

        const sumThisMonth = await orderModel.aggregate([
            {
                $match: {
                    isPaid: true,
                    createdAt: {
                        $gte: firstDayThisMonth,
                        $lt: firstDayNextMonth
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$itemsPrice"
                    },
                },
            },
        ]);

        const sumLastMonth = await orderModel.aggregate([
            {
                $match: {
                    isPaid: true,
                    createdAt: {
                        $gte: firstDayLastMonth,
                        $lt: firstDayThisMonth
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$itemsPrice"
                    },
                },
            },
        ]);

        const revenueThisMonth = sumThisMonth[0]?.total || 0;
        const revenueLastMonth = sumLastMonth[0]?.total || 0;

        const lowStocks = await productModel.find({stock: {$lte: 10}});

        res.status(200).json({
            success: true,
            response: {
                users: countUsers,
                orders: countOrders,
                revenueThisMonth: revenueThisMonth,
                revenueLastMonth: revenueLastMonth,
                lowStocks: lowStocks
            }
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
    getDashBoardStatsController
}