// controllers/adminController.js
const Admin = require('../models/Admin');
const Scholarship = require('../models/Scholarship');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Admin login
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    let admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = password == admin.password;

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      admin: {
        id: admin.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add scholarship
exports.addScholarship = async (req, res) => {
  const { universityName, scholarshipTitle, description, applicationDeadline, minimumRequirements } = req.body;

  try {
    const newScholarship = new Scholarship({
      universityName,
      scholarshipTitle,
      description,
      applicationDeadline,
      minimumRequirements,
    });

    const scholarship = await newScholarship.save();
    res.json(scholarship);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete scholarship
exports.deleteScholarship = async (req, res) => {
  try {
    await Scholarship.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ msg: 'Scholarship deactivated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Edit scholarship
exports.editScholarship = async (req, res) => {
  const updates = req.body;

  try {
    const scholarship = await Scholarship.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(scholarship);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
