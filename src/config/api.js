// API Configuration
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://tpo-backend.onrender.com'  // Production URL (update this with your actual Render URL)
  : 'http://localhost:5000';            // Development URL

export const API_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/api/register`,
  CONTACT: `${API_BASE_URL}/api/contact`,
};

export default API_BASE_URL; 