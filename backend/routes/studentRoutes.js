// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const { applyForScholarship } = require('../controllers/studentController');

// Apply for a scholarship
router.post('/apply', applyForScholarship);

module.exports = router;
