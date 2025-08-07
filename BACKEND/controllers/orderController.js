const mongoose = require('mongoose')
const orderModel = require('../models/orderModel')
const productModel = require('../models/productModel')
const userModel = require('../models/userModel')

async function getAllOrders(req, res) {
    try {
        const userId = req.user.id;

        const orders = await orderModel.find({user: userId}).populate('orderItems.product').sort({ createdAt: -1 }) // this sort will put the latest first

        res.status(200).json({
            success: true,
            response: orders
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        })
    }
}

async function createOrderController(req, res) {
    try {
        const userId = req.user.id

        const {orderItems, shippingAddress, paymentMethod } = req.body
        let itemsPrice = 0;

        if(!orderItems || orderItems.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No Order Items'
            })
        }

        for(const item of orderItems) {
            const product = await productModel.findById(item.product);

            if(!product) {
                return res.status(404).json({
                    success: false,
                    error: 'Product not found'
                })
            }
            if(product.stock < item.quantity) {
                return res.status(404).json({
                    success: false,
                    error: 'Item is not in stock'
                })
            }

            itemsPrice += product.price * item.quantity;
            product.stock -= item.quantity;
            product.itemsSold += item.quantity;
            await product.save();
        }

        
        const shippingPrice = 40;
        const taxPrice = (2/100)*itemsPrice;
        const totalPrice = itemsPrice + taxPrice + shippingPrice;

        let isPaid = true;
        if(paymentMethod === 'COD') {
            isPaid = false;
        }

        const newOrder = await orderModel.create({
            user: userId,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            isPaid
        })

        res.status(200).json({
            success: true,
            response: newOrder,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server error'
        })
    }
};

async function getOrderController(req, res) {
    try {
      const orderId = req.params.id;

      const order = await orderModel.findById(orderId)
        .populate('user', 'name email')
        .populate('orderItems.product', 'name price');

      if (!order) {
        return res.status(404).json({ success: false, error: 'Order not found' });
      }

      res.status(200).json({ success: true, data: order });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

async function markOrderPaidController(req, res) {
    try {
        const orderId = req.params.id;
        const response = await orderModel.findByIdAndUpdate(orderId ,{isPaid: true}, {new :true})

        if(!response) {
            return res.status(400).json({
                success: false,
                error: 'Unable to process your request'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Order marked: PAID'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
};

async function addToWishlistController(req, res) {
    try {
        const userId = req.user.id;
        const { wishlist: productId } = req.body;

        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found',
            });
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {$addToSet: {wishlist: productId}},
            {new: true}
        ).populate('wishlist')

        if(!updatedUser) {
            return res.status(400).json({
                success: false,
                error: 'Failed to update wishlist'
            })
        }

        res.status(200).json({
            success: true,
            wishlist: updatedUser.wishlist
        })
    } catch (error) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
};

module.exports = {
    getAllOrders,
    createOrderController,
    getOrderController,
    markOrderPaidController,
    addToWishlistController
}