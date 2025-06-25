// routes/loginAuth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('📧 Email:', email);
    console.log('🔓 Password (plain):', password);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('🧂 Hashed password:', user.password);

    if (!user.userValidated) {
      return res.status(403).json({ message: 'Please verify your email before logging in' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    console.log('✅ Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;