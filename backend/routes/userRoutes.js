const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update profile
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone, address, profileImage } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address, profileImage, updatedAt: Date.now() },
      { new: true }
    ).select('-password');

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;