import React, { useState } from 'react';
import StuSidebar from '../sidebar/Stu_Sidebar';
import '../../../styles/Student/Profile/Stu_Settings.css';

const Stu_Settings = () => {
    const [settings, setSettings] = useState({
        notifications: {
            email: true,
            push: true,
            sms: false
        },
        privacy: {
            showProfile: true,
            showActivity: true,
            showGrades: false
        },
        accessibility: {
            highContrast: false,
            largeText: false,
            screenReader: false
        },
        language: 'english'
    });

    const handleNotificationChange = (type) => {
        setSettings(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [type]: !prev.notifications[type]
            }
        }));
    };

    const handlePrivacyChange = (type) => {
        setSettings(prev => ({
            ...prev,
            privacy: {
                ...prev.privacy,
                [type]: !prev.privacy[type]
            }
        }));
    };

    const handleAccessibilityChange = (type) => {
        setSettings(prev => ({
            ...prev,
            accessibility: {
                ...prev.accessibility,
                [type]: !prev.accessibility[type]
            }
        }));
    };

    const handleLanguageChange = (e) => {
        setSettings(prev => ({
            ...prev,
            language: e.target.value
        }));
    };

    return (
        <div className="settings-container">
            <StuSidebar />
            <div className="settings-content">
                <h1>Settings</h1>

                <div className="settings-grid">
                    <div className="settings-card">
                        <h3>Notification Settings</h3>
                        <div className="settings-options">
                            <label className="setting-option">
                                <input
                                    type="checkbox"
                                    checked={settings.notifications.email}
                                    onChange={() => handleNotificationChange('email')}
                                />
                                Email Notifications
                            </label>
                            <label className="setting-option">
                                <input
                                    type="checkbox"
                                    checked={settings.notifications.push}
                                    onChange={() => handleNotificationChange('push')}
                                />
                                Push Notifications
                            </label>
                            <label className="setting-option">
                                <input
                                    type="checkbox"
                                    checked={settings.notifications.sms}
                                    onChange={() => handleNotificationChange('sms')}
                                />
                                SMS Notifications
                            </label>
                        </div>
                    </div>

                    <div className="settings-card">
                        <h3>Privacy Settings</h3>
                        <div className="settings-options">
                            <label className="setting-option">
                                <input
                                    type="checkbox"
                                    checked={settings.privacy.showProfile}
                                    onChange={() => handlePrivacyChange('showProfile')}
                                />
                                Show Profile to Others
                            </label>
                            <label className="setting-option">
                                <input
                                    type="checkbox"
                                    checked={settings.privacy.showActivity}
                                    onChange={() => handlePrivacyChange('showActivity')}
                                />
                                Show Activity Status
                            </label>
                            <label className="setting-option">
                                <input
                                    type="checkbox"
                                    checked={settings.privacy.showGrades}
                                    onChange={() => handlePrivacyChange('showGrades')}
                                />
                                Show Grades to Classmates
                            </label>
                        </div>
                    </div>

                    <div className="settings-card">
                        <h3>Accessibility</h3>
                        <div className="settings-options">
                            <label className="setting-option">
                                <input
                                    type="checkbox"
                                    checked={settings.accessibility.highContrast}
                                    onChange={() => handleAccessibilityChange('highContrast')}
                                />
                                High Contrast Mode
                            </label>
                            <label className="setting-option">
                                <input
                                    type="checkbox"
                                    checked={settings.accessibility.largeText}
                                    onChange={() => handleAccessibilityChange('largeText')}
                                />
                                Large Text
                            </label>
                            <label className="setting-option">
                                <input
                                    type="checkbox"
                                    checked={settings.accessibility.screenReader}
                                    onChange={() => handleAccessibilityChange('screenReader')}
                                />
                                Screen Reader Support
                            </label>
                        </div>
                    </div>

                    <div className="settings-card">
                        <h3>Language</h3>
                        <div className="settings-options">
                            <select 
                                value={settings.language}
                                onChange={handleLanguageChange}
                                className="language-select"
                            >
                                <option value="english">English</option>
                                <option value="spanish">Spanish</option>
                                <option value="french">French</option>
                                <option value="german">German</option>
                            </select>
                        </div>
                    </div>

                    <div className="settings-card">
                        <h3>Account Actions</h3>
                        <div className="settings-options">
                            <button className="action-button update">Save Changes</button>
                            <button className="action-button delete">Delete Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stu_Settings;
