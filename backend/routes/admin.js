const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const path = require('path');
const fs = require('fs');

// GET - Admin dashboard with all registrations and resume info
router.get('/dashboard', async (req, res) => {
  try {
    const registrations = await Registration.find()
      .select('name email roll branch year phone resume createdAt')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: registrations,
      total: registrations.length
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin dashboard data',
      error: error.message
    });
  }
});

// GET - View specific registration with resume details
router.get('/registration/:id', async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }
    
    res.json({
      success: true,
      data: registration
    });
  } catch (error) {
    console.error('Get registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registration',
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

// GET - List all uploaded files
router.get('/files', async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    
    if (!fs.existsSync(uploadsDir)) {
      return res.json({
        success: true,
        data: [],
        message: 'Uploads directory does not exist'
      });
    }
    
    const files = fs.readdirSync(uploadsDir);
    const fileDetails = files.map(filename => {
      const filePath = path.join(uploadsDir, filename);
      const stat = fs.statSync(filePath);
      
      return {
        filename,
        size: stat.size,
        sizeFormatted: (stat.size / 1024).toFixed(2) + ' KB',
        uploadedAt: stat.birthtime,
        lastModified: stat.mtime
      };
    });
    
    res.json({
      success: true,
      data: fileDetails,
      total: fileDetails.length
    });
    
  } catch (error) {
    console.error('List files error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to list files',
      error: error.message
    });
  }
});

// DELETE - Delete a registration and its resume file
router.delete('/registration/:id', async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }
    
    // Delete resume file if it exists
    if (registration.resume && registration.resume.path) {
      try {
        if (fs.existsSync(registration.resume.path)) {
          fs.unlinkSync(registration.resume.path);
          console.log('Deleted resume file:', registration.resume.path);
        }
      } catch (unlinkError) {
        console.error('Error deleting resume file:', unlinkError);
      }
    }
    
    // Delete registration from database
    await Registration.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Registration and resume deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete registration',
      error: error.message
    });
  }
});

module.exports = router;
