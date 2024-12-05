import React from 'react';
import '../../styles/Educator/Edu_Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Edu_Sidebar from './sidebar/Edu_Sidebar';

const Edu_Dashboard = () => {
  const navigate = useNavigate();

  // Sample data - replace with actual data from your backend
  const educatorData = {
    totalStudents: 45,
    courses: [
      { id: 1, name: 'Introduction to ASL 101', studentCount: 15 },
      { id: 2, name: 'Basic Sign Language 101', studentCount: 12 },
      { id: 3, name: 'Introduction to ASL 102', studentCount: 18 }
    ],
    announcements: [
      { id: 1, date: '2024-03-15', message: 'New curriculum updates available for ASL courses' },
      { id: 2, date: '2024-03-14', message: 'Upcoming teacher training session on March 20th' }
    ],
    notifications: [
      { id: 1, type: 'assignment', message: 'New assignment submissions for ASL 101' },
      { id: 2, type: 'message', message: 'Message from student John regarding homework' },
      { id: 3, type: 'grade', message: 'Grades pending review for Basic Sign Language 101' }
    ]
  };

  return (
    <div className="dashboard-container">
      <Edu_Sidebar />
      <div className="main-content">
        <h1 className="dashboard-title">Educator Dashboard</h1>
        
        {/* Top Grid - Key Metrics */}
        <div className="dashboard-grid">
          {/* Student Count Card */}
          <div className="dashboard-card student-count-card">
            <span className="material-symbols-outlined card-icon">groups</span>
            <div className="card-content">
              <h2 className="metric-number">{educatorData.totalStudents}</h2>
              <p className="metric-label">Total Enrolled Students</p>
            </div>
          </div>

          {/* Active Courses Card */}
          <div className="dashboard-card courses-count-card">
            <span className="material-symbols-outlined card-icon">school</span>
            <div className="card-content">
              <h2 className="metric-number">{educatorData.courses.length}</h2>
              <p className="metric-label">Active Courses</p>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <section className="courses-overview">
          <h2 className="section-title">Your Courses</h2>
          <div className="courses-grid">
            {educatorData.courses.map(course => (
              <div key={course.id} className="course-card">
                <h3>{course.name}</h3>
                <p>{course.studentCount} Students</p>
                <button onClick={() => navigate(`/educator/courses/${course.id}`)}>
                  View Course
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Grid */}
        <div className="bottom-grid">
          {/* Announcements */}
          <div className="dashboard-card announcements-card">
            <h2>Hub Announcements</h2>
            <div className="announcements-list">
              {educatorData.announcements.map(announcement => (
                <div key={announcement.id} className="announcement-item">
                  <p className="announcement-date">{announcement.date}</p>
                  <p className="announcement-message">{announcement.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="dashboard-card notifications-card">
            <h2>Recent Notifications</h2>
            <div className="notifications-list">
              {educatorData.notifications.map(notification => (
                <div key={notification.id} className="notification-item">
                  <span className="material-symbols-outlined">
                    {notification.type === 'assignment' ? 'assignment' : 
                     notification.type === 'message' ? 'mail' : 'grade'}
                  </span>
                  <p>{notification.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-card quick-actions-card">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              <button className="action-button add-content-btn" onClick={() => navigate('/educator/content/new')}>
                <span className="material-symbols-outlined">add_circle</span>
                Add New Content
              </button>
              <button className="action-button create-assignment-btn" onClick={() => navigate('/educator/assignments/new')}>
                <span className="material-symbols-outlined">assignment</span>
                Create Assignment
              </button>
              <button className="action-button generate-report-btn" onClick={() => navigate('/educator/reports')}>
                <span className="material-symbols-outlined">assessment</span>
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edu_Dashboard;