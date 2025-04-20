import React from 'react';
import PropTypes from 'prop-types';
import './Shared.css';

const Experience = ({ experience }) => {
  if (!experience) return null;
  
  const { title, company, startDate, endDate, description } = experience;
  
  return (
    <div className="experience-item">
      <div className="experience-header">
        <h3 className="experience-title">{title}</h3>
        <div className="experience-company">{company}</div>
        <div className="experience-date">
          {startDate} - {endDate || 'Présent'}
        </div>
      </div>
      <p className="experience-description">{description}</p>
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.shape({
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string,
    description: PropTypes.string
  })
};

export default Experience;