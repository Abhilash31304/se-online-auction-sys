const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const databaseService = require('../services/databaseService');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: 'uploads/auctions/',
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: function(req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
});

// Get all auctions
router.get('/', async (req, res) => {
  try {
    const auctions = await databaseService.getAllAuctions();
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new auction with image support
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const imageUrls = req.files ? req.files.map((file, index) => ({
      url: `/uploads/auctions/${file.filename}`,
      isPrimary: index === 0
    })) : [];

    const auctionData = {
      ...req.body,
      images: imageUrls,
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
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
