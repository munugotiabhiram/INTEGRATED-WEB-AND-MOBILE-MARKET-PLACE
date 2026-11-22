import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, token } = useApp();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
