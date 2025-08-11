# File Upload System for TPO Registration

This document describes the file upload functionality implemented for the TPO student registration system.

## Overview

The system now supports resume/CV uploads during student registration. Students can upload their resumes in PDF, DOC, or DOCX format with a maximum file size of 50MB.

## Features

### ✅ Supported File Types
- **PDF** (.pdf) - `application/pdf`
- **Microsoft Word** (.doc) - `application/msword`
- **Microsoft Word** (.docx) - `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

### ✅ File Validation
- File type validation
- File size limit: 50MB
- Required field validation

### ✅ Security Features
- Unique filename generation
- File type filtering
- Size restrictions
- Secure file storage

## Technical Implementation

### Backend Changes

#### 1. Dependencies Added
```bash
npm install multer
```

#### 2. Database Schema Updates
The `Registration` model now includes a `resume` field:
```javascript
resume: {
  filename: String,        // Generated unique filename
  originalName: String,    // Original filename from user
  mimetype: String,        // File MIME type
  size: Number,           // File size in bytes
  path: String            // File path on server
}
```

#### 3. File Storage Configuration
- **Storage Location**: `backend/uploads/` directory
- **Filename Generation**: `resume-{timestamp}-{random}.{extension}`
- **Directory Creation**: Automatically created if it doesn't exist

#### 4. API Endpoints

##### Registration with File Upload
```
POST /api/register
Content-Type: multipart/form-data

Fields:
- name: String (required)
- roll: String (required)
- branch: String (required)
- year: String (required)
- phone: String (required)
- email: String (required)
- why: String (optional)
- resume: File (required)
```

##### Download Resume
```
GET /api/register/resume/:filename
```

### Frontend Changes

#### 1. Form Updates
- Added resume upload field
- File type and size validation
- Visual feedback for selected files
- Error handling and display

#### 2. Form Submission
- Changed from JSON to FormData
- File upload handling
- Progress indication

## File Structure

```
backend/
├── uploads/                 # Uploaded files directory
├── models/
│   └── Registration.js     # Updated schema with resume field
├── routes/
│   └── registration.js     # File upload handling
├── server.js               # Multer configuration
├── .gitignore              # Excludes uploads directory
└── FILE_UPLOAD_README.md   # This file
```

## Usage Examples

### Frontend Form Submission
```javascript
const formData = new FormData();
formData.append('name', 'John Doe');
formData.append('email', 'john@example.com');
formData.append('resume', resumeFile);

const response = await fetch('/api/register', {
  method: 'POST',
  body: formData
});
```

### Backend File Processing
```javascript
// File is available in req.file
const file = req.file;
console.log('Uploaded file:', {
  filename: file.filename,
  originalName: file.originalname,
  size: file.size,
  mimetype: file.mimetype
});
```

## Error Handling

### File Validation Errors
- **Invalid file type**: Only PDF, DOC, DOCX allowed
- **File too large**: Maximum 50MB limit
- **No file uploaded**: Resume is required

### Server Errors
- **Storage errors**: Disk space issues
- **Database errors**: MongoDB connection issues
- **Email errors**: Notification delivery failures

## Security Considerations

### ✅ Implemented
- File type validation
- File size limits
- Unique filename generation
- Secure file storage path

### 🔒 Best Practices
- Files stored outside web root
- No direct file access
- File type whitelisting
- Size restrictions

## Testing

### Manual Testing
1. Start the backend server: `npm start`
2. Navigate to the registration form
3. Upload different file types and sizes
4. Verify database storage
5. Test file download functionality

### Test Script
Run the test script to verify setup:
```bash
node test-upload.js
```

## Deployment Notes

### Environment Variables
Ensure these are set in production:
- `NODE_ENV=production`
- `MONGODB_URI` (MongoDB connection string)
- `PORT` (Server port)

### File Storage
- Ensure `uploads/` directory has proper permissions
- Monitor disk space usage
- Implement file cleanup policies if needed

### Scaling Considerations
- For high-traffic applications, consider cloud storage (AWS S3, Google Cloud Storage)
- Implement file compression
- Add CDN for file delivery

## Troubleshooting

### Common Issues

#### 1. File Upload Fails
- Check file size (max 50MB)
- Verify file type (PDF, DOC, DOCX only)
- Ensure uploads directory exists and is writable

#### 2. Database Errors
- Verify MongoDB connection
- Check database permissions
- Review schema validation

#### 3. File Access Issues
- Verify file paths
- Check file permissions
- Ensure static file serving is configured

### Debug Mode
Enable debug logging by setting:
```bash
NODE_ENV=development
```

## Support

For issues or questions regarding the file upload system:
1. Check server logs for error messages
2. Verify file upload configuration
3. Test with different file types and sizes
4. Review this documentation

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintainer**: TPO Development Team
