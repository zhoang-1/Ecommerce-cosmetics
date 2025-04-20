const mongoose = require('mongoose');

const loginLogSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    ip_address: {
      type: String,
      maxlength: 45,
      default: '',
    },
    user_agent: {
      type: String,
      default: '',
    },
    login_time: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

// Optional: Add index for user lookup
loginLogSchema.index({ user_id: 1 });
loginLogSchema.index({ login_time: -1 });

module.exports = mongoose.model('LoginLog', loginLogSchema);
