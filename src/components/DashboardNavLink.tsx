
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const DashboardNavLink = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Link to="/dashboard">
      <Button variant="outline" className="flex items-center gap-2">
        <span>Dashboard</span>
      </Button>
    </Link>
  );
};

export default DashboardNavLink;
