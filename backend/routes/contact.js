const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { sendEmail } = require('../utils/emailService');

// POST - Create new contact message
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    
    // Send email notification to admin
    const emailResult = await sendEmail(
      'radhe.harsh5@gmail.com', // Admin email
      'contact',
      req.body
    );
    
    // Send confirmation email to sender
    const senderEmailResult = await sendEmail(
      req.body.email,
      'contact',
      req.body
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully',
      data: contact,
      emailSent: emailResult.success,
      senderEmailSent: senderEmailResult.success
    });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(400).json({ 
      success: false, 
      message: 'Failed to send message',
      error: error.message 
    });
  }
});

// GET - Retrieve all contact messages (for admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ 
      success: true, 
      data: contacts 
    });
  } catch (error) {
    console.error('Fetch contacts error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch contact messages',
      error: error.message 
    });
  }
});

module.exports = router; 