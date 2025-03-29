
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ApiLoading } from '@/components/ui/api-status';

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
        
        // If we have local authentication but can't connect to API, 
        // we'll still authorize based on local data
        if (isAuthenticated) {
          // For admin routes, strictly enforce role check
          if (requireAdmin && !isAdmin) {
            toast.error('Admin access required for this page.');
            setAuthorized(false);
          } else {
            // Allow access for regular protected routes in offline mode
            toast.warning('Operating in offline mode. Some features may be limited.');
            setAuthorized(true);
          }
        } else {
          setAuthorized(false);
        }
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
    return <ApiLoading message="Verifying authentication..." />;
  }

  if (!authorized) {
    // Redirect to login with the return URL
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  // If the user is authorized, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
