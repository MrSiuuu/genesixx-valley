import React from 'react';
import PropTypes from 'prop-types';
import Header from '../shared/Header';
import Education from '../shared/Education';
import Languages from '../shared/Languages';
import Experience from '../shared/Experience';
import Skills from '../shared/Skills';
import './CampusFranceTemplate.css';
import Certificates from '../shared/Certificates';

const CampusFranceTemplate = ({ userData, previewMode = false }) => {
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
  const templateClass = `campusfrance-template ${previewMode ? 'preview-mode' : ''}`;

  return (
    <div className={templateClass}>
      <div className="cf-sidebar">
        <div className="cf-profile">
          <div className="cf-profile-photo">
            {/* Placeholder pour la photo */}
            <div className="cf-photo-placeholder">
              <span>{name ? name.charAt(0) : 'A'}</span>
            </div>
          </div>
          <h1 className="cf-name">{name || 'Votre Nom'}</h1>
          {title && <h2 className="cf-title">{title}</h2>}
        </div>

        <div className="cf-contact-info">
          <h3 className="cf-section-title">Contact</h3>
          <ul className="cf-contact-list">
            {email && (
              <li className="cf-contact-item">
                <span className="cf-contact-label">Email</span>
                <span className="cf-contact-value">{email}</span>
              </li>
            )}
            {phone && (
              <li className="cf-contact-item">
                <span className="cf-contact-label">Téléphone</span>
                <span className="cf-contact-value">{phone}</span>
              </li>
            )}
            {address && (
              <li className="cf-contact-item">
                <span className="cf-contact-label">Adresse</span>
                <span className="cf-contact-value">{address}</span>
              </li>
            )}
          </ul>
        </div>

        <div className="cf-skills-section">
          <h3 className="cf-section-title">Compétences</h3>
          {skills && skills.length > 0 && skills[0].name && (
            <div className="cf-skills-list">
              {skills.map((skill, index) => (
                <div key={index} className="cf-skill-item">
                  <span className="cf-skill-name">{skill.name}</span>
                  <div className="cf-skill-bar">
                    <div 
                      className="cf-skill-level" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="cf-languages-section">
          <h3 className="cf-section-title">Langues</h3>
          {languages && languages.length > 0 && languages[0].name && (
            <div className="cf-languages-list">
              {languages.map((lang, index) => (
                <div key={index} className="cf-language-item">
                  <span className="cf-language-name">{lang.name}</span>
                  <div className="cf-language-level">
                    <span className="cf-language-proficiency">{lang.level}</span>
                    <div className="cf-language-dots">
                      {[1, 2, 3, 4, 5].map((dot) => {
                        let level = 0;
                        switch(lang.level) {
                          case 'Débutant': level = 1; break;
                          case 'Intermédiaire': level = 3; break;
                          case 'Avancé': level = 4; break;
                          case 'Bilingue': level = 5; break;
                          default: level = 0;
                        }
                        return (
                          <span 
                            key={dot} 
                            className={`cf-language-dot ${dot <= level ? 'active' : ''}`}
                          ></span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          )}
        </div>

        {certificates && certificates.length > 0 && certificates[0].name && (
          <div className="cf-certificates-section">
            <h3 className="cf-section-title">Certifications</h3>
            <div className="cf-certificates-list">
              {certificates.map((cert, index) => (
                <div key={index} className="cf-certificate-item">
                  <h4 className="cf-certificate-name">{cert.name}</h4>
                  <div className="cf-certificate-details">
                    <span className="cf-certificate-issuer">{cert.issuer}</span>
                    {cert.date && <span className="cf-certificate-date">{cert.date}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="cf-main-content">
        {summary && (
          <div className="cf-section cf-summary-section">
            <h3 className="cf-main-section-title">Profil</h3>
            <p className="cf-summary">{summary}</p>
          </div>
        )}

        {education && education.length > 0 && education[0].degree && (
          <div className="cf-section cf-education-section">
            <h3 className="cf-main-section-title">Formation</h3>
            <div className="cf-education-list">
              {education.map((edu, index) => (
                <div key={index} className="cf-education-item">
                  <div className="cf-education-header">
                    <div className="cf-education-year-container">
                      <span className="cf-education-year">{edu.year}</span>
                    </div>
                    <div className="cf-education-content">
                      <h4 className="cf-education-degree">{edu.degree}</h4>
                      <div className="cf-education-school">{edu.school}</div>
                      {edu.location && <div className="cf-education-location">{edu.location}</div>}
                      {edu.description && <p className="cf-education-description">{edu.description}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
        )}

        {experiences && experiences.length > 0 && experiences[0].title && (
          <div className="cf-section cf-experience-section">
            <h3 className="cf-main-section-title">Expérience Professionnelle</h3>
            <div className="cf-experience-list">
              {experiences.map((exp, index) => (
                <div key={index} className="cf-experience-item">
                  <div className="cf-experience-header">
                    <div className="cf-experience-date-container">
                      <span className="cf-experience-dates">{exp.startDate} - {exp.endDate || 'Présent'}</span>
                    </div>
                    <div className="cf-experience-content">
                      <h4 className="cf-experience-title">{exp.title}</h4>
                      <div className="cf-experience-company">{exp.company}</div>
                      <p className="cf-experience-description">{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
        )}

        {projects && projects.length > 0 && projects[0].name && (
          <div className="cf-section cf-projects-section">
            <h3 className="cf-main-section-title">Projets Académiques</h3>
            <div className="cf-projects-list">
              {projects.map((project, index) => (
                <div key={index} className="cf-project-item">
                  <h4 className="cf-project-name">{project.name}</h4>
                  <p className="cf-project-description">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="cf-project-technologies">
                      <span className="cf-tech-label">Technologies :</span>
                      <div className="cf-tech-list">
                      {project.technologies.map((tech, i) => (
                          <span key={i} className="cf-tech-item">{tech}</span>
                      ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

CampusFranceTemplate.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    photo: PropTypes.string,
    address: PropTypes.string,
    objective: PropTypes.string,
    education: PropTypes.array.isRequired,
    languages: PropTypes.array.isRequired,
    experiences: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        technologies: PropTypes.arrayOf(PropTypes.string)
      })
    )
  }).isRequired
};

export default CampusFranceTemplate;