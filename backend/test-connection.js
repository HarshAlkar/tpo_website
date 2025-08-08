const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing backend connection...');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
console.log('PORT:', process.env.PORT);

// Test MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  
  // Test creating a simple document
  const testSchema = new mongoose.Schema({ test: String });
  const TestModel = mongoose.model('Test', testSchema);
  
  return TestModel.create({ test: 'connection-test' });
})
.then((result) => {
  console.log('✅ Database write test successful:', result._id);
  return TestModel.findByIdAndDelete(result._id);
})
.then(() => {
  console.log('✅ Database cleanup successful');
  process.exit(0);
})
.catch((error) => {
  console.error('❌ Connection failed:', error.message);
  process.exit(1);
}); 