import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Stu_Sidebar.css";

const Stu_Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      {/* Logo Section */}
      <div className="sidebar-logo">
        <img 
          src="/media/EduMode_landscape_WTE.png"
          alt="MotionSync EduMode" 
          className="logo-image"
        />
      </div>

      {/* Menu Items */}
      <ul className="sidebar-menu">
        <Link to="/student/dashboard">
          <li className={isActive("/student/dashboard") ? "active" : ""}>
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </li>
        </Link>
        <Link to="/student/classroom">
          <li className={isActive("/student/classroom") ? "active" : ""}>
            <span className="material-symbols-outlined">school</span>
            Classroom
          </li>
        </Link>
        <Link to="/student/messages">
          <li className={isActive("/student/messages") ? "active" : ""}>
            <span className="material-symbols-outlined">mail</span>
            Messages
          </li>
        </Link>
      </ul>

      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Profile and Settings */}
      <ul className="sidebar-menu">
        <Link to="/student/profile">
          <li className={isActive("/student/profile") ? "active" : ""}>
            <span className="material-symbols-outlined">person</span>
            Profile
          </li>
        </Link>
        <Link to="/student/settings">
          <li className={isActive("/student/settings") ? "active" : ""}>
            <span className="material-symbols-outlined">settings</span>
            Settings
          </li>
        </Link>
        <li onClick={handleLogout} className="logout-item">
          <span className="material-symbols-outlined">logout</span>
          Log out
        </li>
      </ul>

      {/* Footer Section */}
      <div className="sidebar-footer">
        <div className="user-icon">
          <span className="material-symbols-outlined">account_circle</span>
        </div>
        <div className="user-info">
          <p>{userData?.name || 'Student'}</p>
          <span>Learner</span>
        </div>
      </div>
    </div>
  );
};

export default Stu_Sidebar;
