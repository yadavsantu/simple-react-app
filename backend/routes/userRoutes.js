// backend/routes/authRoutes.js or wherever your route file is
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword
    } = req.body;

    // ✅ Step 1: Basic validation
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // ✅ Step 2: Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // ✅ Step 3: Create and save user (password will be hashed automatically in model)
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password // only include password; confirmPassword is for frontend validation only
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;