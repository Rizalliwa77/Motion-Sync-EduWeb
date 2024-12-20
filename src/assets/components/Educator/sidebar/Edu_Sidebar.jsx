import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Edu_Sidebar.css";

const Edu_Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
        <Link to="/educator/dashboard">
          <li className={isActive("/educator/dashboard") ? "active" : ""}>
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </li>
        </Link>
        <Link to="/educator/students">
          <li className={isActive("/educator/students") ? "active" : ""}>
            <span className="material-symbols-outlined">group</span>
            Students
          </li>
        </Link>
        <Link to="/educator/courses">
          <li className={isActive("/educator/courses") ? "active" : ""}>
            <span className="material-symbols-outlined">book</span>
            Content
          </li>
        </Link>
        <Link to="/educator/classroom">
          <li className={isActive("/educator/classroom") ? "active" : ""}>
            <span className="material-symbols-outlined">school</span>
            Classroom
          </li>
        </Link>
        <Link to="/educator/messages">
          <li className={isActive("/educator/messages") ? "active" : ""}>
            <span className="material-symbols-outlined">mail</span>
            Messages
          </li>
        </Link>
      </ul>

      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Profile and Settings */}
      <ul className="sidebar-menu">
        <Link to="/educator/profile">
          <li className={isActive("/educator/profile") ? "active" : ""}>
            <span className="material-symbols-outlined">person</span>
            Profile
          </li>
        </Link>
        <Link to="/educator/settings">
          <li className={isActive("/educator/settings") ? "active" : ""}>
            <span className="material-symbols-outlined">settings</span>
            Settings
          </li>
        </Link>
        <li onClick={handleLogout}>
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
          <p>Teacher</p>
          <span>Educator</span>
        </div>
      </div>
    </div>
  );
};

export default Edu_Sidebar;
