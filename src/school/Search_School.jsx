import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Search_School.css';

const SchoolCard = ({ school }) => {
  const navigate = useNavigate();
  
  return (
    <div className="school-card">
      <img src={school.logo} alt={`${school.name} logo`} className="school-logo" />
      <div className="school-info">
        <h3>{school.name}</h3>
        <p className="school-description">{school.description}</p>
        <div className="contact-info">
          <h4>Contact Information</h4>
          <p><strong>Address:</strong> {school.address}</p>
          <p><strong>Phone:</strong> {school.phone}</p>
          <p><strong>Email:</strong> {school.email}</p>
          <p><strong>Website:</strong> <a href={school.website} target="_blank" rel="noopener noreferrer">{school.website}</a></p>
        </div>
        <button 
          className="enroll-button" 
          onClick={() => navigate(`/enroll/${school.id}`)}
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

const Search_School = () => {
  const sampleSchools = [
    {
      id: 1,
      name: "St. Mary's Academy",
      logo: "src/school/media/St. Mary's Academy.png",
      description: "A prestigious institution with over 50 years of academic excellence. Offering comprehensive K-12 education with focus on STEM and arts integration.",
      address: "123 Education Lane, Metro City, MC 12345",
      phone: "(555) 123-4567",
      email: "admissions@stmarys.edu",
      website: "www.stmarysacademy.edu"
    },
    {
      id: 2,
      name: "Tech Valley Institute",
      logo: "src/school/media/tech valley.png",
      description: "Leading technology-focused institution specializing in computer science, robotics, and digital arts. Features hands-on learning experiences.",
      address: "456 Innovation Drive, Tech City, TC 67890",
      phone: "(555) 234-5678",
      email: "info@techvalley.edu",
      website: "www.techvalleyinstitute.edu"
    },
    {
      id: 3,
      name: "Global International School",
      logo: "src/school/media/Global International School.png",
      description: "International Baccalaureate World School offering multicultural education. Strong emphasis on language learning and cultural exchange programs.",
      address: "789 World View Road, Global City, GC 13579",
      phone: "(555) 345-6789",
      email: "admissions@globalschool.edu",
      website: "www.globalinternational.edu"
    },
  ];

  return (
    <div className="search-school-container">
      <div className="header">
        <img 
          src="/media/EduMode_lanscape.png" 
          alt="EduMode Logo" 
          className="logo"
        />
        <h1>Find Your School</h1>
        <p className="subtitle">Discover accredited schools that are part of MotionSync EduMode</p>
      </div>
      
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search for schools..." 
          className="search-input"
        />
      </div>

      <div className="schools-grid">
        {sampleSchools.map(school => (
          <SchoolCard key={school.id} school={school} />
        ))}
      </div>

      <div className="footer">
        <p>Don't see your school? Contact us to learn about becoming a MotionSync EduMode partner.</p>
      </div>
    </div>
  );
};

export default Search_School;
