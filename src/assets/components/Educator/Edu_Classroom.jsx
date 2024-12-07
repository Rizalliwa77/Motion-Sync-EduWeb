import React, { useState, useEffect } from 'react';
import EduSidebar from './sidebar/Edu_Sidebar.jsx';
import '../../styles/Educator/Edu_Classroom.css';
import { db } from '../../../firebase/config';
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore';

const Edu_Classroom = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [schoolData, setSchoolData] = useState(null);

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        // Get school document
        const schoolDoc = await getDoc(doc(db, 'schools/7kJvkewDYT1hTRKieGcQ'));
        const schoolData = schoolDoc.data();
        setSchoolData(schoolData);

        // Get all courses in the school
        const coursesQuery = query(
          collection(db, 'schools/7kJvkewDYT1hTRKieGcQ/courses')
        );
        const coursesSnapshot = await getDocs(coursesQuery);
        
        const coursesData = await Promise.all(coursesSnapshot.docs.map(async (courseDoc) => {
          const courseData = courseDoc.data();
          
          // Get enrolled students for each course
          const studentsQuery = query(
            collection(db, `schools/7kJvkewDYT1hTRKieGcQ/courses/${courseDoc.id}/students`)
          );
          const studentsSnapshot = await getDocs(studentsQuery);
          
          // Get teacher data if available
          let teacherData = null;
          if (courseData.teacherId) {
            const teacherDoc = await getDoc(doc(db, 'schools/7kJvkewDYT1hTRKieGcQ/teachers', courseData.teacherId));
            teacherData = teacherDoc.data();
          }
          
          return {
            id: courseDoc.id,
            name: courseData.name || 'Unnamed Course',
            description: courseData.description || 'No description available',
            instructor: teacherData ? teacherData.name : (courseData.instructor || 'Unknown Instructor'),
            schedule: courseData.schedule || 'Schedule not set',
            enrolledCount: studentsSnapshot.size,
            subject: courseData.subject || 'No subject specified',
            teacherEmail: teacherData ? teacherData.email : null,
            courseCode: courseData.courseCode || 'No code'
          };
        }));
        
        setCourses(coursesData);
        if (coursesData.length > 0) {
          setSelectedCourse(coursesData[0]);
          fetchStudentsForCourse(coursesData[0].id);
        }
        
      } catch (error) {
        console.error('Error fetching school data:', error);
      }
    };

    fetchSchoolData();
  }, []);

  // Fetch students for selected course
  const fetchStudentsForCourse = async (courseId) => {
    try {
      setLoading(true);
      const studentsQuery = query(
        collection(db, `schools/7kJvkewDYT1hTRKieGcQ/courses/${courseId}/students`)
      );
      const studentsSnapshot = await getDocs(studentsQuery);
      
      const studentsData = studentsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || 'Unknown Student',
          dateModified: data.lastModified || new Date().toISOString(),
          description: data.status || 'Active Student',
          grade: data.grade || 'N/A',
          attendance: data.attendance || '0%',
          lastActivity: data.lastActivity || 'Never'
        };
      });
      
      setStudents(studentsData);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const handleCourseChange = (event) => {
    const course = courses.find(c => c.name === event.target.value);
    setSelectedCourse(course);
    if (course) {
      fetchStudentsForCourse(course.id);
    }
  };

  return (
    <div className="edu-classroom-container">
      <EduSidebar />
      <div className="classroom-content">
        <div className="course-selection">
          <label htmlFor="course-select">Select Course:</label>
          <select id="course-select" onChange={handleCourseChange} value={selectedCourse?.name}>
            {courses.map(course => (
              <option key={course.name} value={course.name}>{course.name}</option>
            ))}
          </select>
        </div>
        <div className="course-info">
          <div className="course-header">
            <h1 className="course-title">{selectedCourse?.name}</h1>
            <div className="course-stats">
              <span>{selectedCourse?.enrolledCount} Students</span>
              <span>{selectedCourse?.schedule}</span>
            </div>
          </div>
          <p className="course-description">{selectedCourse?.description}</p>
          <p className="course-instructor">Instructor: {selectedCourse?.instructor}</p>
        </div>

        <div className="student-section">
          <h2 className="section-title">Students Enrolled</h2>
          <div className="student-list">
            <div className="student-list-header">
              <span>Name</span>
              <span>Grade</span>
              <span>Attendance</span>
              <span>Last Activity</span>
              <span>Status</span>
            </div>
            {students.map(student => (
              <div 
                key={student.id} 
                className={`student-item ${selectedStudent?.id === student.id ? 'selected' : ''}`}
                onClick={() => handleStudentClick(student)}
              >
                <div className="student-info">
                  <div className="student-icon"></div>
                  <span>{student.name}</span>
                </div>
                <span className="grade">{student.grade}</span>
                <span>{student.attendance}</span>
                <span>{student.lastActivity}</span>
                <span className="status">{student.description}</span>
              </div>
            ))}
          </div>
        </div>

        {selectedStudent && (
          <div className="student-details">
            <div className="student-profile">
              <div className="profile-header">
                <div className="student-icon large"></div>
                <div>
                  <h2>{selectedStudent.name}</h2>
                  <p>{selectedStudent.description}</p>
                </div>
              </div>
              <div className="profile-stats">
                <div className="stat-item">
                  <label>Grade</label>
                  <span>{selectedStudent.grade}</span>
                </div>
                <div className="stat-item">
                  <label>Attendance</label>
                  <span>{selectedStudent.attendance}</span>
                </div>
              </div>
            </div>
            <div className="student-activities">
              <div className="activity-card">
                <h3>Recent Activity</h3>
                <p>Last active: {selectedStudent.lastActivity}</p>
                <button className="view-details-btn">View Full Activity Log</button>
              </div>
              <div className="activity-card">
                <h3>Performance Overview</h3>
                <p>Current Grade: {selectedStudent.grade}</p>
                <button className="view-details-btn">View Detailed Report</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Edu_Classroom;
