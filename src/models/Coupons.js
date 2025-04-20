const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    discount_type: {
      type: String,
      enum: ['percentage', 'fixed_amount'],
      required: true,
    },
    discount_value: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
      min: 0.01,
    },
    min_order_amount: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0,
    },
    max_discount_amount: {
      type: mongoose.Schema.Types.Decimal128,
    },
    start_date: {
      type: Date,
      required: true,
    },
    expiry_date: {
      type: Date,
      required: true,
    },
    max_uses: {
      type: Number,
    },
    uses_count: {
      type: Number,
      default: 0,
    },
    user_uses_limit: {
      type: Number,
      default: 1,
    },
    active: {
      type: Boolean,
      default: true,
    },
    applies_to: {
      type: String,
      enum: ['all', 'specific_categories', 'specific_products'],
      default: 'all',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
couponSchema.index({ code: 1 });
couponSchema.index({ active: 1, expiry_date: 1 });

module.exports = mongoose.model('Coupon', couponSchema);
