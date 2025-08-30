// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (
  import.meta.env.PROD 
    ? 'https://tpo-website.onrender.com'  // Production URL (update this with your actual Render URL)
    : 'http://localhost:5000'             // Development URL
);

export const API_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/api/register`,
  CONTACT: `${API_BASE_URL}/api/contact`,
  ADMIN: {
    DASHBOARD: `${API_BASE_URL}/api/admin/dashboard`,
    INTERVIEW_STATS: `${API_BASE_URL}/api/admin/interview-stats`,
    UPDATE_INTERVIEW: `${API_BASE_URL}/api/admin/interview`,
    BULK_UPDATE: `${API_BASE_URL}/api/admin/bulk-interview-update`,
    RESUME: `${API_BASE_URL}/api/admin/resume`,
    DOCUMENT: `${API_BASE_URL}/api/admin/document`,
    UPLOAD_DOCUMENT: `${API_BASE_URL}/api/admin/upload-document`,
    DELETE_STUDENT: `${API_BASE_URL}/api/admin/registration`
  }
};

export default API_BASE_URL;