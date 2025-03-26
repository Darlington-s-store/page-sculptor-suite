
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to Home immediately
    navigate('/', { replace: true });
  }, [navigate]);
  
  // Return empty div while redirecting
  return <div className="min-h-screen bg-gray-50"></div>;
};

export default Index;
