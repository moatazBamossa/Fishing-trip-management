import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean | undefined; // Adjust based on your auth state type
  children: JSX.Element; // The component to render when authenticated
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  children
}) => {
  if (isAuthenticated === undefined) {
    // Optionally, render a loading indicator while checking authentication
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
