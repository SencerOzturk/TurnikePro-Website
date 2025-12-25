const express = require('express');
const router = express.Router();
const Reference = require('../models/Reference');

// Get all references
router.get('/', async (req, res) => {
  try {
    const references = await Reference.find().sort({ createdAt: -1 });
    res.json(references);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single reference
router.get('/:id', async (req, res) => {
  try {
    const reference = await Reference.findById(req.params.id);
    if (!reference) {
      return res.status(404).json({ message: 'Reference not found' });
    }
    res.json(reference);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

