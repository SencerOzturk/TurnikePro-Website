const mongoose = require('mongoose');

const referenceSchema = new mongoose.Schema({
  name: {
    tr: { type: String, required: true },
    en: { type: String, required: true }
  },
  description: {
    tr: { type: String, required: true },
    en: { type: String, required: true }
  },
  imageUrl: { type: String, required: true },
  location: {
    tr: { type: String },
    en: { type: String }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reference', referenceSchema);

