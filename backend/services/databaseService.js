const User = require('../models/User');
const Auction = require('../models/Auction');
const Bid = require('../models/Bid');

const databaseService = {
  // User operations
  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  },

  async findUserByEmail(email) {
    return await User.findOne({ email });
  },

  // Auction operations
  async createAuction(auctionData) {
    const auction = new Auction(auctionData);
    return await auction.save();
  },

  async getAllAuctions() {
    return await Auction.find().populate('seller', 'username email');
  },

  async getAuctionsByUser(userId) {
    return await Auction.find({ seller: userId });
  },

  // Bid operations
  async createBid(bidData) {
    const bid = new Bid(bidData);
    const savedBid = await bid.save();
    
    // Update auction's current bid
    await Auction.findByIdAndUpdate(bidData.auction, {
      currentBid: bidData.amount,
      currentHighestBidder: bidData.bidder
    });
    
    return savedBid;
  },

  async getBidsByAuction(auctionId) {
    return await Bid.find({ auction: auctionId })
      .populate('bidder', 'username')
      .sort({ amount: -1 });
  }
};

module.exports = databaseService;
