import React from 'react';
import PropTypes from 'prop-types';
import Header from '../shared/Header';
import Education from '../shared/Education';
import Languages from '../shared/Languages';
import Experience from '../shared/Experience';
import Skills from '../shared/Skills';
import './CampusFranceTemplate.css';

const CampusFranceTemplate = ({ userData }) => {
  return (
    <div className="campusfrance-container">
      <div className="campusfrance-header">
        <div className="header-content">
          {userData.photo && (
            <img src={userData.photo} alt="Profile" className="profile-photo" />
          )}
          <div className="header-info">
            <Header 
              name={userData.name}
              email={userData.email}
              phone={userData.phone}
            />
            {userData.address && (
              <p className="address">{userData.address}</p>
            )}
          </div>
        </div>
        {userData.objective && (
          <div className="objective-section">
            <h2>Objectif académique</h2>
            <p>{userData.objective}</p>
          </div>
        )}
      </div>

      <div className="campusfrance-content">
        <div className="main-section">
          <Education education={userData.education} />
          <Languages languages={userData.languages} />
        </div>

        <div className="secondary-section">
          <Experience experiences={userData.experiences} />
          <Skills skills={userData.skills} />
        </div>

        {userData.projects && (
          <div className="projects-section">
            <h2>Projets académiques</h2>
            <div className="projects-grid">
              {userData.projects.map((project, index) => (
                <div key={index} className="project-item">
                  <h3>{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  {project.technologies && (
                    <div className="project-tech">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

CampusFranceTemplate.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    photo: PropTypes.string,
    address: PropTypes.string,
    objective: PropTypes.string,
    education: PropTypes.array.isRequired,
    languages: PropTypes.array.isRequired,
    experiences: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        technologies: PropTypes.arrayOf(PropTypes.string)
      })
    )
  }).isRequired
};

export default CampusFranceTemplate;