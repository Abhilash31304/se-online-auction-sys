const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Electronics', 'Collectibles', 'Furniture', 'Vehicles', 'Art', 'Fashion', 'Books', 'Miscellaneous']
  },
  startingPrice: { type: Number, required: true },
  currentBid: { type: Number, default: function() { return this.startingPrice; } },
  minimumBidIncrement: { type: Number, default: 1 },
  reservePrice: { type: Number }, // Optional minimum price
  images: [{ 
    url: String,
    isPrimary: Boolean
  }],
  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  currentHighestBidder: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['draft', 'pending', 'active', 'completed', 'cancelled'],
    default: 'pending'
  },
  bids: [{
    bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: Number,
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'withdrawn'], default: 'active' }
  }],
  condition: { 
    type: String, 
    enum: ['New', 'Like New', 'Good', 'Fair', 'Poor'],
    required: true
  },
  location: {
    city: String,
    state: String,
    country: String
  },
  shippingOptions: [{
    method: String,
    cost: Number,
    estimatedDays: Number
  }],
  views: { type: Number, default: 0 },
  watchers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isPromoted: { type: Boolean, default: false },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'refunded'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Auction', auctionSchema);
