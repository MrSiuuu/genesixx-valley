import React from 'react';
import './ExecutiveTemplate.css';
import '../shared/Shared.css';

const ExecutiveTemplate = ({ userData, previewMode = false }) => {
  const {
    name = '',
    email = '',
    phone = '',
    address = '',
    title = '',
    summary = '',
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    certificates = [],
    projects = []
  } = userData || {};

  // Classe conditionnelle pour l'aperçu
  const templateClass = `executive-template ${previewMode ? 'preview-mode' : ''}`;

  return (
    <div className={templateClass}>
      <div className="exec-header">
        <div className="exec-header-left">
          <h1 className="exec-name">{name || 'Votre Nom'}</h1>
          {title && <h2 className="exec-title">{title}</h2>}
        </div>
        <div className="exec-header-right">
          {email && (
            <div className="exec-contact-item">
              <span className="exec-contact-icon">✉</span>
              <span>{email}</span>
            </div>
          )}
          {phone && (
            <div className="exec-contact-item">
              <span className="exec-contact-icon">📱</span>
              <span>{phone}</span>
            </div>
          )}
          {address && (
            <div className="exec-contact-item">
              <span className="exec-contact-icon">📍</span>
              <span>{address}</span>
            </div>
          )}
        </div>
      </div>

      <div className="exec-divider"></div>

      {summary && (
        <div className="exec-summary">
          <h3 className="exec-section-title">Profil Professionnel</h3>
          <p>{summary}</p>
        </div>
      )}

      <div className="exec-two-columns">
        <div className="exec-main-column">
          {experiences && experiences.length > 0 && experiences[0].title && (
            <div className="exec-section">
              <h3 className="exec-section-title">Expérience Professionnelle</h3>
              {experiences.map((exp, index) => (
                <div key={index} className="exec-experience-item">
                  <div className="exec-experience-header">
                    <h4 className="exec-experience-title">{exp.title}</h4>
                    <span className="exec-experience-dates">{exp.startDate} - {exp.endDate || 'Présent'}</span>
                  </div>
                  <div className="exec-experience-company">{exp.company}</div>
                  <p className="exec-experience-description">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {education && education.length > 0 && education[0].degree && (
            <div className="exec-section">
              <h3 className="exec-section-title">Formation</h3>
              {education.map((edu, index) => (
                <div key={index} className="exec-education-item">
                  <div className="exec-education-header">
                    <h4 className="exec-education-degree">{edu.degree}</h4>
                    <span className="exec-education-year">{edu.year}</span>
                  </div>
                  <div className="exec-education-school">{edu.school}</div>
                  {edu.location && <div className="exec-education-location">{edu.location}</div>}
                  {edu.description && <p className="exec-education-description">{edu.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="exec-side-column">
          {skills && skills.length > 0 && skills[0].name && (
            <div className="exec-section">
              <h3 className="exec-section-title">Compétences</h3>
              <div className="exec-skills-list">
                {skills.map((skill, index) => (
                  <div key={index} className="exec-skill-item">
                    <span className="exec-skill-name">{skill.name}</span>
                    <div className="exec-skill-bar">
                      <div 
                        className="exec-skill-level" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages && languages.length > 0 && languages[0].name && (
            <div className="exec-section">
              <h3 className="exec-section-title">Langues</h3>
              <div className="exec-languages-list">
                {languages.map((lang, index) => (
                  <div key={index} className="exec-language-item">
                    <span className="exec-language-name">{lang.name}</span>
                    <span className="exec-language-level">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certificates && certificates.length > 0 && certificates[0].name && (
            <div className="exec-section">
              <h3 className="exec-section-title">Certifications</h3>
              <div className="exec-certificates-list">
                {certificates.map((cert, index) => (
                  <div key={index} className="exec-certificate-item">
                    <h4 className="exec-certificate-name">{cert.name}</h4>
                    <div className="exec-certificate-details">
                      <span className="exec-certificate-issuer">{cert.issuer}</span>
                      {cert.date && <span className="exec-certificate-date">{cert.date}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="exec-footer">
        <p>CV généré avec CV Generator - {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ExecutiveTemplate; 