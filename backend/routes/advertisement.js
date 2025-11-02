const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Advertisement = require('../models/Advertisement');

// Get active advertisement (public)
router.get('/active', async (req, res) => {
  try {
    const ad = await Advertisement.findOne({ isActive: true });
    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all advertisements (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const ads = await Advertisement.find();
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create advertisement (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const newAd = new Advertisement(req.body);
    await newAd.save();
    res.status(201).json(newAd);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update advertisement (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedAd = await Advertisement.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    res.json(updatedAd);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete advertisement (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Advertisement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Advertisement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
