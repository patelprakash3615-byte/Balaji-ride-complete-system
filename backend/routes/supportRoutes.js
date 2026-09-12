const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const supportSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  subject: String,
  message: String,
  status: { type: String, enum: ['open', 'in_progress', 'resolved'], default: 'open' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Support = mongoose.model('Support', supportSchema);

// Create support ticket
router.post('/', async (req, res) => {
  try {
    const { userId, subject, message } = req.body;
    const ticket = new Support({ userId, subject, message });
    await ticket.save();
    res.status(201).json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Support.find().sort({ createdAt: -1 });
    res.json({ success: true, tickets });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update ticket status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await Support.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    res.json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;