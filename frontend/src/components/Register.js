import React, { useState, useEffect } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Card from './common/Card';
import Input from './common/Input';
import Button from './common/Button';
import Spinner from './common/Spinner';
import useAuth from '../hooks/useAuth';
import { validateUsername, validatePassword } from '../utils/validators';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, error, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
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
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    const success = await register(formData.username, formData.password);
    
    setIsSubmitting(false);
    
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Card 
        className="register-card" 
        title="Create an Account"
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
            placeholder="Choose a username"
            error={formErrors.username}
            required
          />
          
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Choose a password"
            error={formErrors.password}
            required
          />
          
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            error={formErrors.confirmPassword}
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
              <Spinner size="sm" text="Registering..." />
            ) : (
              'Register'
            )}
          </Button>
        </Form>
        
        <div className="mt-3 text-center">
          <p>
            Already have an account?{' '}
            <Link to="/login">Login here</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Register;