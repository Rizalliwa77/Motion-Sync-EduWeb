import React from "react";
import { useNavigate } from "react-router-dom";
import "./Edu_Sidebar.css";

const Edu_Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    navigate('/');
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
        <li>
          <span className="material-symbols-outlined">dashboard</span>
          Dashboard
        </li>
        <li>
          <span className="material-symbols-outlined">group</span>
          Students
        </li>
        <li>
          <span className="material-symbols-outlined">book</span>
          Content
        </li>
        <li>
          <span className="material-symbols-outlined">school</span>
          Classroom
        </li>
        <li>
          <span className="material-symbols-outlined">mail</span>
          Messages
        </li>
      </ul>

      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Profile and Settings */}
      <ul className="sidebar-menu">
        <li>
          <span className="material-symbols-outlined">person</span>
          Profile
        </li>
        <li>
          <span className="material-symbols-outlined">settings</span>
          Settings
        </li>
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
