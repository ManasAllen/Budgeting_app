import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaChartPie, FaSignOutAlt } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';

const AppHeader = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="md" sticky="top" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaChartPie className="me-2" />
          Budget Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated() ? (
              <>
                <Nav.Item className="d-flex align-items-center me-3">
                  <span className="text-light">Welcome, {user?.username}</span>
                </Nav.Item>
                <Nav.Link as={Link} to="/" className="me-2">Dashboard</Nav.Link>
                <Nav.Link onClick={handleLogout}>
                  <FaSignOutAlt className="me-1" />
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="me-2">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppHeader;