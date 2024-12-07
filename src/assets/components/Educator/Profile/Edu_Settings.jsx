import React from 'react';
import EduSidebar from '../sidebar/Edu_Sidebar';
import '../../../styles/Educator/Profile/Edu_Settings.css';

const Edu_Settings = () => {
    return (
        <div className="settings-container">
            <EduSidebar />
            <div className="settings-content">
                <h1>Settings</h1>

                <div className="settings-grid">
                    <div className="settings-card">
                        <h2>Main Menu</h2>
                        <div className="settings-item">Dashboard</div>
                        <div className="settings-item">Users</div>
                        <div className="settings-item">Educators</div>
                    </div>

                    <div className="settings-card">
                        <h2>General</h2>
                        <div className="settings-item">Content</div>
                        <div className="settings-item">Classrooms</div>
                    </div>

                    <div className="settings-card">
                        <h2>Account</h2>
                        <div className="settings-item">Profile</div>
                        <div className="settings-item">Notifications</div>
                    </div>
                </div>

                <div className="settings-actions">
                    <button className="btn-save">SAVE CHANGES</button>
                    <button className="btn-recent">BACK TO RECENT UPDATE</button>
                    <button className="btn-default">BACK TO DEFAULT</button>
                </div>
            </div>
        </div>
    );
};

export default Edu_Settings;
