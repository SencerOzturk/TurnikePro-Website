const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    tr: { type: String, required: true },
    en: { type: String, required: true }
  },
  description: {
    tr: { type: String, required: true },
    en: { type: String, required: true }
  },
  technicalSpecs: {
    tr: { type: String },
    en: { type: String }
  },
  imageUrl: { type: String, required: true },
  category: {
    tr: { type: String, required: true },
    en: { type: String, required: true }
  },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);

