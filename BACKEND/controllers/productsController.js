const productModel = require('../models/productModel')

// async function getProducts(req, res) {
//     try {
//         const products = await productModel.find();

//         if(products)

//         res.status(200).json({
//             success: true,
//             response: products
//         })
//     } catch (err) {
//         console.groupCollapsed(err);
//         res.status(500).json({
//             success: false,
//             error: 'Internal Server Error'
//         })
//     }
// }

async function getProducts(req, res) {
  try {
    const { category, query } = req.query;
    let filter = {};

    // If a category filter is provided
    if (category) {
      filter.categories = category; // category is category._id
    }

    // If a search query is provided
    if (query) {
      const regex = new RegExp(query, 'i'); // case-insensitive regex
      filter.$or = [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
      ];
    }

    const products = await productModel.find(filter).populate('categories');

    res.status(200).json({
      success: true,
      response: products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
}



async function getProductById(req, res) {
    try {
        const productId = req.params.id;

        const product = await productModel.findById(productId);

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

async function getSuggestions(req, res) {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Query parameter 'q' is required",
      });
    }

    const regex = new RegExp(q, 'i');
    const suggestions = await productModel
      .find({ name: { $regex: regex } })
      .limit(10)
      .select('name');

    res.status(200).json({
      success: true,
      response: suggestions.map(item => item.name),
    });
  } catch (err) {
    console.error('Error in getSuggestions:', err);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
}

async function searchProductsController(req, res) {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ success: false, error: 'Missing search query' });
    }

    const regex = new RegExp(query, 'i');

    const results = await productModel.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    }).populate('categories');

    res.status(200).json({ success: true, products: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}


module.exports = {
    getProducts,
    getProductById,
    getSuggestions,
    searchProductsController
}