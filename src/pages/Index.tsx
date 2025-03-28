
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to Home immediately
    navigate('/home', { replace: true });
  }, [navigate]);
  
  // Return empty div while redirecting
  return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <p className="text-gray-500">Redirecting to homepage...</p>
  </div>;
};

export default Index;
