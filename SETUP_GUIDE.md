# 🚀 TPO Website Setup Guide

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Gmail account for email functionality

## 🛠️ Installation Steps

### 1. **Clone and Navigate**
```bash
cd tpo
```

### 2. **Backend Setup**
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Install email package
npm install nodemailer
```

### 3. **Frontend Setup**
```bash
# Navigate to frontend
cd ..

# Install dependencies
npm install
```

## 📧 Email Configuration

### Step 1: Gmail App Password Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. **Copy the 16-character password**

### Step 2: Update Environment Variables

Edit `backend/config.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tpo-website

# Email Configuration
EMAIL_USER=your-actual-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
ADMIN_EMAIL=admin@college.edu
```

## 🚀 Running the Application

### **PowerShell Commands (Windows)**

#### Start Backend:
```powershell
cd tpo/backend
npm run dev
```

#### Start Frontend (in new terminal):
```powershell
cd tpo
npm run dev
```

### **Bash Commands (Mac/Linux)**

#### Start Backend:
```bash
cd tpo/backend
npm run dev
```

#### Start Frontend (in new terminal):
```bash
cd tpo
npm run dev
```

## 🌐 Access URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 📧 Email Features

### ✅ Registration Form
- **Admin Notification**: Detailed student info sent to admin
- **Student Confirmation**: Confirmation email sent to student
- **Beautiful HTML Template**: Professional email design

### ✅ Contact Form
- **Admin Notification**: Contact form details sent to admin
- **Sender Confirmation**: Confirmation sent to the person who submitted
- **Formatted Message**: Clean, readable email format

## 🎨 Enhanced Features

### ✨ Animations & Interactions
- Smooth page transitions with fade-in effects
- Interactive hover effects on all cards and buttons
- Staggered animations for lists and grids
- Loading animations with custom spinners
- Scroll-to-top button with smooth scrolling

### 🎯 User Experience
- Animated statistics with pulse effects
- Interactive forms with focus animations
- Hover effects on team member cards
- Animated background elements in hero section
- Smooth transitions throughout the site

## 🔧 Troubleshooting

### Email Issues:

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

### Server Issues:

1. **"Missing script: dev"**:
   - Ensure you're in the correct directory
   - Run `npm install` first

2. **Port already in use**:
   - Change PORT in config.env
   - Kill existing processes on the port

### Database Issues:

1. **MongoDB connection failed**:
   - Ensure MongoDB is running
   - Check MONGODB_URI in config.env
   - Install MongoDB if not installed

## 🧪 Testing

### Test Registration:
```javascript
// Browser console or Postman
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

### Test Contact:
```javascript
fetch('http://localhost:5000/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message'
  })
})
```

## 📱 Email Preview

The emails will include:
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

## 📞 Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB is running
4. Test email configuration with a simple test

## 🎉 Success!

Once everything is set up, you'll have:
- ✅ Beautiful animated TPO website
- ✅ Email notifications for registrations
- ✅ Email notifications for contact forms
- ✅ Professional email templates
- ✅ Real-time email status feedback
- ✅ Mobile-responsive design 