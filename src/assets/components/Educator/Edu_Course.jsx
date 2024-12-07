import React, { useState } from 'react';
import EduSidebar from './sidebar/Edu_Sidebar.jsx';
import '../../styles/Educator/Edu_Course.css';

const Edu_Course = () => {
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      title: 'Introduction to ASL 101',
      enrolledStudents: 15,
      completionRate: '65%',
      materials: [
        { id: 1, title: 'Basic ASL Alphabet', type: 'video', duration: '15 mins' },
        { id: 2, title: 'Common Phrases Guide', type: 'document', pages: 12 }
      ],
      tasks: [
        { id: 1, title: 'Practice Exercise 1', type: 'quiz', dueDate: '2024-03-26', status: 'active' },
        { id: 2, title: 'Sign Language Recording', type: 'assignment', dueDate: '2024-03-28', status: 'upcoming' }
      ]
    },
    // ... other courses
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);

  // Add new state for modals
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Add handler functions
  const handleAddMaterial = () => {
    setShowAddMaterialModal(true);
  };

  const handleCreateTask = () => {
    setShowCreateTaskModal(true);
  };

  const handleScheduleClass = () => {
    setShowScheduleModal(true);
  };

  const handleDeleteMaterial = (materialId) => {
    const updatedCourses = courses.map(course => {
      if (course.id === selectedCourse.id) {
        return {
          ...course,
          materials: course.materials.filter(m => m.id !== materialId)
        };
      }
      return course;
    });
    setCourses(updatedCourses);
    setSelectedCourse(updatedCourses.find(c => c.id === selectedCourse.id));
  };

  const handleDeleteTask = (taskId) => {
    const updatedCourses = courses.map(course => {
      if (course.id === selectedCourse.id) {
        return {
          ...course,
          tasks: course.tasks.filter(t => t.id !== taskId)
        };
      }
      return course;
    });
    setCourses(updatedCourses);
    setSelectedCourse(updatedCourses.find(c => c.id === selectedCourse.id));
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  return (
    <div className="edu-course-container">
      <EduSidebar />
      <div className="main-content">
        <h1 className="page-title">Course Manager</h1>

        {/* Quick Actions Bar */}
        <div className="quick-actions-bar">
          <button 
            className="action-btn add-material" 
            disabled={!selectedCourse}
            onClick={handleAddMaterial}
          >
            <span className="material-symbols-outlined">add_circle</span>
            Add Material
          </button>
          <button 
            className="action-btn create-task" 
            disabled={!selectedCourse}
            onClick={handleCreateTask}
          >
            <span className="material-symbols-outlined">assignment</span>
            Create Task
          </button>
          <button 
            className="action-btn schedule-class" 
            disabled={!selectedCourse}
            onClick={handleScheduleClass}
          >
            <span className="material-symbols-outlined">schedule</span>
            Schedule Class
          </button>
        </div>

        {/* Course Selection and Content Area */}
        <div className="course-content-layout">
          {/* Active Courses Sidebar */}
          <div className="courses-sidebar">
            <h2>Active Courses</h2>
            <div className="courses-list">
              {courses.map(course => (
                <div 
                  key={course.id} 
                  className={`course-card ${selectedCourse?.id === course.id ? 'selected' : ''}`}
                  onClick={() => handleCourseClick(course)}
                >
                  <h3>{course.title}</h3>
                  <p>{course.enrolledStudents} Students</p>
                  <p>Completion: {course.completionRate}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Course Content Area */}
          <div className="course-details">
            {selectedCourse ? (
              <>
                <div className="course-header">
                  <h2>{selectedCourse.title}</h2>
                  <p>{selectedCourse.enrolledStudents} Students Enrolled</p>
                </div>

                {/* Learning Materials Section */}
                <div className="section-container">
                  <div className="section-header">
                    <h3>Learning Materials</h3>
                  </div>
                  <div className="materials-list">
                    {selectedCourse.materials.map(material => (
                      <div key={material.id} className="material-card">
                        <div className="material-icon">
                          <span className="material-symbols-outlined">
                            {material.type === 'video' ? 'play_circle' : 'description'}
                          </span>
                        </div>
                        <div className="material-info">
                          <h4>{material.title}</h4>
                          <p>{material.type === 'video' ? `Duration: ${material.duration}` : 
                             `Pages: ${material.pages}`}</p>
                        </div>
                        <div className="material-actions">
                          <button className="icon-btn">
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                          <button 
                            className="icon-btn"
                            onClick={() => handleDeleteMaterial(material.id)}
                          >
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tasks Section */}
                <div className="section-container">
                  <div className="section-header">
                    <h3>Tasks & Assignments</h3>
                  </div>
                  <div className="tasks-list">
                    {selectedCourse.tasks.map(task => (
                      <div key={task.id} className="task-card">
                        <div className="task-icon">
                          <span className="material-symbols-outlined">
                            {task.type === 'quiz' ? 'quiz' : 'assignment'}
                          </span>
                        </div>
                        <div className="task-info">
                          <h4>{task.title}</h4>
                          <p>Due: {task.dueDate}</p>
                          <span className={`status-badge ${task.status}`}>
                            {task.status}
                          </span>
                        </div>
                        <div className="task-actions">
                          <button className="icon-btn">
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                          <button 
                            className="icon-btn"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="no-selection">
                <span className="material-symbols-outlined">touch_app</span>
                <p>Select a course to view and manage its content</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edu_Course;