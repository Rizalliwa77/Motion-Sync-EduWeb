import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Search_School from './school/Search_School';
import Edu_Dashboard from './assets/components/Educator/Edu_Dashboard';

// Function to check if user is authenticated
const isAuthenticated = () => {
  const userType = localStorage.getItem('userType');
  const userData = localStorage.getItem('userData');
  return userType && userData;
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/search-school" element={<Search_School />} />
        <Route path="/enroll/:schoolId" element={<div>Enrollment Page (Coming Soon)</div>} />
        
        {/* Protected Educator Routes */}
        <Route path="/educator/dashboard" element={
          <ProtectedRoute>
            <Edu_Dashboard />
          </ProtectedRoute>
        } />
        
        {/* Catch all route - redirects to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
