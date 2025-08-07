const productModel = require('../models/productModel')

async function getProducts(req, res) {
  try {
    const { category } = req.query;
    let query = {};

    if (category) {
      query.categories = category; // category is category._id
    }

    const products = await productModel.find(query).populate('categories');

    res.status(200).json({
      success: true,
      response: products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
}

async function getProductById(req, res) {
    try {
        const productId = req.params.id;

        const product = await productModel.findById(productId).populate('categories','_id name');

        if(!product) {
            return res.status(404).json({
                success: false,
                error: 'Product Not Found'
            })
        }

        res.status(200).json({
            success: true,
            response: product
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        })
    }
}

async function getBestSellingProducts(req, res) {
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

async function dealOfTheDay(req, res) {
    try {
        const products = await productModel.find({stock: {$gt: 0}}).sort({itemsSold: 1}).limit(6);

        res.status(200).json({
            success: true,
            response: products
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: true,
            error: 'Internal Server Error'
        })
    }
}

async function newArrival(req, res) {
    try {
        const products = await productModel.find().sort({createdAt: -1}).limit(4);

        res.status(200).json({
            success: true,
            response: products
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        })
    }
}

async function discountedProduct(req, res) {
    try {
        const products = await productModel.find({stock: {$gt: 0}}).sort({itemsSold: 1}).limit(6);

        res.status(200).json({
            success: true,
            response: products
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        })
    }
}

async function comingSoon(req, res) {
    try {
        const products = await productModel.find().sort({createdAt: -1}).limit(4);

        res.status(200).json({
            success: true,
            response: products
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
    getProducts,
    getProductById,
    getBestSellingProducts,
    dealOfTheDay,
    newArrival,
    discountedProduct,
    comingSoon
}