// models/CartItem.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: false // Có thể không bắt buộc nếu là sản phẩm ảo hoặc free
  },
  variant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductVariant',
    default: null
  },
  session_id: {
    type: String,
    trim: true,
    default: null
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Tạo chỉ mục duy nhất giống MySQL (user, product, variant)
cartItemSchema.index({ user: 1, product: 1, variant: 1 }, { unique: true });
cartItemSchema.index({ session_id: 1 });
cartItemSchema.index({ user: 1 });

module.exports = mongoose.model('CartItem', cartItemSchema);
