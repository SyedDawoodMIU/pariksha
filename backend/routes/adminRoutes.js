// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { loginAdmin, addScholarship, deleteScholarship, editScholarship } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Admin login
router.post('/login', loginAdmin);

// Add scholarship
router.post('/scholarships', authMiddleware, addScholarship);

// Delete scholarship
router.delete('/scholarships/:id', authMiddleware, deleteScholarship);

// Edit scholarship
router.put('/scholarships/:id', authMiddleware, editScholarship);

module.exports = router;
