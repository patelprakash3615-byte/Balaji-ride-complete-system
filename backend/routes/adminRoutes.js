const express = require('express');
const User = require('../models/User');
const Booking = require('../models/Booking');

const router = express.Router();

// Dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDrivers = await User.countDocuments({ role: 'driver' });
    const totalBookings = await Booking.countDocuments();
    const completedBookings = await Booking.countDocuments({ status: 'completed' });

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalDrivers,
        totalBookings,
        completedBookings,
        earnings: 0 // Calculate from payments
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users (admin)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all bookings (admin)
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('customerId')
      .populate('driverId')
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Disable user
router.put('/users/:id/disable', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'User disabled' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;