const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get all drivers
router.get('/', async (req, res) => {
  try {
    const drivers = await User.find({ role: 'driver' }).select('-password');
    res.json({ success: true, drivers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get driver profile
router.get('/:id', async (req, res) => {
  try {
    const driver = await User.findById(req.params.id).select('-password');
    if (driver.role !== 'driver') {
      return res.status(400).json({ error: 'Not a driver' });
    }
    res.json({ success: true, driver });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update driver status
router.put('/:id/status', async (req, res) => {
  try {
    const { isActive } = req.body;
    const driver = await User.findByIdAndUpdate(
      req.params.id,
      { isActive, updatedAt: Date.now() },
      { new: true }
    ).select('-password');

    res.json({ success: true, driver });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;