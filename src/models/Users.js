const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
  street: { type: String, default: '' },
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  zip: { type: String, default: '' },
  country: { type: String, default: '' },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      default: '',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      default: '',
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: '',
    },
    address: {
      type: addressSchema,
      default: {},
    },
    signup_date: {
      type: Date,
      default: Date.now,
    },
    avatar: {
      type: String,
      default: '',
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['admin', 'customer', 'staff'],
      default: 'customer',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);