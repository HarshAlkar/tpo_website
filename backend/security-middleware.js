// Comprehensive Security Middleware for TPO Website
// This middleware handles all security aspects and prevents Chrome warnings

const securityMiddleware = (req, res, next) => {
  // Remove any existing security headers to prevent conflicts
  res.removeHeader('X-Content-Type-Options');
  res.removeHeader('X-Frame-Options');
  res.removeHeader('X-XSS-Protection');
  res.removeHeader('Referrer-Policy');
  res.removeHeader('Permissions-Policy');
  res.removeHeader('Content-Security-Policy');
  res.removeHeader('Strict-Transport-Security');
  res.removeHeader('X-Download-Options');
  res.removeHeader('X-Permitted-Cross-Domain-Policies');
  res.removeHeader('Cross-Origin-Embedder-Policy');
  res.removeHeader('Cross-Origin-Opener-Policy');
  res.removeHeader('Cross-Origin-Resource-Policy');

  // Set comprehensive security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()');
  
  // Content Security Policy - Very permissive to prevent warnings
  const csp = [
    "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: http: *;",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https: http: * 'nonce-${Date.now()}';",
    "style-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: http: *;",
    "img-src 'self' data: blob: https: http: *;",
    "font-src 'self' data: blob: https: http: *;",
    "connect-src 'self' https: http: ws: wss: *;",
    "media-src 'self' data: blob: https: http: *;",
    "object-src 'self' data: blob:;",
    "base-uri 'self';",
    "form-action 'self' https: http:;",
    "frame-ancestors 'self';",
    "worker-src 'self' blob:;",
    "child-src 'self' blob:;",
    "manifest-src 'self' https: http:;",
    "prefetch-src 'self' https: http:;"
  ].join(' ');
  
  res.setHeader('Content-Security-Policy', csp);
  
  // Additional security headers
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-Download-Options', 'noopen');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  
  // Cache and performance headers
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  // Vercel-specific headers
  res.setHeader('X-Vercel-Cache', '0');
  res.setHeader('X-Vercel-Id', 'tpo-website');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, Accept, X-Requested-With, X-Forwarded-For, X-Real-IP');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.status(200).end();
    return;
  }
  
  // Log security headers for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('Security headers applied for:', req.url);
    console.log('User-Agent:', req.get('User-Agent'));
  }
  
  next();
};

// CORS middleware with comprehensive configuration
const corsMiddleware = (req, res, next) => {
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
  
  const origin = req.get('Origin');
  
  // Always allow requests
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, Accept, X-Requested-With, X-Forwarded-For, X-Real-IP');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  next();
};

module.exports = {
  securityMiddleware,
  corsMiddleware
};
