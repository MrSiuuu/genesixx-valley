import React from 'react';
import PropTypes from 'prop-types';
import Header from '../shared/Header';
import Experience from '../shared/Experience';
import './ClassicTemplate.css';

const ClassicTemplate = ({ userData }) => {
  return (
    <div className="cv-container">
      <Header 
        name={userData.name}
        email={userData.email}
        phone={userData.phone}
      />
      <main>
        <Experience experiences={userData.experiences} />
      </main>
    </div>
  );
};

ClassicTemplate.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    experiences: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default ClassicTemplate;