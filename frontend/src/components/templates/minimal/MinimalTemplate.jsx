import React from 'react';
import './MinimalTemplate.css';

const MinimalTemplate = ({ userData, previewMode = false }) => {
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
  const templateClass = `minimal-template ${previewMode ? 'preview-mode' : ''}`;

  return (
    <div className={templateClass}>
      <div className="minimal-header">
        <h1 className="minimal-name">{name}</h1>
        {title && <p className="minimal-title">{title}</p>}
        <div className="minimal-contact-info">
          {email && <span className="minimal-contact-item">{email}</span>}
          {phone && <span className="minimal-contact-item">{phone}</span>}
          {address && <span className="minimal-contact-item">{address}</span>}
        </div>
      </div>

      {summary && (
        <div className="minimal-section">
          <h2 className="minimal-section-title">Profil</h2>
          <p className="minimal-summary">{summary}</p>
        </div>
      )}

      {experiences.length > 0 && (
        <div className="minimal-section">
          <h2 className="minimal-section-title">Expérience professionnelle</h2>
          <div className="minimal-experiences-container">
            {experiences.map((exp, index) => (
              <div key={index} className="minimal-experience-item">
                <div className="minimal-experience-header">
                  <h3 className="minimal-experience-title">{exp.title}</h3>
                  <span className="minimal-experience-date">
                    {exp.startDate} - {exp.endDate || 'Présent'}
                  </span>
                </div>
                <p className="minimal-experience-company">{exp.company}</p>
                <p className="minimal-experience-description">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="minimal-section">
          <h2 className="minimal-section-title">Formation</h2>
          <div className="minimal-education-container">
            {education.map((edu, index) => (
              <div key={index} className="minimal-education-item">
                <div className="minimal-education-header">
                  <h3 className="minimal-education-degree">{edu.degree}</h3>
                  <span className="minimal-education-year">{edu.year}</span>
                </div>
                <p className="minimal-education-school">{edu.school}</p>
                {edu.description && (
                  <p className="minimal-education-description">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="minimal-two-columns">
        <div className="minimal-column">
          {skills.length > 0 && (
            <div className="minimal-section">
              <h2 className="minimal-section-title">Compétences</h2>
              <div className="minimal-skills-container">
                {skills.map((skill, index) => (
                  <div key={index} className="minimal-skill-item">
                    <span className="minimal-skill-name">{skill.name}</span>
                    {skill.level && (
                      <div className="minimal-skill-bar">
                        <div 
                          className="minimal-skill-level" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="minimal-column">
          {languages.length > 0 && (
            <div className="minimal-section">
              <h2 className="minimal-section-title">Langues</h2>
              <div className="minimal-languages-container">
                {languages.map((lang, index) => (
                  <div key={index} className="minimal-language-item">
                    <span className="minimal-language-name">{lang.name}</span>
                    {lang.level && (
                      <span className="minimal-language-level">{lang.level}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {certificates.length > 0 && (
        <div className="minimal-section">
          <h2 className="minimal-section-title">Certifications</h2>
          <div className="minimal-certificates-container">
            {certificates.map((cert, index) => (
              <div key={index} className="minimal-certificate-item">
                <h3 className="minimal-certificate-name">{cert.name}</h3>
                <div className="minimal-certificate-details">
                  <span className="minimal-certificate-issuer">{cert.issuer}</span>
                  {cert.date && (
                    <span className="minimal-certificate-date">{cert.date}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="minimal-section">
          <h2 className="minimal-section-title">Projets</h2>
          <div className="minimal-projects-container">
            {projects.map((project, index) => (
              <div key={index} className="minimal-project-item">
                <h3 className="minimal-project-name">{project.name}</h3>
                <p className="minimal-project-description">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="minimal-project-technologies">
                    <span className="minimal-tech-label">Technologies :</span>
                    <div className="minimal-tech-tags">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="minimal-tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="minimal-footer">
        <p>CV généré avec CV Generator - {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default MinimalTemplate; 