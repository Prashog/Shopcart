const User = require('../models/userModel');

async function addToWishlistController(req, res) {
  const { productId } = req.body;
  const user = await User.findById(req.user._id);

  if (user.wishlist.includes(productId)) {
    return res.status(400).json({ message: 'Product already in wishlist' });
  }

  user.wishlist.push(productId);
  await user.save();

  res.status(200).json({ message: 'Added to wishlist' });
};

async function removeFromWishlistController (req, res) {
  const { productId } = req.params;
  const user = await User.findById(req.user._id);

  user.wishlist = user.wishlist.filter(p => p.toString() !== productId);
  await user.save();

  res.status(200).json({ message: 'Removed from wishlist' });
};

async function getWishlistController (req, res) {
  const user = await User.findById(req.user._id).populate('wishlist');
  res.json(user.wishlist);
};

module.exports = {
  addToWishlistController,
  removeFromWishlistController,
  getWishlistController
}