const express = require('express');
const router = express.Router();
const databaseService = require('../services/databaseService');

// Get all auctions
router.get('/', async (req, res) => {
  try {
    const auctions = await databaseService.getAllAuctions();
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new auction
router.post('/', async (req, res) => {
  try {
    const auctionData = {
      ...req.body,
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      status: 'active',
      condition: req.body.condition || 'New'
    };
    const savedAuction = await databaseService.createAuction(auctionData);
    res.json(savedAuction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's auctions
router.get('/user/:userId', async (req, res) => {
  try {
    const auctions = await databaseService.getAuctionsByUser(req.params.userId);
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
