# Email Setup Guide for TPO Website

## 🚀 Quick Setup

### 1. Gmail App Password Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. **Copy the 16-character password**

### 2. Update Environment Variables

Edit `config.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tpo-website

# Email Configuration
EMAIL_USER=your-actual-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
ADMIN_EMAIL=admin@college.edu
```
ldbf wfje awut wnow
### 3. Test Email Configuration

Start the server and test the email functionality:

```bash
npm run dev
```

## 📧 Email Features

### Registration Form
- **Admin Notification**: Sends detailed registration info to admin
- **Student Confirmation**: Sends confirmation email to student
- **Beautiful HTML Template**: Professional-looking email design

### Contact Form
- **Admin Notification**: Sends contact form details to admin
- **Sender Confirmation**: Sends confirmation to the person who submitted
- **Formatted Message**: Clean, readable email format

## 🎨 Email Templates

### Registration Email Includes:
- ✅ Student's full name
- ✅ Roll number
- ✅ Branch and year
- ✅ Phone number
- ✅ Email address
- ✅ Why they want to join TPO (if provided)
- ✅ Registration timestamp

### Contact Email Includes:
- ✅ Sender's name
- ✅ Email address
- ✅ Message content
- ✅ Submission timestamp

## 🔧 Troubleshooting

### Common Issues:

1. **"Invalid login" error**:
   - Check if 2FA is enabled
   - Verify app password is correct
   - Ensure EMAIL_USER is correct

2. **"Less secure app" error**:
   - Use App Password instead of regular password
   - Enable 2-Factor Authentication

3. **Email not sending**:
   - Check console logs for errors
   - Verify all environment variables are set
   - Test with a simple email first

### Testing Email:

```javascript
// Test in browser console or Postman
fetch('http://localhost:5000/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test Student',
    roll: '2024001',
    branch: 'Computer Science',
    year: 'Second Year',
    phone: '1234567890',
    email: 'test@example.com',
    why: 'I want to join TPO for better career opportunities'
  })
})
```

## 📱 Email Preview

The emails will look professional with:
- 🎨 Modern HTML design
- 📊 Organized information tables
- 🎯 Clear subject lines
- 📅 Timestamp information
- 🏫 College branding

## 🔒 Security Notes

- Never commit real email credentials to git
- Use environment variables for sensitive data
- Consider using a dedicated email service for production
- Monitor email sending limits for Gmail (500/day for free accounts) 