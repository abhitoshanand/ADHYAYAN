const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Question = require('../models/Question');

// Get questions by topic ID (public)
router.get('/topic/:topicId', async (req, res) => {
  try {
    const questions = await Question.find({ topicId: req.params.topicId });
    // Don't send the correct answer info to students
    const sanitizedQuestions = questions.map(q => ({
      _id: q._id,
      questionText: q.questionText,
      options: q.options.map(o => ({ text: o.text, _id: o._id })),
      explanation: q.explanation
    }));
    res.json(sanitizedQuestions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Check answer (public)
router.post('/check-answer', async (req, res) => {
  try {
    const { questionId, optionId } = req.body;
    const question = await Question.findById(questionId);
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const selectedOption = question.options.id(optionId);
    const correctOption = question.options.find(o => o.isCorrect);

    res.json({
      isCorrect: selectedOption.isCorrect,
      correctOptionId: correctOption._id,
      explanation: question.explanation
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all questions (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const questions = await Question.find().populate('topicId');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create question (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update question (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete question (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
