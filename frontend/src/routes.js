import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import useAuth from './hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;