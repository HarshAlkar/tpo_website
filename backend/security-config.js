// Security configuration for TPO Website
// This file contains security headers that prevent Chrome security warnings
// Updated to support 50MB file uploads

const securityHeaders = {
  // Basic security headers
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  
  // Content Security Policy - Balanced security without being too restrictive
  'Content-Security-Policy': [
    "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:;",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:;",
    "style-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:;",
    "img-src 'self' data: blob: https: http:;",
    "font-src 'self' data: blob: https:;",
    "connect-src 'self' https: http: ws: wss:;",
    "media-src 'self' data: blob: https:;",
    "object-src 'none';",
    "base-uri 'self';",
    "form-action 'self';",
    "frame-ancestors 'self';"
  ].join(' '),
  
  // Additional security headers
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
};

// CORS configuration
const corsConfig = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://tpo-website-jzi3.vercel.app',
      'https://tpo-website.vercel.app',
      'http://localhost:3000',
      'http://localhost:5173',
      'https://localhost:5173'
    ];
    
    // Allow all origins in development, specific origins in production
    if (process.env.NODE_ENV === 'development' || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With']
};

module.exports = {
  securityHeaders,
  corsConfig
};
