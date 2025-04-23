const express = require('express');
const router = express.Router();
const Auction = require('../models/Auction');

// Get all auctions
router.get('/', async (req, res) => {
  const auctions = await Auction.find();
  res.json(auctions);
});

// Add a new auction
router.post('/', async (req, res) => {
  const newAuction = new Auction(req.body);
  const saved = await newAuction.save();
  res.json(saved);
});

module.exports = router;
