// controllers/studentController.js
const Application = require('../models/Application');
const Scholarship = require('../models/Scholarship');

// Apply for a scholarship
exports.applyForScholarship = async (req, res) => {
  const { scholarshipId, studentName, email, additionalDetails } = req.body;

  try {
    const scholarship = await Scholarship.findById(scholarshipId);

    if (!scholarship || !scholarship.isActive) {
      return res.status(404).json({ msg: 'Scholarship not found or inactive' });
    }

    const newApplication = new Application({
      scholarship: scholarshipId,
      studentName,
      email,
      additionalDetails,
    });

    const application = await newApplication.save();
    res.json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
