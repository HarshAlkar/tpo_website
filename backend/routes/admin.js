const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const { sendEmail } = require('../utils/emailService');
const path = require('path');
const fs = require('fs');

// GET - Admin dashboard with all registrations and resume info
router.get('/dashboard', async (req, res) => {
  try {
    const registrations = await Registration.find()
      .select('name email roll branch year phone resume interview createdAt')
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

// GET - Download any document file
router.get('/document/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '..', 'uploads', filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Document file not found'
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
    console.error('Download document error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to download document',
      error: error.message
    });
  }
});

// POST - Upload additional documents for a student
router.post('/upload-document/:id', async (req, res) => {
  const multer = require('multer');
  
  // Configure multer for document uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, '..', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 50 * 1024 * 1024 // 50MB limit
    },
    fileFilter: (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);

      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Only PDF, DOC, DOCX, and image files are allowed'));
      }
    }
  }).single('document');

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }

    try {
      const { id } = req.params;
      const { documentType } = req.body;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      const registration = await Registration.findById(id);
      if (!registration) {
        return res.status(404).json({
          success: false,
          message: 'Registration not found'
        });
      }

      const documentData = {
        type: documentType || 'other',
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path
      };

      registration.documents.push(documentData);
      await registration.save();

      res.json({
        success: true,
        message: 'Document uploaded successfully',
        document: documentData
      });

    } catch (error) {
      console.error('Document upload error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to upload document',
        error: error.message
      });
    }
  });
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

// DELETE - Delete a registration and its resume file (with email notification)
router.delete('/registration/:id', async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }
    
    // Send "not selected" email notification before deletion
    const emailResult = await sendEmail(
      registration.email,
      'studentDeleted',
      {
        name: registration.name,
        roll: registration.roll,
        branch: registration.branch,
        year: registration.year
      }
    );
    
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
    
    // Delete additional documents if they exist
    if (registration.documents && registration.documents.length > 0) {
      registration.documents.forEach(doc => {
        try {
          if (fs.existsSync(doc.path)) {
            fs.unlinkSync(doc.path);
            console.log('Deleted document file:', doc.path);
          }
        } catch (unlinkError) {
          console.error('Error deleting document file:', unlinkError);
        }
      });
    }
    
    // Delete registration from database
    await Registration.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Student registration deleted and notification email sent',
      emailSent: emailResult.success
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

// PUT - Update interview status and schedule
router.put('/interview/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, scheduledDate, scheduledTime, venue, notes } = req.body;
    
    const registration = await Registration.findById(id);
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }
    
    // Update interview details
    registration.interview = {
      status,
      scheduledDate: scheduledDate ? new Date(scheduledDate) : undefined,
      scheduledTime,
      venue,
      notes,
      notifiedAt: status === 'selected' ? new Date() : registration.interview?.notifiedAt
    };
    
    await registration.save();
    
    // Send email notification if selected for interview
    if (status === 'selected' && scheduledDate && scheduledTime) {
      const emailResult = await sendEmail(
        registration.email,
        'interviewScheduled',
        {
          name: registration.name,
          roll: registration.roll,
          branch: registration.branch,
          scheduledDate: new Date(scheduledDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          scheduledTime,
          venue: venue || 'TPO Office'
        }
      );
      
      res.json({
        success: true,
        message: 'Interview scheduled and notification sent',
        data: registration,
        emailSent: emailResult.success
      });
    } else if (status === 'rejected') {
      const emailResult = await sendEmail(
        registration.email,
        'interviewRejected',
        {
          name: registration.name,
          roll: registration.roll,
          branch: registration.branch
        }
      );
      
      res.json({
        success: true,
        message: 'Interview status updated and notification sent',
        data: registration,
        emailSent: emailResult.success
      });
    } else {
      res.json({
        success: true,
        message: 'Interview status updated',
        data: registration
      });
    }
    
  } catch (error) {
    console.error('Update interview error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update interview status',
      error: error.message
    });
  }
});

// GET - Get interview statistics
router.get('/interview-stats', async (req, res) => {
  try {
    const stats = await Registration.aggregate([
      {
        $group: {
          _id: '$interview.status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const total = await Registration.countDocuments();
    
    // Count null status as pending
    const nullCount = stats.find(s => s._id === null)?.count || 0;
    const pendingCount = stats.find(s => s._id === 'pending')?.count || 0;
    
    const formattedStats = {
      total,
      pending: nullCount + pendingCount, // Combine null and pending counts
      selected: stats.find(s => s._id === 'selected')?.count || 0,
      rejected: stats.find(s => s._id === 'rejected')?.count || 0
    };
    
    res.json({
      success: true,
      data: formattedStats
    });
  } catch (error) {
    console.error('Interview stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch interview statistics',
      error: error.message
    });
  }
});

// POST - Bulk update interview status
router.post('/bulk-interview-update', async (req, res) => {
  try {
    const { studentIds, status, scheduledDate, scheduledTime, venue } = req.body;
    
    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Student IDs array is required'
      });
    }
    
    const updateData = {
      'interview.status': status,
      'interview.scheduledDate': scheduledDate ? new Date(scheduledDate) : undefined,
      'interview.scheduledTime': scheduledTime,
      'interview.venue': venue,
      'interview.notifiedAt': status === 'selected' ? new Date() : undefined
    };
    
    // Remove undefined values
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );
    
    const result = await Registration.updateMany(
      { _id: { $in: studentIds } },
      { $set: updateData }
    );
    
    // Send notifications if selected
    if (status === 'selected' && scheduledDate && scheduledTime) {
      const students = await Registration.find({ _id: { $in: studentIds } });
      
      for (const student of students) {
        await sendEmail(
          student.email,
          'interviewScheduled',
          {
            name: student.name,
            roll: student.roll,
            branch: student.branch,
            scheduledDate: new Date(scheduledDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            scheduledTime,
            venue: venue || 'TPO Office'
          }
        );
      }
    }
    
    res.json({
      success: true,
      message: `Updated ${result.modifiedCount} students`,
      modifiedCount: result.modifiedCount
    });
    
  } catch (error) {
    console.error('Bulk update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to bulk update interview status',
      error: error.message
    });
  }
});

module.exports = router;
