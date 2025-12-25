const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const contactMessage = new ContactMessage({
      name,
      email,
      message
    });

    await contactMessage.save();
    res.status(201).json({ message: 'Contact message sent successfully', data: contactMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all messages (for admin - optional)
router.get('/', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

