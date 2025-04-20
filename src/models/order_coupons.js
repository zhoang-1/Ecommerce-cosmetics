// models/OrderCoupon.js
const mongoose = require('mongoose');

const orderCouponSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  coupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coupon',
    default: null // vì coupon_id có thể NULL (ON DELETE SET NULL)
  },
  discount_amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  original_coupon_code: {
    type: String,
    required: true
  },
  original_discount_value: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  original_discount_type: {
    type: String,
    enum: ['percentage', 'fixed_amount'],
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  indexes: [
    { order: 1, coupon: 1, unique: true },
    { order: 1 },
    { coupon: 1 }
  ]
});

module.exports = mongoose.model('OrderCoupon', orderCouponSchema);
