import React from 'react';
import PropTypes from 'prop-types';
import './Shared.css';

const CustomSection = ({ section }) => {
  if (!section || !section.items || section.items.length === 0 || !section.title) {
    return null;
  }

  return (
    <section className="cv-custom-section">
      <h2>{section.title}</h2>
      <div className="custom-items">
        {section.items.map((item, index) => (
          item.name && (
            <div key={index} className="custom-item">
              <div className="custom-item-header">
                <h3>{item.name}</h3>
                {item.date && <span className="custom-item-date">{item.date}</span>}
              </div>
              {item.description && <p className="custom-item-description">{item.description}</p>}
            </div>
          )
        ))}
      </div>
    </section>
  );
};

CustomSection.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.string
      })
    ).isRequired
  }).isRequired
};

export default CustomSection;
