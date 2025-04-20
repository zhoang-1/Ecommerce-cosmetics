const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// ✅ Middleware tự động tính subtotal
orderItemSchema.pre('validate', function (next) {
  this.subtotal = (this.price * this.quantity) - this.discount;
  if (this.subtotal < 0) this.subtotal = 0; // đảm bảo không âm
  next();
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
