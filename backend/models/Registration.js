const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  roll: {
    type: String,
    required: true,
    trim: true
  },
  branch: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: String,
    required: true,
    enum: ['First Year', 'Second Year', 'Third Year', 'Final Year']
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  why: {
    type: String,
    trim: true
  },
  resume: {
    filename: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
    mimetype: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  documents: [{
    type: {
      type: String,
      enum: ['marksheet', 'id_proof', 'certificate', 'other'],
      required: true
    },
    filename: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
    mimetype: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  interview: {
    status: {
      type: String,
      enum: ['pending', 'selected', 'rejected'],
      default: null
    },
    scheduledDate: {
      type: Date
    },
    scheduledTime: {
      type: String
    },
    venue: {
      type: String
    },
    notes: {
      type: String
    },
    notifiedAt: {
      type: Date
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Registration', registrationSchema); 