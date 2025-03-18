import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css';

import AppHeader from './components/AppHeader';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container d-flex flex-column min-vh-100">
          <AppHeader />
          <main className="flex-grow-1">
            <AppRoutes />
          </main>
          <footer className="bg-light py-3 mt-auto">
            <div className="container text-center text-muted">
              <small>© {new Date().getFullYear()} Budget Tracker App</small>
            </div>
          </footer>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}

export default App;