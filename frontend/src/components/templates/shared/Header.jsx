import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ name, email, phone }) => {
  return (
    <header className="cv-header">
      <h1>{name}</h1>
      <p>Email : {email}</p>
      <p>Téléphone : {phone}</p>
    </header>
  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

export default Header;