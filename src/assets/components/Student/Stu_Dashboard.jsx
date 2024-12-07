import React, { useState, useEffect } from 'react';
import '../../styles/Student/Stu_Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Stu_Sidebar from './sidebar/Stu_Sidebar';
import { db } from '../../../firebase/config';
import { collection, query, getDocs } from 'firebase/firestore';

const Stu_Dashboard = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    enrolledCourses: [],
    announcements: [],
    notifications: []
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Get all courses from the specified school
        const coursesQuery = query(
          collection(db, 'schools/7kJvkewDYT1hTRKieGcQ/courses')
        );
        
        const coursesSnapshot = await getDocs(coursesQuery);
        const coursesData = coursesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setStudentData(prev => ({
          ...prev,
          enrolledCourses: coursesData,
          announcements: [
            { id: 1, date: '2024-03-15', message: 'New ASL learning materials available' },
            { id: 2, date: '2024-03-14', message: 'Upcoming virtual ASL practice session' }
          ],
          notifications: [
            { id: 1, type: 'assignment', message: 'New assignment in ASL 101' },
            { id: 2, type: 'message', message: 'Message from your instructor' },
            { id: 3, type: 'grade', message: 'New grade posted for Basic Sign Language 101' }
          ]
        }));
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, []);

  return (
    <div className="dashboard-container">
      <Stu_Sidebar />
      <div className="main-content">
        <h1 className="dashboard-title">Student Dashboard</h1>
        
        {/* Top Grid - Key Metrics */}
        <div className="dashboard-grid">
          {/* Enrolled Courses Card */}
          <div className="dashboard-card courses-count-card">
            <span className="material-symbols-outlined card-icon">school</span>
            <div className="card-content">
              <h2 className="metric-number">{studentData.enrolledCourses.length}</h2>
              <p className="metric-label">Enrolled Courses</p>
            </div>
          </div>

          {/* Progress Card */}
          <div className="dashboard-card progress-card">
            <span className="material-symbols-outlined card-icon">trending_up</span>
            <div className="card-content">
              <h2 className="metric-number">85%</h2>
              <p className="metric-label">Overall Progress</p>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <section className="courses-overview">
          <h2 className="section-title">Your Courses</h2>
          <div className="courses-grid">
            {studentData.enrolledCourses.map(course => (
              <div key={course.id} className="course-card">
                <h3>{course.name}</h3>
                <p>Next class: Today</p>
                <button onClick={() => navigate(`/student/courses/${course.id}`)}>
                  Enter Course
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Grid */}
        <div className="bottom-grid">
          {/* Announcements */}
          <div className="dashboard-card announcements-card">
            <h2>Announcements</h2>
            <div className="announcements-list">
              {studentData.announcements.map(announcement => (
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
              {studentData.notifications.map(notification => (
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
              <button className="action-button join-class-btn" onClick={() => navigate('/student/classroom')}>
                <span className="material-symbols-outlined">video_camera_front</span>
                Join Virtual Class
              </button>
              <button className="action-button view-assignments-btn" onClick={() => navigate('/student/assignments')}>
                <span className="material-symbols-outlined">assignment</span>
                View Assignments
              </button>
              <button className="action-button practice-btn" onClick={() => navigate('/student/practice')}>
                <span className="material-symbols-outlined">school</span>
                Practice ASL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stu_Dashboard;
