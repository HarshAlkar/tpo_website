const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://tpo-website-vercel.vercel.app',
        'https://tpo-website-git-main-harshalkar.vercel.app',
        'https://tpo-website-harshalkar.vercel.app',
        'https://tpo-website-jzi3.vercel.app',
        'https://your-vercel-domain.vercel.app'  // Replace with your actual Vercel domain
      ]
    : 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
console.log('Environment variables check:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tpo-website';
console.log('Using MongoDB URI:', mongoUri);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  console.error('Please check your MongoDB Atlas configuration and IP whitelist');
});

// MongoDB connection event handlers
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

// Import routes
const registrationRoutes = require('./routes/registration');
const contactRoutes = require('./routes/contact');

// Use routes
app.use('/api/register', registrationRoutes);
app.use('/api/contact', contactRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'TPO Website Backend API' });
});

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Test endpoint for registration
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend is running',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 