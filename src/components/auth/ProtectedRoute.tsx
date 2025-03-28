
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, checkAuthStatus } = useAuth();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Verify token validity
        const isValid = await checkAuthStatus();
        
        if (!isValid) {
          toast.error('Your session has expired. Please log in again.');
          setAuthorized(false);
        } else if (requireAdmin && !isAdmin) {
          toast.error('Admin access required for this page.');
          setAuthorized(false);
        } else {
          setAuthorized(true);
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        setAuthorized(false);
      } finally {
        setChecking(false);
      }
    };

    if (isAuthenticated) {
      if (requireAdmin && !isAdmin) {
        setChecking(false);
        setAuthorized(false);
      } else {
        verifyAuth();
      }
    } else {
      setChecking(false);
      setAuthorized(false);
    }
  }, [isAuthenticated, isAdmin, requireAdmin, checkAuthStatus]);

  if (checking) {
    // Show a loading state while checking authentication
    return <div className="flex items-center justify-center h-screen">Verifying authentication...</div>;
  }

  if (!authorized) {
    // Redirect to login with the return URL
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  // If the user is authorized, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
