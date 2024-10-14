// controllers/scholarshipController.js
const Scholarship = require('../models/Scholarship');

// Get all scholarships
exports.getScholarships = async (req, res) => {
    try {
      const scholarships = await Scholarship.find({});
      res.json(scholarships);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching scholarships' });
    }
  };

// Get scholarship by ID
exports.getScholarshipById = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);

    if (!scholarship || !scholarship.isActive) {
      return res.status(404).json({ msg: 'Scholarship not found' });
    }

    res.json(scholarship);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add Scholarship Function
exports.addScholarship = async (req, res) => {
    try {
      const { universityName, title, description, deadline, minimumRequirements } = req.body;
  
      const newScholarship = new Scholarship({
        universityName,
        title,
        description,
        deadline,
        minimumRequirements,
      });
  
      const savedScholarship = await newScholarship.save();
      res.status(201).json(savedScholarship);
    } catch (error) {
      res.status(500).json({ message: 'Error adding scholarship', error: error.message });
    }
  };