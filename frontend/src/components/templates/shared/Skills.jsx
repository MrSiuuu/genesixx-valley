import React from 'react';
import PropTypes from 'prop-types';
import './Shared.css';

const Skills = ({ skills }) => {
  return (
    <section className="cv-skills">
      <h2>Compétences</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <span className="skill-name">{skill.name}</span>
            <div className="skill-level">
              <div 
                className="skill-progress"
                style={{ width: `${skill.level}%` }}
                title={`${skill.level}%`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

Skills.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Skills;