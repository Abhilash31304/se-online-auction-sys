const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  title: String,
  description: String,
  startingPrice: Number,
  currentBid: Number,
  imageUrl: String,
  endTime: Date
});

module.exports = mongoose.model('Auction', auctionSchema);
