import React from 'react';
import PropTypes from 'prop-types';
import Header from '../shared/Header';
import Experience from '../shared/Experience';
import Skills from '../shared/Skills';
import Education from '../shared/Education';
import Languages from '../shared/Languages';
import './JobStickerTemplate.css';

const JobStickerTemplate = ({ userData }) => {
  return (
    <div className="jobsticker-container">
      <div className="jobsticker-header">
        <Header 
          name={userData.name}
          email={userData.email}
          phone={userData.phone}
        />
        {userData.summary && (
          <div className="summary-section">
            <p>{userData.summary}</p>
          </div>
        )}
      </div>

      <div className="jobsticker-grid">
        <div className="main-content">
          <Experience experiences={userData.experiences} />
          <Education education={userData.education} />
        </div>
        
        <div className="side-content">
          <div className="sticky-sidebar">
            <Skills skills={userData.skills} />
            <Languages languages={userData.languages} />
          </div>
        </div>
      </div>
    </div>
  );
};

JobStickerTemplate.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    summary: PropTypes.string,
    experiences: PropTypes.array.isRequired,
    education: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    languages: PropTypes.array.isRequired
  }).isRequired
};

export default JobStickerTemplate;