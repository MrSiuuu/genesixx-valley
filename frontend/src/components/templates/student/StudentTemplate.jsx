import React from 'react';
import PropTypes from 'prop-types';
import Header from '../shared/Header';
import Education from '../shared/Education';
import Experience from '../shared/Experience';
import Skills from '../shared/Skills';
import Languages from '../shared/Languages';
import Projects from '../shared/Projects';
import Certificates from '../shared/Certificates';
import './StudentTemplate.css';

const StudentTemplate = ({ userData }) => {
  return (
    <div className="student-template">
      <Header
        name={userData.name}
        email={userData.email}
        phone={userData.phone}
        address={userData.address}
        photo={userData.photo}
      />
      
      {userData.objective && (
        <section className="objective-section">
          <h2>Objectif</h2>
          <p>{userData.objective}</p>
        </section>
      )}

      <div className="main-content">
        <div className="left-column">
          <Education education={userData.education} />
          <Projects projects={userData.projects} />
          <Experience experiences={userData.experiences} />
        </div>
        
        <div className="right-column">
          <Skills skills={userData.skills} />
          <Languages languages={userData.languages} />
          <Certificates certificates={userData.certificates} />
        </div>
      </div>
    </div>
  );
};

StudentTemplate.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string,
    photo: PropTypes.string,
    objective: PropTypes.string,
    education: PropTypes.arrayOf(
      PropTypes.shape({
        degree: PropTypes.string.isRequired,
        school: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        location: PropTypes.string,
        description: PropTypes.string
      })
    ).isRequired,
    experiences: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string,
        description: PropTypes.string,
        achievements: PropTypes.arrayOf(PropTypes.string)
      })
    ).isRequired,
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired
      })
    ).isRequired,
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        level: PropTypes.string.isRequired,
        proficiency: PropTypes.string.isRequired
      })
    ).isRequired,
    certificates: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        issuer: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        url: PropTypes.string
      })
    ).isRequired,
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        technologies: PropTypes.arrayOf(PropTypes.string)
      })
    ).isRequired
  }).isRequired
};

export default StudentTemplate;