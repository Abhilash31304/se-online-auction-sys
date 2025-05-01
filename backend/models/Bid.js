const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  auction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auction',
    required: true
  },
  bidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'withdrawn', 'won', 'lost'],
    default: 'active'
  },
  autoBidEnabled: {
    type: Boolean,
    default: false
  },
  maxAutoBidAmount: {
    type: Number
  },
  bidTime: {
    type: Date,
    default: Date.now
  },
  ipAddress: String,
  deviceInfo: String
}, {
  timestamps: true
});

// Create index for quick lookups
bidSchema.index({ auction: 1, bidder: 1, status: 1 });

module.exports = mongoose.model('Bid', bidSchema);
