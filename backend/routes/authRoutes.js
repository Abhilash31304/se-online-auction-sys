const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Test credentials check
  if (email === 'test@gmail.com' && password === 'Test1234') {
    const token = jwt.sign(
      { email: email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    return res.json({
      success: true,
      token,
      user: { email }
    });
  }
  
  res.status(401).json({ 
    success: false, 
    message: 'Invalid credentials' 
  });
});

module.exports = router;
