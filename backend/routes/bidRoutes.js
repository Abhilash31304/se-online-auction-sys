const express = require('express');
const router = express.Router();
const databaseService = require('../services/databaseService');

// Place a bid
router.post('/', async (req, res) => {
  try {
    const bidData = {
      auction: req.body.auctionId,
      bidder: req.body.userId,
      amount: req.body.amount,
      status: 'active'
    };
    const savedBid = await databaseService.createBid(bidData);
    res.json(savedBid);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get bids for an auction
router.get('/auction/:auctionId', async (req, res) => {
  try {
    const bids = await databaseService.getBidsByAuction(req.params.auctionId);
    res.json(bids);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
