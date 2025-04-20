import React from 'react';
import './JobStickerTemplate.css';
import Experience from '../shared/Experience';
import Education from '../shared/Education';
import Certificates from '../shared/Certificates';

const JobStickerTemplate = ({ userData, previewMode = false }) => {
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
  const templateClass = `jobsticker-template ${previewMode ? 'preview-mode' : ''}`;

  return (
    <div className={templateClass}>
      <div className="js-header">
        <h1 className="js-name">{name || 'Votre Nom'}</h1>
        {title && <h2 className="js-title">{title}</h2>}
        <div className="js-contact-grid">
          {email && (
            <div className="js-contact-item">
              <span className="js-contact-icon">✉</span>
              <span>{email}</span>
            </div>
          )}
          {phone && (
            <div className="js-contact-item">
              <span className="js-contact-icon">📱</span>
              <span>{phone}</span>
            </div>
          )}
          {address && (
            <div className="js-contact-item">
              <span className="js-contact-icon">📍</span>
              <span>{address}</span>
            </div>
          )}
        </div>
      </div>

      <div className="js-content">
        {summary && (
          <div className="js-card js-summary">
            <h2 className="js-card-title">À propos de moi</h2>
            <p className="js-summary-text">{summary}</p>
          </div>
        )}

        <div className="js-two-columns">
          <div className="js-main-column">
            {experiences && experiences.length > 0 && experiences[0].title && (
              <div className="js-card">
                <h2 className="js-card-title">Expérience Professionnelle</h2>
                <div className="js-timeline">
                  {experiences.map((exp, index) => (
                    <div key={index} className="js-timeline-item">
                      <div className="js-timeline-marker"></div>
                      <div className="js-timeline-content">
                        <h3 className="js-timeline-title">{exp.title}</h3>
                        <div className="js-timeline-subtitle">
                          <span className="js-company">{exp.company}</span>
                          <span className="js-dates">{exp.startDate} - {exp.endDate || 'Présent'}</span>
                        </div>
                        <p className="js-description">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {education && education.length > 0 && education[0].degree && (
              <div className="js-card">
                <h2 className="js-card-title">Formation</h2>
                <div className="js-education-list">
                  {education.map((edu, index) => (
                    <div key={index} className="js-education-item">
                      <div className="js-education-header">
                        <h3 className="js-education-degree">{edu.degree}</h3>
                        <span className="js-education-year">{edu.year}</span>
                      </div>
                      <div className="js-education-school">{edu.school}</div>
                      {edu.location && <div className="js-education-location">{edu.location}</div>}
                      {edu.description && <p className="js-education-description">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projects && projects.length > 0 && projects[0].name && (
              <div className="js-card">
                <h2 className="js-card-title">Projets</h2>
                <div className="js-projects-grid">
                  {projects.map((project, index) => (
                    <div key={index} className="js-project-item">
                      <h3 className="js-project-name">{project.name}</h3>
                      <p className="js-project-description">{project.description}</p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="js-project-tech">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="js-tech-tag">{tech}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
          </div>
        )}
      </div>

          <div className="js-side-column">
            {skills && skills.length > 0 && skills[0].name && (
              <div className="js-card">
                <h2 className="js-card-title">Compétences</h2>
                <div className="js-skills-list">
                  {skills.map((skill, index) => (
                    <div key={index} className="js-skill-item">
                      <div className="js-skill-header">
                        <span className="js-skill-name">{skill.name}</span>
                        <span className="js-skill-level-text">{skill.level}%</span>
                      </div>
                      <div className="js-skill-bar">
                        <div 
                          className="js-skill-progress" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {languages && languages.length > 0 && languages[0].name && (
              <div className="js-card">
                <h2 className="js-card-title">Langues</h2>
                <div className="js-languages-list">
                  {languages.map((lang, index) => (
                    <div key={index} className="js-language-item">
                      <span className="js-language-name">{lang.name}</span>
                      <span className="js-language-level">{lang.level}</span>
                    </div>
                  ))}
                </div>
        </div>
            )}

            {certificates && certificates.length > 0 && certificates[0].name && (
              <div className="js-card">
                <h2 className="js-card-title">Certifications</h2>
                <div className="js-certificates-list">
                  {certificates.map((cert, index) => (
                    <div key={index} className="js-certificate-item">
                      <h3 className="js-certificate-name">{cert.name}</h3>
                      <div className="js-certificate-details">
                        <span className="js-certificate-issuer">{cert.issuer}</span>
                        {cert.date && <span className="js-certificate-date">{cert.date}</span>}
                      </div>
                      {cert.url && (
                        <a href={cert.url} target="_blank" rel="noopener noreferrer" className="js-certificate-link">
                          Voir le certificat
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="js-footer">
        <p>CV généré avec CV Generator - {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default JobStickerTemplate;