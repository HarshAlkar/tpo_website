const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const { sendEmail } = require('../utils/emailService');

// POST - Create new registration
router.post('/', async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    
    // Send email notification
    const emailResult = await sendEmail(
      'harshalkar0504@gmail.com', // Admin email
      'registration',
      req.body
    );
    
    // Send confirmation email to student
    const studentEmailResult = await sendEmail(
      req.body.email,
      'registrationThankYou',
      req.body
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Registration submitted successfully',
      data: registration,
      emailSent: emailResult.success,
      studentEmailSent: studentEmailResult.success
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ 
      success: false, 
      message: 'Registration failed',
      error: error.message 
    });
  }
});

// GET - Retrieve all registrations (for admin)
router.get('/', async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json({ 
      success: true, 
      data: registrations 
    });
  } catch (error) {
    console.error('Fetch registrations error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch registrations',
      error: error.message 
    });
  }
});

module.exports = router; 