const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    payment_method: {
      type: String,
      enum: ['cod', 'credit_card', 'paypal', 'bank_transfer', 'ewallet'],
      required: true,
    },
    payment_status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded', 'partially_refunded'],
      default: 'pending',
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    transaction_id: {
      type: String,
      default: '',
    },
    currency: {
      type: String,
      default: 'USD',
    },
    payment_date: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // tự động thêm createdAt và updatedAt
  }
);

module.exports = mongoose.model('Payment', paymentSchema);
