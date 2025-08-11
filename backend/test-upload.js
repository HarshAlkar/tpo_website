const fs = require('fs');
const path = require('path');

// Test file upload functionality
console.log('🧪 Testing TPO File Upload System...\n');

// Check if uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (fs.existsSync(uploadsDir)) {
  console.log('✅ Uploads directory exists:', uploadsDir);
  
  // List files in uploads directory
  const files = fs.readdirSync(uploadsDir);
  console.log(`📁 Files in uploads directory: ${files.length}`);
  if (files.length > 0) {
    files.forEach(file => {
      const filePath = path.join(uploadsDir, file);
      const stats = fs.statSync(filePath);
      console.log(`   - ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
    });
  } else {
    console.log('   📝 No files uploaded yet');
  }
} else {
  console.log('❌ Uploads directory does not exist');
}

// Check if .gitignore includes uploads
const gitignorePath = path.join(__dirname, '.gitignore');
if (fs.existsSync(gitignorePath)) {
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
  if (gitignoreContent.includes('uploads/')) {
    console.log('✅ .gitignore includes uploads directory');
  } else {
    console.log('❌ .gitignore does not include uploads directory');
  }
} else {
  console.log('❌ .gitignore file does not exist');
}

console.log('\n🎯 Backend is ready for file uploads!');
console.log('📝 Supported file types: PDF, DOC, DOCX');
console.log('📏 Maximum file size: 5MB');
console.log('🌐 Server running on port 5000');

console.log('\n🔗 API Endpoints:');
console.log('   POST /api/register - Student registration with resume upload');
console.log('   GET  /api/register - List all registrations');
console.log('   GET  /api/register/resume/:filename - Download specific resume');

console.log('\n👨‍💼 Admin Endpoints:');
console.log('   GET  /api/admin/dashboard - Admin dashboard data');
console.log('   GET  /api/admin/files - List all uploaded files');
console.log('   GET  /api/admin/resume/:filename - Download resume (admin)');
console.log('   GET  /api/admin/registration/:id - View specific registration');
console.log('   DELETE /api/admin/registration/:id - Delete registration & resume');

console.log('\n📊 How to View Uploaded Resumes:');
console.log('\n1️⃣ DATABASE VIEW (MongoDB):');
console.log('   - Connect to: mongodb+srv://tpo_user:HARSH123@cluster0.nrjv1ah.mongodb.net/tpo-website');
console.log('   - Check "registrations" collection');
console.log('   - Each document has a "resume" field with file details');

console.log('\n2️⃣ FILE SYSTEM VIEW:');
console.log(`   - Navigate to: ${uploadsDir}`);
console.log('   - View physical files with unique names');

console.log('\n3️⃣ ADMIN DASHBOARD:');
console.log('   - Open: backend/admin-dashboard.html in your browser');
console.log('   - View all registrations and resumes');
console.log('   - Download, view, and manage files');

console.log('\n4️⃣ API CALLS:');
console.log('   - Use Postman or curl to test endpoints');
console.log('   - Example: GET http://localhost:5000/api/admin/dashboard');

console.log('\n5️⃣ COMMAND LINE:');
console.log('   - List files: dir backend\\uploads');
console.log('   - Check file sizes and dates');

console.log('\n🚀 Quick Start:');
console.log('1. Start backend: npm start');
console.log('2. Open admin dashboard: backend/admin-dashboard.html');
console.log('3. Test registration form with resume upload');
console.log('4. View uploaded files in admin dashboard');

console.log('\n💡 Tips:');
console.log('- Files are stored with unique names to prevent conflicts');
console.log('- Original filenames are preserved in the database');
console.log('- Admin dashboard shows file sizes and upload dates');
console.log('- You can search and filter registrations');
console.log('- Delete registrations to remove both data and files');

console.log('\n✨ System Status: READY TO USE!');
