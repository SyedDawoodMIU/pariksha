// models/Scholarship.js
const mongoose = require('mongoose');

const ScholarshipSchema = new mongoose.Schema({
  universityName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  deadline: {
    type: Date,
    required: true,
  },
  minimumRequirements: {
    type: [String],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Scholarship', ScholarshipSchema);
