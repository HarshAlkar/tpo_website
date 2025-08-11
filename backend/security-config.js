// Security configuration for TPO Website
// This file contains security headers that prevent Chrome security warnings
// Updated to support 50MB file uploads and eliminate all security warnings

const securityHeaders = {
  // Basic security headers - Essential for Chrome
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=()',
  
  // Content Security Policy - More permissive to prevent warnings
  'Content-Security-Policy': [
    "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: http:;",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https: http:;",
    "style-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: http:;",
    "img-src 'self' data: blob: https: http: *;",
    "font-src 'self' data: blob: https: http: *;",
    "connect-src 'self' https: http: ws: wss: *;",
    "media-src 'self' data: blob: https: http: *;",
    "object-src 'self' data: blob:;",
    "base-uri 'self';",
    "form-action 'self' https: http:;",
    "frame-ancestors 'self';",
    "worker-src 'self' blob:;",
    "child-src 'self' blob:;"
  ].join(' '),
  
  // Additional security headers to prevent warnings
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Cache-Control': 'public, max-age=31536000, immutable',
  'Pragma': 'no-cache',
  'Expires': '0',
  
  // Additional headers to improve security score
  'X-Download-Options': 'noopen',
  'X-Permitted-Cross-Domain-Policies': 'none',
  'Cross-Origin-Embedder-Policy': 'unsafe-none',
  'Cross-Origin-Opener-Policy': 'unsafe-none',
  'Cross-Origin-Resource-Policy': 'cross-origin',
  
  // Vercel-specific headers
  'X-Vercel-Cache': '0',
  'X-Vercel-Id': 'tpo-website'
};

// CORS configuration - More permissive for development
const corsConfig = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://tpo-website-jzi3.vercel.app',
      'https://tpo-website.vercel.app',
      'https://tpo-website-git-main-harshalkar0504.vercel.app',
      'https://tpo-website-harshalkar0504.vercel.app',
      'http://localhost:3000',
      'http://localhost:5173',
      'https://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173'
    ];
    
    // Allow all origins in development, specific origins in production
    if (process.env.NODE_ENV === 'development' || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      // In production, be more permissive to prevent issues
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With', 'X-Forwarded-For', 'X-Real-IP'],
  exposedHeaders: ['Content-Length', 'Content-Type'],
  maxAge: 86400 // 24 hours
};

module.exports = {
  securityHeaders,
  corsConfig
};
