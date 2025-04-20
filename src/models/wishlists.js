const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    timestamps: true, // tạo createdAt, updatedAt
  }
);

// Ngăn trùng lặp (1 user không thể wishlist cùng 1 sản phẩm nhiều lần)
wishlistItemSchema.index({ user: 1, product: 1 }, { unique: true });

// Index hỗ trợ truy vấn
wishlistItemSchema.index({ user: 1 });
wishlistItemSchema.index({ product: 1 });

module.exports = mongoose.model('WishlistItem', wishlistItemSchema);
