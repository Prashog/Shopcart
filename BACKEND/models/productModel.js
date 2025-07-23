const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },
    description: { 
        type: String, 
        required: true 
    },
    images: [{ 
        type: String, 
        default: " "
    }],
    /*category: [{
        type: String,
        enum: ["Electronics", "Men Clothing","Women Clothing","Home & Living","Health & Beauty","Sports & Outdoors", "Toys & Games","Automotive","Books & Media","Groceries & Essentials","Office & Stationery","Pets", "Daily Needs"],
        default: "Daily Needs"
    }],*/
    categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }],
    brand: {
        type: String,
        required: true
    },
    price: { 
        type: Number, 
        required: true
    },
    stock: {
        type: Number, 
        default: 0
    },
    rating: {
        type: Number,
        default: 0 
    },
    numReviews: {
        type: Number,
        default: 0 
    },
  },
  { timestamps: true }
);

productSchema.statics.calculateReviews = async function(productId) {
  const Review = mongoose.model('Review');

  const reviews = await Review.find({ product: productId });

  const numReviews = reviews.length;
  const avgRating = numReviews === 0 ? 0 : (
    reviews.reduce((acc, r) => acc + r.rating, 0) / numReviews
  ).toFixed(1);

  // Update product
  await this.findByIdAndUpdate(productId, {
    numReviews,
    rating: avgRating
  });
};

module.exports = mongoose.model('Product', productSchema);