import React from 'react';
import PropTypes from 'prop-types';
import './Shared.css';

const getProficiencyPercentage = (proficiency) => {
  const levels = {
    'Basic': 20,
    'Intermediate': 40,
    'Advanced': 60,
    'Fluent': 80,
    'Native': 100
  };
  return levels[proficiency] || 40;
};

const Languages = ({ languages }) => {
  return (
    <section className="cv-languages">
      <h2>Langues</h2>
      <div className="languages-grid">
        {languages.map((language, index) => (
          <div key={index} className="language-item">
            <span className="language-name">{language.name}</span>
            <div className="language-level-container">
              <span className="language-level">{language.level}</span>
              <div className="language-proficiency">
                <div 
                  className="proficiency-bar"
                  style={{ 
                    width: `${getProficiencyPercentage(language.proficiency)}%` 
                  }}
                  title={language.proficiency}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

Languages.propTypes = {
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
      proficiency: PropTypes.oneOf([
        'Basic',
        'Intermediate',
        'Advanced',
        'Fluent',
        'Native'
      ]).isRequired
    })
  ).isRequired
};

export default Languages;