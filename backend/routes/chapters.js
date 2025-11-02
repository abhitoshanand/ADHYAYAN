const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Chapter = require('../models/Chapter');

// Get chapters by class ID (public)
router.get('/class/:classId', async (req, res) => {
  try {
    const chapters = await Chapter.find({ classId: req.params.classId }).sort({ order: 1 });
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all chapters (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const chapters = await Chapter.find().populate('classId');
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create chapter (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const newChapter = new Chapter(req.body);
    await newChapter.save();
    res.status(201).json(newChapter);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update chapter (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedChapter = await Chapter.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedChapter);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete chapter (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Chapter.findByIdAndDelete(req.params.id);
    res.json({ message: 'Chapter deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
