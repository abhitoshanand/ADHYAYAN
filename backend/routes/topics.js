const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Topic = require('../models/Topic');

// Get topics by chapter ID (public)
router.get('/chapter/:chapterId', async (req, res) => {
  try {
    const topics = await Topic.find({ chapterId: req.params.chapterId }).sort({ order: 1 });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all topics (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const topics = await Topic.find().populate('chapterId');
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create topic (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const newTopic = new Topic(req.body);
    await newTopic.save();
    res.status(201).json(newTopic);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update topic (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedTopic = await Topic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTopic);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete topic (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Topic.findByIdAndDelete(req.params.id);
    res.json({ message: 'Topic deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
