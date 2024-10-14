// routes/scholarshipRoutes.js
const express = require('express');
const router = express.Router();
const { getScholarships, getScholarshipById, addScholarship } = require('../controllers/scholarshipController');

// Get all scholarships
router.get('/', getScholarships);

// Get scholarship by ID
router.get('/:id', getScholarshipById);
router.post('/', addScholarship);
module.exports = router;
