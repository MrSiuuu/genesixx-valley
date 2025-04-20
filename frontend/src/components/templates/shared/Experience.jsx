import React from 'react';
import PropTypes from 'prop-types';

const Experience = ({ experiences }) => {
  return (
    <section className="cv-experiences">
      <h2>Expériences professionnelles</h2>
      <ul>
        {experiences.map((exp, index) => (
          <li key={index}>
            <strong>{exp.title}</strong> - {exp.company} ({exp.startDate} - {exp.endDate})
            <p>{exp.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

Experience.propTypes = {
  experiences: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Experience;