import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getUserProfile } from '../api/authApi';
import { 
  setToken, 
  getToken, 
  removeToken, 
  setCurrentUser, 
  getCurrentUser, 
  removeCurrentUser
} from '../utils/localStorage';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      const storedUser = getCurrentUser();
      
      if (token && storedUser) {
        console.log('Found stored user:', storedUser);
        setUser(storedUser);
      }
      
      setLoading(false);
    };
    
    initAuth();
  }, []);

  const login = async (username, password) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Attempting login for username:', username);
      const response = await apiLogin(username, password);
      
      if (response.access_token) {
        console.log('Login successful, token received');
        setToken(response.access_token);
        
        const userObj = { username };
        console.log('Setting user data:', userObj);
        
        setCurrentUser(userObj);
        setUser(userObj);
        
        return true;
      }
      
      return false;
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.detail || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, password) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Attempting registration for username:', username);
      await apiRegister(username, password);
      
      console.log('Registration successful, proceeding to login');
      return await login(username, password);
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.detail || 'Registration failed. Username may already be taken.';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('Logging out user');
    removeToken();
    removeCurrentUser();
    setUser(null);
  };

  const isAuthenticated = () => {
    const hasUser = !!user;
    const hasToken = !!getToken();
    console.log('Authentication check:', { hasUser, hasToken });
    return hasUser && hasToken;
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};