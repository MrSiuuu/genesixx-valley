import React from 'react';
import './ClassicTemplate.css';
import Experience from '../shared/Experience';
import Education from '../shared/Education';
import Certificates from '../shared/Certificates';

const ClassicTemplate = ({ userData, previewMode = false }) => {
  console.log('userData:', userData);
  
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
  const templateClass = `classic-template ${previewMode ? 'preview-mode' : ''}`;

  return (
    <div className={templateClass}>
      <div className="header">
        <h1 className="name">{name || 'Votre Nom'}</h1>
        {title && <h2 className="title">{title}</h2>}
        <div className="contact-info">
          {email && <div className="contact-item">{email}</div>}
          {phone && <div className="contact-item">{phone}</div>}
          {address && <div className="contact-item">{address}</div>}
        </div>
      </div>

      {summary && (
        <div className="section">
          <h2 className="section-title">Profil Professionnel</h2>
          <p className="summary">{summary}</p>
        </div>
      )}

      {experiences && experiences.length > 0 && experiences[0].title && (
        <div className="section">
          <h2 className="section-title">Expérience Professionnelle</h2>
          <div className="timeline">
            {experiences.map((exp, index) => (
              <Experience key={index} experience={exp} />
            ))}
          </div>
        </div>
      )}

      {education && education.length > 0 && education[0].degree && (
        <div className="section">
          <h2 className="section-title">Formation</h2>
          <div className="timeline">
            {education.map((edu, index) => (
              <Education key={index} education={edu} />
            ))}
          </div>
        </div>
      )}

      <div className="two-column-section">
        <div className="column">
          {skills && skills.length > 0 && skills[0].name && (
            <div className="section">
              <h2 className="section-title">Compétences</h2>
              <div className="skills-container">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <span className="skill-name">{skill.name}</span>
                    {skill.level && (
                      <div className="skill-bar">
                        <div 
                          className="skill-level" 
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

        <div className="column">
          {languages && languages.length > 0 && languages[0].name && (
            <div className="section">
              <h2 className="section-title">Langues</h2>
              <div className="languages-container">
                {languages.map((lang, index) => (
                  <div key={index} className="language-item">
                    <span className="language-name">{lang.name}</span>
                    {lang.level && <span className="language-level">{lang.level}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {certificates && certificates.length > 0 && certificates[0].name && (
        <div className="section">
          <h2 className="section-title">Certifications</h2>
          <div className="certificates-grid">
            {certificates.map((cert, index) => (
              <Certificates key={index} certificate={cert} />
            ))}
          </div>
        </div>
      )}

      {projects && projects.length > 0 && projects[0].name && (
        <div className="section">
          <h2 className="section-title">Projets</h2>
          <div className="projects-container">
            {projects.map((project, index) => (
              <div key={index} className="project-item">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="project-technologies">
                    <span className="tech-label">Technologies :</span>
                    <div className="tech-tags">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="footer">
        <p>CV généré avec CV Generator - {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ClassicTemplate;