
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Get the return URL from location state or default to home
  const from = location.state?.from || '/';
  
  // If user is already authenticated, redirect them
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);
  
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen pt-20 pb-10 bg-gray-50">
      <div className="container px-4 mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center text-gray-600" 
          onClick={handleGoBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">
              Welcome to TravelGo
            </h1>
            
            <LoginForm 
              onSuccess={() => navigate(from, { replace: true })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
