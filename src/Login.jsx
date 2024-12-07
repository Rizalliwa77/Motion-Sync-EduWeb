import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const ForgotPasswordPopup = ({ onClose, onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Reset Password</h2>
        <p>Enter your email address to reset your password</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="input-field"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="popup-buttons">
            <button type="submit" className="submit-button">Submit</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Check for predefined educator credentials
    if (username === 'edu' && password === '123') {
      // Educator login successful
      const educatorData = {
        username: 'edu',
        role: 'educator'
      };
      localStorage.setItem('userType', 'educator');
      localStorage.setItem('userData', JSON.stringify(educatorData));
      navigate('/educator/dashboard');
      return;
    }

    // Check for predefined student credentials
    if (username === 'stu' && password === '123') {
      // Student login successful
      const studentData = {
        username: 'stu',
        role: 'student'
      };
      localStorage.setItem('userType', 'student');
      localStorage.setItem('userData', JSON.stringify(studentData));
      navigate('/student/dashboard');
      return;
    }

    // If neither educator nor student credentials match, show error
    setError('Invalid username or password');
  };

  const handleForgotPassword = (email) => {
    // Handle password reset logic here
    console.log('Password reset requested for:', email);
  };

  return (
    <div className="login-container">
      <img 
        src="/media/EduMode_lanscape.png" 
        alt="EduMode Logo" 
        className="logo"
      />
      <div className="login-form-container">
        <h1>Log In</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="input-field"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="forgot-password">
            <a href="#" onClick={(e) => {
              e.preventDefault();
              setShowForgotPassword(true);
            }}>
              Forgot your password? <span>Click here</span>
            </a>
          </div>
          <button type="submit" className="login-button">
            LOG IN
          </button>
        </form>
        <div className="signup-link">
          <p>Don't have an account? 
            <a href="#" onClick={(e) => {
              e.preventDefault();
              navigate('/search-school');
            }}> Search for your school</a>
          </p>
        </div>
      </div>
      
      <div className="login-banner">
        <h2>Where learning transcends boundaries</h2>
        <p>Welcome to MotionSync EduMode!</p>
        <img 
          src="/media/opening_book.png" 
          alt="Open book illustration" 
          className="banner-image"
        />
      </div>

      {showForgotPassword && (
        <ForgotPasswordPopup
          onClose={() => setShowForgotPassword(false)}
          onSubmit={handleForgotPassword}
        />
      )}
    </div>
  );
};

export default Login;
