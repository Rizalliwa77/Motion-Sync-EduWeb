import React from 'react';
import EduSidebar from '../sidebar/Edu_Sidebar';
import '../../../styles/Educator/Profile/Edu_Profile.css';

const Edu_Profile = () => {
    return (
        <div className="profile-container">
            <EduSidebar />
            <div className="profile-content">
                <h1>Profile</h1>
                
                <div className="profile-header">
                    <div className="profile-info">
                        <img src="/path/to/default-avatar.png" alt="Profile" className="profile-avatar" />
                        <div className="profile-text">
                            <h2>Juan Dela Cruz</h2>
                            <span className="role">Hub Admin</span>
                        </div>
                    </div>
                </div>

                <div className="profile-grid">
                    <div className="profile-card">
                        <h3>Contact Information</h3>
                        {/* Add contact info content */}
                    </div>

                    <div className="profile-card">
                        <h3>Work Information</h3>
                        {/* Add work info content */}
                    </div>

                    <div className="profile-card">
                        <h3>Skills & Languages</h3>
                        {/* Add skills content */}
                    </div>

                    <div className="profile-card">
                        <h3>Education & Certifications</h3>
                        {/* Add education content */}
                    </div>

                    <div className="profile-card">
                        <h3>Recent Activity</h3>
                        {/* Add recent activity content */}
                    </div>

                    <div className="profile-card">
                        <h3>Current Projects</h3>
                        {/* Add projects content */}
                    </div>

                    <div className="profile-card">
                        <h3>Performance</h3>
                        {/* Add performance content */}
                    </div>

                    <div className="profile-card">
                        <h3>Training & Development</h3>
                        {/* Add training content */}
                    </div>

                    <div className="profile-card">
                        <h3>Social Media</h3>
                        {/* Add social media content */}
                    </div>

                    <div className="profile-card">
                        <h3>Actions</h3>
                        {/* Add actions content */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edu_Profile;
