import React, { useState, useEffect } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Card from './common/Card';
import Input from './common/Input';
import Button from './common/Button';
import Spinner from './common/Spinner';
import useAuth from '../hooks/useAuth';
import { validateUsername, validatePassword } from '../utils/validators';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, error, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    const usernameError = validateUsername(formData.username);
    if (usernameError) errors.username = usernameError;
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) errors.password = passwordError;
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    const success = await login(formData.username, formData.password);
    
    setIsSubmitting(false);
    
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Card 
        className="login-card" 
        title="Login to Budget Tracker"
        style={{ maxWidth: '450px', width: '100%' }}
      >
        <Form onSubmit={handleSubmit}>
          {error && (
            <Alert variant="danger">{error}</Alert>
          )}
          
          <Input
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            error={formErrors.username}
            required
          />
          
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={formErrors.password}
            required
          />
          
          <Button 
            type="submit" 
            variant="primary" 
            block
            disabled={loading || isSubmitting}
            className="mt-4"
          >
            {(loading || isSubmitting) ? (
              <Spinner size="sm" text="Logging in..." />
            ) : (
              'Login'
            )}
          </Button>
        </Form>
        
        <div className="mt-3 text-center">
          <p>
            Don't have an account?{' '}
            <Link to="/register">Register here</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;