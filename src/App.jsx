import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Search_School from './school/Search_School';
import Edu_Dashboard from './assets/components/Educator/Edu_Dashboard';
import Edu_Course from './assets/components/Educator/Edu_Course';
import Edu_StuList from './assets/components/Educator/Edu_StuList';
import Edu_Classroom from './assets/components/Educator/Edu_Classroom';
import Edu_Messages from './assets/components/Educator/Edu_Messages';
import Edu_Profile from './assets/components/Educator/Profile/Edu_Profile';
import Edu_Settings from './assets/components/Educator/Profile/Edu_Settings';
import Stu_Dashboard from './assets/components/Student/Stu_Dashboard';
import Stu_Classroom from './assets/components/Student/Stu_Classroom';
import Stu_Messages from './assets/components/Student/Stu_Messages';
import Stu_Profile from './assets/components/Student/Profile/Stu_Profile';
import Stu_Settings from './assets/components/Student/Profile/Stu_Settings';

// Function to check if user is authenticated
const isAuthenticated = () => {
  const userType = localStorage.getItem('userType');
  const userData = localStorage.getItem('userData');
  return userType && userData;
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = () => {
    const userType = localStorage.getItem('userType');
    const userData = localStorage.getItem('userData');
    return userType && userData;
  };

  const hasCorrectRole = () => {
    const userType = localStorage.getItem('userType');
    const path = window.location.pathname;
    
    if (path.startsWith('/student/') && userType !== 'student') {
      return false;
    }
    if (path.startsWith('/educator/') && userType !== 'educator') {
      return false;
    }
    return true;
  };

  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }

  if (!hasCorrectRole()) {
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
        <Route path="/educator/courses" element={<Edu_Course />} />
        <Route path="/educator/students" element={<Edu_StuList />} />
        <Route path="/educator/classroom" element={<Edu_Classroom />} />
        <Route path="/educator/messages" element={<Edu_Messages />} />
        <Route path="/educator/profile" element={
          <ProtectedRoute>
            <Edu_Profile />
          </ProtectedRoute>
        } />
        <Route path="/educator/settings" element={
          <ProtectedRoute>
            <Edu_Settings />
          </ProtectedRoute>
        } />
        
        {/* Protected Student Routes */}
        <Route path="/student/dashboard" element={
          <ProtectedRoute>
            <Stu_Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/student/classroom" element={
          <ProtectedRoute>
            <Stu_Classroom />
          </ProtectedRoute>
        } />
        <Route path="/student/messages" element={
          <ProtectedRoute>
            <Stu_Messages />
          </ProtectedRoute>
        } />
        <Route path="/student/profile" element={
          <ProtectedRoute>
            <Stu_Profile />
          </ProtectedRoute>
        } />
        <Route path="/student/settings" element={
          <ProtectedRoute>
            <Stu_Settings />
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
