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

module.exports = mongoose.model('Product', productSchema);