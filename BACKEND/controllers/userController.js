const userModel = require('../models/userModel')
const orderModel = require('../models/orderModel')

async function getUserProfileController(req, res) {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId).select("-password");

        if(!user) {
            return res.status(404),json({
                success: false,
                error: 'User not found'
            })
        }

        res.status(200).json({
            success: true,
            response: user
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        })
    }
};

async function updateUserProfileController(req, res) {
    try {
        const userId = req.user.id;
        const data = req.body;
        
        await userModel.findByIdAndUpdate(userId, data, {new: true});

        res.status(200).json({
            success: true,
            message: 'Profile updated'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        })
    }
};

async function getOrdersController(req, res) {
    try {
        const userId = req.user.id;

        const orders = await orderModel.find({user: userId}).populate('orderItems.product')

        if(!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No orders found for the user'
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

async function getWishListController(req, res) {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId).populate('wishlist');

        if(!user || !user.wishlist || user.wishlist.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No items in the wishlist'
            })
        }

        res.status(200).json({
            success: true,
            wishlist: user.wishlist
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
    getUserProfileController,
    updateUserProfileController,
    getOrdersController,
    getWishListController
}