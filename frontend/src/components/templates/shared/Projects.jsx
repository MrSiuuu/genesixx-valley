import React from 'react';
import PropTypes from 'prop-types';
import './Shared.css';

const Projects = ({ projects }) => {
  return (
    <section className="cv-projects">
      <h2>Projets Académiques</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-item">
            <div className="project-header">
              <h3>{project.name}</h3>
            </div>
            <p className="project-description">{project.description}</p>
            {project.technologies && project.technologies.length > 0 && (
              <div className="project-technologies">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="technology-tag">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

Projects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      technologies: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired
};

export default Projects;