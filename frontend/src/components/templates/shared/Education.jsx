import React from 'react';
import PropTypes from 'prop-types';
import './Shared.css';

const Education = ({ education }) => {
  return (
    <section className="cv-education">
      <h2>Formation</h2>
      <div className="education-list">
        {education.map((edu, index) => (
          <div key={index} className="education-item">
            <div className="education-header">
              <h3>{edu.degree}</h3>
              <div className="education-year">{edu.year}</div>
            </div>
            <div className="education-school">
              {edu.school}
              {edu.location && (
                <span className="education-location">
                  • {edu.location}
                </span>
              )}
            </div>
            {edu.description && (
              <p className="education-description">{edu.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

Education.propTypes = {
  education: PropTypes.arrayOf(
    PropTypes.shape({
      degree: PropTypes.string.isRequired,
      school: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
      location: PropTypes.string,
      description: PropTypes.string
    })
  ).isRequired
};

export default Education;