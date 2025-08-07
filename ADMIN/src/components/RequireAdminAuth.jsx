import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import Loader from '../components/Loader'; // or just a spinner/text

const RequireAdminAuth = ({ children }) => {
  const { isAuthenticated, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />; // or just return null or <p>Loading...</p>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAdminAuth;