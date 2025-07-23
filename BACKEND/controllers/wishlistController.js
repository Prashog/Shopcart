const userModel = require('../models/userModel');

async function addToWishlistController(req, res) {
  try {
    const productId = req.params.id;
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    user.wishlist.push(productId);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Added to wishlist'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
};

async function removeFromWishlistController (req, res) {
  try {
    const productId = req.params.productId;
    const user = await userModel.findById(req.user.id);
    
    user.wishlist = user.wishlist.filter(p => p.toString() !== productId);
    await user.save();
    
    res.status(200).json({ message: 'Removed from wishlist' });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    })
  }
};

async function getWishlistController (req, res) {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId).populate('wishlist');

    res.status(200).json({
      success: true,
      response: user.wishlist
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    })
  }
};

module.exports = {
  addToWishlistController,
  removeFromWishlistController,
  getWishlistController
}