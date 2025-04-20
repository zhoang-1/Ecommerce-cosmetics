// models/ProductVariant.js
const mongoose = require('mongoose');

const productVariantSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  sku: {
    type: String,
    unique: true,
    trim: true
  },
  option_name: {
    type: String,
    trim: true
  },
  option_value: {
    type: String,
    trim: true
  },
  price_diff: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0.00
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ProductVariant', productVariantSchema);
