import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import useAuth from '../hooks/useAuth';

const DashboardPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return <Dashboard />;
};

export default DashboardPage;