
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiLoading, ApiError } from '../components/ui/api-status';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        const response = await fetch('http://localhost/travel-api/api/test-connection.php');
        const data = await response.json();
        
        if (data.status === 'success') {
          toast.success('Backend API connected successfully');
          // Redirect to Home
          navigate('/home', { replace: true });
        } else {
          setError('Backend API connection issue: ' + data.message);
          setTimeout(() => {
            // Redirect to Home after 3 seconds even if there's an error
            navigate('/home', { replace: true });
          }, 3000);
        }
      } catch (err) {
        console.error('API connection error:', err);
        setError('Cannot connect to the backend API. The application will work with local data only.');
        setTimeout(() => {
          // Redirect to Home after 3 seconds even if there's an error
          navigate('/home', { replace: true });
        }, 3000);
      } finally {
        setChecking(false);
      }
    };
    
    checkApiConnection();
  }, [navigate]);
  
  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ApiLoading message="Checking API connection..." />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ApiError message={error} />
        <p className="mt-4 text-gray-500">Redirecting to homepage in a moment...</p>
      </div>
    );
  }
  
  // Return empty div while redirecting
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-500">Redirecting to homepage...</p>
    </div>
  );
};

export default Index;
