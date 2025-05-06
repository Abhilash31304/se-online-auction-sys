const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
require('dotenv').config();

const app = express();

// Security middlewares
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token']
}));

// CSRF token endpoint
app.get('/api/csrf-token', (req, res) => {
  const token = crypto.randomBytes(32).toString('hex');
  res.json({ csrfToken: token });
});

// Update CSRF middleware
app.use((req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const token = req.headers['x-csrf-token'];
    if (!token) {
      return res.status(403).json({ message: 'CSRF token missing' });
    }
    // Store valid tokens or validate against session - for now just check if exists
    if (token) {
      return next();
    }
  }
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

// Test Route
app.get('/', (req, res) => {
  res.send("Backend is working!");
});

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Routes
const auctionRoutes = require('./routes/auctionRoutes');
const bidRoutes = require('./routes/bidRoutes');
const authRoutes = require('./routes/authRoutes'); // Add this

app.use('/api/auth', authRoutes); // Add this
app.use('/api/auctions', auctionRoutes);
app.use('/api/bids', bidRoutes);

// Error Handler (must be after routes)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Add error logging
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
