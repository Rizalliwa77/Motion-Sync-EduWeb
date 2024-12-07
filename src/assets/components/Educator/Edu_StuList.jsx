import React, { useState, useEffect, useMemo } from 'react';
import EduSidebar from './sidebar/Edu_Sidebar.jsx';
import '../../styles/Educator/Edu_StuList.css';
import { db } from '../../../firebase/config';
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore';

const Edu_StuList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [schoolData, setSchoolData] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const studentsData = [];
        
        // Get school document
        const schoolDoc = await getDoc(doc(db, 'schools/7kJvkewDYT1hTRKieGcQ'));
        const schoolData = schoolDoc.data();
        setSchoolData(schoolData);

        // Get all courses
        const coursesQuery = query(
          collection(db, 'schools/7kJvkewDYT1hTRKieGcQ/courses')
        );
        const coursesSnapshot = await getDocs(coursesQuery);
        
        // For each course, get its students and teacher
        for (const courseDoc of coursesSnapshot.docs) {
          const courseData = courseDoc.data();
          
          // Get teacher data if available
          let teacherData = null;
          if (courseData.teacherId) {
            const teacherDoc = await getDoc(doc(db, 'schools/7kJvkewDYT1hTRKieGcQ/teachers', courseData.teacherId));
            teacherData = teacherDoc.data();
          }
          
          // Get students for this course
          const studentsQuery = query(
            collection(db, `schools/7kJvkewDYT1hTRKieGcQ/courses/${courseDoc.id}/students`)
          );
          const studentsSnapshot = await getDocs(studentsQuery);
          
          studentsSnapshot.docs.forEach(studentDoc => {
            const studentData = studentDoc.data();
            studentsData.push({
              id: studentDoc.id,
              name: studentData.name || 'Unknown',
              email: studentData.email || 'No email',
              course: courseData.name || 'Unknown Course',
              courseCode: courseData.courseCode || 'No code',
              instructor: teacherData ? teacherData.name : (courseData.instructor || 'Unknown Instructor'),
              status: studentData.status || 'Active',
              progress: studentData.progress || 0,
              lastActive: studentData.lastActive || new Date().toISOString(),
              subject: courseData.subject || 'No subject specified'
            });
          });
        }
        
        setStudents(studentsData);
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Get unique courses for filter dropdown
  const courses = useMemo(() => {
    return [...new Set(students.map(student => student.course))];
  }, [students]);

  // Sorting function
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filtered and sorted students
  const filteredStudents = useMemo(() => {
    let filtered = [...students];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply course filter
    if (selectedCourse !== 'all') {
      filtered = filtered.filter(student => student.course === selectedCourse);
    }

    // Apply status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(student => student.status === selectedStatus);
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [students, searchTerm, sortConfig, selectedCourse, selectedStatus]);

  return (
    <div className="edu-stulist-container">
      <EduSidebar />
      <div className="main-content">
        <h1 className="page-title">Student List</h1>

        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <>
            {/* Filters and Search */}
            <div className="controls-container">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="filters">
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="all">All Courses</option>
                  {courses.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Student Table */}
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th onClick={() => handleSort('name')}>Name</th>
                    <th onClick={() => handleSort('email')}>Email</th>
                    <th onClick={() => handleSort('course')}>Course</th>
                    <th onClick={() => handleSort('status')}>Status</th>
                    <th onClick={() => handleSort('progress')}>Progress</th>
                    <th onClick={() => handleSort('lastActive')}>Last Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(student => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.course}</td>
                      <td>
                        <span className={`status-badge ${student.status.toLowerCase()}`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="progress-column">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${student.progress}%` }}
                          />
                          <span>{student.progress}%</span>
                        </div>
                      </td>
                      <td className="date-column">
                        {new Date(student.lastActive).toLocaleDateString()}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="view-btn">View</button>
                          <button className="message-btn">Message</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Edu_StuList;
