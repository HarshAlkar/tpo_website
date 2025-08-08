const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const { sendEmail } = require('../utils/emailService');

// POST - Create new registration
router.post('/', async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    const registration = new Registration(req.body);
    await registration.save();
    console.log('Registration saved successfully:', registration._id);
    
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
    
    // Provide more specific error messages
    let errorMessage = 'Registration failed';
    if (error.name === 'ValidationError') {
      errorMessage = 'Please check your input data and try again';
    } else if (error.code === 11000) {
      errorMessage = 'A registration with this email or roll number already exists';
    } else if (error.name === 'MongooseServerSelectionError') {
      errorMessage = 'Database connection error. Please try again later';
    }
    
    res.status(400).json({ 
      success: false, 
      message: errorMessage,
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