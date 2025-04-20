import React from 'react';
import PropTypes from 'prop-types';
import './Shared.css';

const Education = ({ education }) => {
  if (!education) return null;
  
  const { degree, school, year, location, description } = education;
  
  return (
    <div className="education-item">
      <div className="education-header">
        <h3 className="education-degree">{degree}</h3>
        <div className="education-school">{school}</div>
        <div className="education-year-location">
          <span>{year}</span>
          {location && <span> • {location}</span>}
        </div>
      </div>
      {description && <p className="education-description">{description}</p>}
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.shape({
    degree: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    location: PropTypes.string,
    description: PropTypes.string
  })
};

export default Education;