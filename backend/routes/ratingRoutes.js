const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const ratingSchema = new mongoose.Schema({
  bookingId: mongoose.Schema.Types.ObjectId,
  from: mongoose.Schema.Types.ObjectId,
  to: mongoose.Schema.Types.ObjectId,
  rating: { type: Number, min: 1, max: 5 },
  review: String,
  createdAt: { type: Date, default: Date.now }
});

const Rating = mongoose.model('Rating', ratingSchema);

// Create rating
router.post('/', async (req, res) => {
  try {
    const { bookingId, from, to, rating, review } = req.body;
    const newRating = new Rating({ bookingId, from, to, rating, review });
    await newRating.save();
    res.status(201).json({ success: true, rating: newRating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get ratings for user
router.get('/user/:userId', async (req, res) => {
  try {
    const ratings = await Rating.find({ to: req.params.userId });
    const avgRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length || 0;
    res.json({ success: true, ratings, avgRating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;