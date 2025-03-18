import React from 'react';
import { Container } from 'react-bootstrap';
import Login from '../components/Login';

const LoginPage = () => {
  return (
    <Container className="py-5">
      <Login />
    </Container>
  );
};

export default LoginPage;