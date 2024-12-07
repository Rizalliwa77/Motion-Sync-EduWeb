import React, { useState, useEffect } from 'react';
import StuSidebar from './sidebar/Stu_Sidebar.jsx';
import '../../styles/Student/Stu_Classroom.css';
import { db } from '../../../firebase/config';
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore';

const Stu_Classroom = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Get student document (replace with actual student ID)
        const studentDoc = await getDoc(doc(db, 'students/YOUR_STUDENT_ID'));
        const studentData = studentDoc.data();
        setStudentData(studentData);

        // Get enrolled courses for the student
        const coursesQuery = query(
          collection(db, 'schools/7kJvkewDYT1hTRKieGcQ/courses')
        );
        const coursesSnapshot = await getDocs(coursesQuery);
        
        const coursesData = await Promise.all(coursesSnapshot.docs.map(async (courseDoc) => {
          const courseData = courseDoc.data();
          
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
            subject: courseData.subject || 'No subject specified',
            teacherEmail: teacherData ? teacherData.email : null,
            courseCode: courseData.courseCode || 'No code'
          };
        }));
        
        setCourses(coursesData);
        if (coursesData.length > 0) {
          setSelectedCourse(coursesData[0]);
        }
        
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const handleCourseChange = (event) => {
    const course = courses.find(c => c.name === event.target.value);
    setSelectedCourse(course);
  };

  return (
    <div className="stu-classroom-container">
      <StuSidebar />
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
              <span>{selectedCourse?.schedule}</span>
            </div>
          </div>
          <p className="course-description">{selectedCourse?.description}</p>
          <p className="course-instructor">Instructor: {selectedCourse?.instructor}</p>
        </div>

        {/* Rest of your existing classroom components (video grid, controls, etc.) */}
      </div>
    </div>
  );
};

export default Stu_Classroom;
