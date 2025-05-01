const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['buyer', 'seller', 'admin'], default: 'buyer' },
  profilePhoto: String,
  phoneNumber: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  biddingHistory: [{
    auctionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auction' },
    amount: Number,
    timestamp: { type: Date, default: Date.now }
  }],
  wonAuctions: [{
    auctionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auction' },
    finalPrice: Number,
    completedAt: Date
  }],
  paymentMethods: [{
    type: { type: String, enum: ['credit', 'debit', 'paypal'] },
    lastFourDigits: String,
    isDefault: Boolean
  }],
  ratings: {
    asSeller: { type: Number, default: 0 },
    asBuyer: { type: Number, default: 0 }
  },
  isVerified: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'suspended', 'deactivated'], default: 'active' }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
