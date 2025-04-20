const mongoose = require('mongoose');

const shippingLogSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    shipping_provider: {
      type: String,
      default: '',
    },
    tracking_number: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: [
        'processing',
        'packed',
        'handed_to_carrier',
        'in_transit',
        'at_distribution',
        'out_for_delivery',
        'delivered',
        'returned',
        'failed',
      ],
      required: true,
    },
    estimated_delivery: {
      type: Date,
      default: null,
    },
    actual_delivery: {
      type: Date,
      default: null,
    },
    shipping_fee: {
      type: Number,
      default: 0,
    },
    staff_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
      default: null,
    },
    location: {
      type: String,
      default: '',
    },
    note: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

// Indexes tương đương
shippingLogSchema.index({ order_id: 1 });
shippingLogSchema.index({ tracking_number: 1 });
shippingLogSchema.index({ status: 1 });
shippingLogSchema.index({ estimated_delivery: 1, actual_delivery: 1 });

module.exports = mongoose.model('ShippingLog', shippingLogSchema);
