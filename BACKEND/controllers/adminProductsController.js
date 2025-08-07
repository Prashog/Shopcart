const productModel = require('../models/productModel')

async function createProductController(req, res) {
    try {
            const {name, description, images, categories, brand, price, stock, rating, numReviews} = req.body;
            
            if(!name || !description || !images || !categories || !brand || !price) {
                return res.status(400).json({
                    success: false,
                    error: 'These fields are required'
                })
            }
    
            const product = await productModel.create({name, description, images, categories, brand, price, stock, rating, numReviews});

            res.status(200).json({
                success: true,
                response: product
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            })
        }
};

async function updateProductController(req, res) {
    try {
        const productId = req.params.id;
        const check = await productModel.findById(productId);
        if(!check) {
            return res.status(403).json({
                success: false,
                error: `Product doesn't exist`
            })
        }

        const data = req.body;
        const product = await productModel.findByIdAndUpdate(productId, data, {new: true})

        res.status(200).json({
            success: true,
            response: product
        })
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
};

async function deleteProductController(req, res) {
    try {
        const productId = req.params.id;
        const check = await productModel.findById(productId);
        if(!check) {
            return res.status(403).json({
                success: false,
                error: `Product doesn't exist`
            })
        }

        const product = await productModel.findByIdAndDelete(productId)

        res.status(200).json({
            success: true,
            message: 'Product deleted'
        })
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
};

async function getTopSellingProducts(req, res) {
    try {
        const products = await productModel.find().sort({itemsSold: -1}).limit(10);
        
        res.status(200).json({
            success: true,
            response: products
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server'
        })
    }
}

module.exports = {
    createProductController,
    updateProductController,
    deleteProductController,
    getTopSellingProducts
}