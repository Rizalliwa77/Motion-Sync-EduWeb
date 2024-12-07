import React from 'react';
import StuSidebar from '../sidebar/Stu_Sidebar';
import '../../../styles/Student/Profile/Stu_Profile.css';

const Stu_Profile = () => {
    return (
        <div className="profile-container">
            <StuSidebar />
            <div className="profile-content">
                <h1>Profile</h1>
                
                <div className="profile-header">
                    <div className="profile-info">
                        <img src="/path/to/default-avatar.png" alt="Profile" className="profile-avatar" />
                        <div className="profile-text">
                            <h2>John Smith</h2>
                            <span className="role">Student</span>
                        </div>
                    </div>
                </div>

                <div className="profile-grid">
                    <div className="profile-card">
                        <h3>Personal Information</h3>
                        {/* Add personal info content */}
                    </div>

                    <div className="profile-card">
                        <h3>Academic Information</h3>
                        {/* Add academic info content */}
                    </div>

                    <div className="profile-card">
                        <h3>Current Courses</h3>
                        {/* Add current courses content */}
                    </div>

                    <div className="profile-card">
                        <h3>Progress & Grades</h3>
                        {/* Add progress content */}
                    </div>

                    <div className="profile-card">
                        <h3>Recent Activity</h3>
                        {/* Add recent activity content */}
                    </div>

                    <div className="profile-card">
                        <h3>Assignments</h3>
                        {/* Add assignments content */}
                    </div>

                    <div className="profile-card">
                        <h3>Attendance</h3>
                        {/* Add attendance content */}
                    </div>

                    <div className="profile-card">
                        <h3>Learning Goals</h3>
                        {/* Add learning goals content */}
                    </div>

                    <div className="profile-card">
                        <h3>Communication Preferences</h3>
                        {/* Add communication preferences content */}
                    </div>

                    <div className="profile-card">
                        <h3>Account Settings</h3>
                        {/* Add account settings content */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stu_Profile;
