import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
  
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;
