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

module.exports = {
    getProducts,
    getProductById
}