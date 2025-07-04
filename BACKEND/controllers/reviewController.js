const Product = require('../models/productModel');

async function addReviewController(req, res) {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = (
      product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.numReviews
    ).toFixed(1);

    await product.save();

    res.status(201).json({ message: 'Review added', review });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  addReviewController
}