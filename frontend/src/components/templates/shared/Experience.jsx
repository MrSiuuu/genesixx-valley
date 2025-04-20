import React from 'react';
import PropTypes from 'prop-types';
import './Shared.css';

const Experience = ({ experiences }) => {
  return (
    <section className="cv-experience">
      <h2>Expérience Professionnelle</h2>
      <div className="experience-list">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-header">
              <div className="experience-title-group">
                <h3 className="experience-title">{exp.title}</h3>
                <div className="experience-company">{exp.company}</div>
              </div>
              <div className="experience-dates">
                {exp.startDate} - {exp.endDate || 'Present'}
              </div>
            </div>
            {exp.description && (
              <p className="experience-description">{exp.description}</p>
            )}
            {exp.achievements && exp.achievements.length > 0 && (
              <ul className="experience-achievements">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

Experience.propTypes = {
  experiences: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string,
      description: PropTypes.string,
      achievements: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired
};

export default Experience;