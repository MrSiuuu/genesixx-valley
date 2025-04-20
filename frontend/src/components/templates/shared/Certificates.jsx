import React from 'react';
import PropTypes from 'prop-types';
import './Shared.css';

const Certificates = ({ certificate }) => {
  if (!certificate) return null;
  
  const { name, issuer, date, url } = certificate;
  
  return (
    <div className="certificate-item">
      <h3 className="certificate-name">{name}</h3>
      <div className="certificate-details">
        <div className="certificate-issuer">{issuer}</div>
        {date && <div className="certificate-date">{date}</div>}
      </div>
      {url && (
        <a href={url} target="_blank" rel="noopener noreferrer" className="certificate-link">
          Voir le certificat
        </a>
      )}
    </div>
  );
};

Certificates.propTypes = {
  certificate: PropTypes.shape({
    name: PropTypes.string.isRequired,
    issuer: PropTypes.string.isRequired,
    date: PropTypes.string,
    url: PropTypes.string
  })
};

export default Certificates;