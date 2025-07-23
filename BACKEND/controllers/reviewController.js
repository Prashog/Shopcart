const Review = require('../models/reviewModel');
const Product = require('../models/productModel');
const reviewModel = require('../models/reviewModel');

async function addReviewController(req, res) {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const review = await Review.create({
      product: productId,
      user: req.user.id,
      name: req.user.name,
      rating,
      comment
    });

    // Recalculate numReviews and rating
    await Product.calculateReviews(productId);

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getReviews(req, res) {
  try {
    const productId = req.params.productId;
    const reviews = await reviewModel.find({product: productId});

    if(!reviews) {
      return res.status(404).json({
        status: false,
        error: 'Reviews not found'
      })
    }

    res.status(200).json({
      success: true,
      response: reviews
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
  addReviewController,
  getReviews
}