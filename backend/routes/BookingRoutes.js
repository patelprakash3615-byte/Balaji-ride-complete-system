const express = require('express');
const Booking = require('../models/Booking');

const router = express.Router();

// Create booking
router.post('/', async (req, res) => {
  try {
    const {
      customerId,
      rideType,
      pickupLocation,
      dropLocation,
      distance,
      estimatedFare
    } = req.body;

    const bookingRef =
      'BR-' + Date.now().toString(36).toUpperCase();

    const booking = new Booking({
      bookingRef,
      customerId,
      rideType,
      pickupLocation,
      dropLocation,
      distance,
      estimatedFare,
    status requested 
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Booking creation failed',
      error: error.message
    });
  }
});

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
});

module.exports = router;
