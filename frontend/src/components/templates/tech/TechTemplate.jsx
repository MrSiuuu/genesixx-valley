import React from 'react';
import PropTypes from 'prop-types';
import './TechTemplate.css';

const TechTemplate = ({ userData, previewMode = false }) => {
  const {
    name = '',
    title = '',
    summary = '',
    experiences = [],
    education = [],
    skills = [],
    email = '',
    phone = '',
    address = '',
    awards = [],
    photo = ''
  } = userData || {};

  const initial = name?.charAt(0).toUpperCase() || 'A';
  const templateClass = `tech-template ${previewMode ? 'preview-mode' : ''}`;

  return (
    <div className={templateClass}>
      <div className="tech-banner">
        <div className="tech-name-title">
          <h1 className="tech-name">{name}</h1>
          <p className="tech-title">{title}</p>
        </div>
        <div className="tech-photo">
          {photo ? <img src={photo} alt="profile" /> : <div className="tech-photo-placeholder">{initial}</div>}
        </div>
      </div>

      <div className="tech-layout">
        <div className="tech-left">
          {summary && (
            <section className="tech-section">
              <h3 className="tech-section-title">Personal Profile</h3>
              <p className="tech-summary">{summary}</p>
            </section>
          )}

          {experiences.length > 0 && (
            <section className="tech-section">
              <h3 className="tech-section-title">Work Experience</h3>
              {experiences.map((exp, index) => (
                <div key={index} className="tech-box">
                  <h4>{exp.title}</h4>
                  <p className="tech-muted">{exp.company} | {exp.startDate} - {exp.endDate || 'Present'}</p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section className="tech-section">
              <h3 className="tech-section-title">Educational History</h3>
              {education.map((edu, index) => (
                <div key={index} className="tech-box">
                  <h4>{edu.degree}</h4>
                  <p className="tech-muted">{edu.school} | {edu.year}</p>
                  <p>{edu.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="tech-right">
          <section className="tech-section">
            <h3 className="tech-section-title">Contact Me At</h3>
            <ul className="tech-list">
              {phone && <li>📞 {phone}</li>}
              {email && <li>✉ {email}</li>}
              {address && <li>📍 {address}</li>}
            </ul>
          </section>

          {skills.length > 0 && (
            <section className="tech-section">
              <h3 className="tech-section-title">Skills Summary</h3>
              <ul className="tech-list">
                {skills.map((s, i) => <li key={i}>{s.name}</li>)}
              </ul>
            </section>
          )}

          {awards.length > 0 && (
            <section className="tech-section">
              <h3 className="tech-section-title">Awards Received</h3>
              <ul className="tech-list">
                {awards.map((a, i) => (
                  <li key={i}><strong>{a.name}</strong><br /><span className="tech-muted">{a.issuer} ({a.year})</span></li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

TechTemplate.propTypes = {
  userData: PropTypes.object.isRequired,
  previewMode: PropTypes.bool
};

export default TechTemplate;
