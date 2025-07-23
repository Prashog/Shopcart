const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  address: {
    type: String,
    reuired: true
  },
  landmark: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    default: 'India',
  },
  isDefault: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('Address', addressSchema);