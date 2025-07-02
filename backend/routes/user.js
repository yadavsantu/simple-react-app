const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET user name by email
router.get('/name/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select('firstName lastName');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName
    });
  } catch (error) {
    console.error('Error fetching user name:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;