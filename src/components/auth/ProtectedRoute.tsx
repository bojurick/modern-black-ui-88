
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

type ProtectedRouteProps = {
  children: ReactNode;
  requiresAuth?: boolean;
  requiresAdmin?: boolean;
};

const ProtectedRoute = ({ 
  children, 
  requiresAuth = true,
  requiresAdmin = false 
}: ProtectedRouteProps) => {
  const { user, isLoading, isAdmin } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Show a loading state while checking authentication
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (requiresAuth && !user) {
    // Redirect to login if authentication is required but user is not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiresAdmin && !isAdmin) {
    // Redirect to dashboard if admin is required but user is not an admin
    return <Navigate to="/dashboard" replace />;
  }

  // If all checks pass, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
