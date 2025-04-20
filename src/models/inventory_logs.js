// models/InventoryLog.js
const mongoose = require('mongoose');

const inventoryLogSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  variant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductVariant',
    default: null
  },
  change_type: {
    type: String,
    enum: ['import', 'export', 'return', 'adjust', 'damage', 'transfer'],
    required: true
  },
  quantity_change: {
    type: Number,
    required: true
  },
  remaining_quantity: {
    type: Number,
    required: true
  },
  reference_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  reference_type: {
    type: String,
    default: null
  },
  staff_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    default: null
  },
  note: {
    type: String,
    default: null
  },
  cost_price: {
    type: mongoose.Schema.Types.Decimal128,
    default: null
  },
  reason_code: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Index tương ứng với bảng MySQL
inventoryLogSchema.index({ product: 1 });
inventoryLogSchema.index({ variant: 1 });
inventoryLogSchema.index({ created_at: 1 });
inventoryLogSchema.index({ reference_type: 1, reference_id: 1 });

module.exports = mongoose.model('InventoryLog', inventoryLogSchema);
