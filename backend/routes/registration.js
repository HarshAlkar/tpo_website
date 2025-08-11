const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Registration = require('../models/Registration');
const { sendEmail } = require('../utils/emailService');

// Configure multer for this route
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

// POST - Create new registration with file upload
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    console.log('File uploaded:', req.file);
    
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Resume file is required'
      });
    }
    
    // Prepare registration data
    const registrationData = {
      ...req.body,
      resume: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path
      }
    };
    
    console.log('Registration data with resume:', registrationData);
    
    const registration = new Registration(registrationData);
    await registration.save();
    console.log('Registration saved successfully:', registration._id);
    
    // Send email notification to admin with resume attachment
    const emailResult = await sendEmail(
      'harshalkar0504@gmail.com', // Admin email
      'registration',
      {
        ...req.body,
        resumeFileName: req.file.originalname,
        resumeSize: (req.file.size / 1024 / 1024).toFixed(2) + ' MB'
      },
      req.file.path // Pass the file path for attachment
    );
    
    // Send confirmation email to student
    const studentEmailResult = await sendEmail(
      req.body.email,
      'registrationThankYou',
      {
        ...req.body,
        resumeFileName: req.file.originalname
      }
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
    
    // If there's an error and file was uploaded, delete it
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
        console.log('Deleted uploaded file due to error:', req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }
    
    // Provide more specific error messages
    let errorMessage = 'Registration failed';
    if (error.name === 'ValidationError') {
      errorMessage = 'Please check your input data and try again';
    } else if (error.code === 11000) {
      errorMessage = 'A registration with this email or roll number already exists';
    } else if (error.name === 'MongooseServerSelectionError') {
      errorMessage = 'Database connection error. Please try again later';
    } else if (error.message.includes('Invalid file type')) {
      errorMessage = error.message;
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

// GET - Download resume file
router.get('/resume/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '..', 'uploads', filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Resume file not found'
      });
    }
    
    // Get file info
    const stat = fs.statSync(filePath);
    
    // Set headers for file download
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    
  } catch (error) {
    console.error('Download resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to download resume',
      error: error.message
    });
  }
});

module.exports = router; 