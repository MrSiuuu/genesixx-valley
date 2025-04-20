import React from 'react';
import PropTypes from 'prop-types';
import './Shared.css';

const Certificates = ({ certificates }) => {
  return (
    <section className="cv-certificates">
      <h2>Certifications</h2>
      <div className="certificates-grid">
        {certificates.map((cert, index) => (
          <div key={index} className="certificate-item">
            <div className="certificate-header">
              <h3>{cert.name}</h3>
              <span className="certificate-date">{cert.date}</span>
            </div>
            <div className="certificate-issuer">{cert.issuer}</div>
            {cert.url && (
              <a 
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-link"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="certificate-icon"
                  width="16"
                  height="16"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Voir le certificat
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

Certificates.propTypes = {
  certificates: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      issuer: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      url: PropTypes.string
    })
  ).isRequired
};

export default Certificates;