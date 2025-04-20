import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ClassicTemplate from '../components/templates/classic/ClassicTemplate';
import StudentTemplate from '../components/templates/student/StudentTemplate';
import JobStickerTemplate from '../components/templates/jobsticker/JobStickerTemplate';
import CampusFranceTemplate from '../components/templates/campusfrance/CampusFranceTemplate';
import '../styles/cv-form.css';

const CVForm = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const templateId = queryParams.get('template');

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    photo: '',
    objective: '',
    summary: '',
    experiences: [
      {
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
    education: [
      {
        degree: '',
        school: '',
        year: '',
        location: '',
        description: ''
      }
    ],
    skills: [
      {
        name: '',
        level: 80
      }
    ],
    languages: [
      {
        name: '',
        level: '',
        proficiency: 'Intermediate'
      }
    ],
    certificates: [
      {
        name: '',
        issuer: '',
        date: '',
        url: ''
      }
    ],
    projects: [
      {
        name: '',
        description: '',
        technologies: []
      }
    ]
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    setUserData(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setUserData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const handleSkillChange = (index, field, value) => {
    setUserData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === index ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const handleLanguageChange = (index, field, value) => {
    setUserData(prev => ({
      ...prev,
      languages: prev.languages.map((lang, i) => 
        i === index ? { ...lang, [field]: value } : lang
      )
    }));
  };

  const handleCertificateChange = (index, field, value) => {
    setUserData(prev => ({
      ...prev,
      certificates: prev.certificates.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const handleProjectChange = (index, field, value) => {
    setUserData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const addItem = (section) => {
    setUserData(prev => ({
      ...prev,
      [section]: [...prev[section], getEmptyItem(section)]
    }));
  };

  const removeItem = (section, index) => {
    setUserData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const getEmptyItem = (section) => {
    switch(section) {
      case 'experiences':
        return { title: '', company: '', startDate: '', endDate: '', description: '' };
      case 'education':
        return { degree: '', school: '', year: '', location: '', description: '' };
      case 'skills':
        return { name: '', level: 80 };
      case 'languages':
        return { name: '', level: '', proficiency: 'Intermediate' };
      case 'certificates':
        return { name: '', issuer: '', date: '', url: '' };
      case 'projects':
        return { name: '', description: '', technologies: [] };
      default:
        return {};
    }
  };

  const renderForm = () => (
    <form className="cv-form">
      <div className="form-section">
        <h2>{t('cvForm.personalInfo')}</h2>
        <input
          type="text"
          name="name"
          placeholder={t('cvForm.name')}
          value={userData.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder={t('cvForm.email')}
          value={userData.email}
          onChange={handleInputChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder={t('cvForm.phone')}
          value={userData.phone}
          onChange={handleInputChange}
        />
        {(templateId === 'student-template' || templateId === 'campusfrance-template') && (
          <>
            <input
              type="text"
              name="address"
              placeholder={t('cvForm.address')}
              value={userData.address}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="photo"
              placeholder={t('cvForm.photoUrl')}
              value={userData.photo}
              onChange={handleInputChange}
            />
            <textarea
              name="objective"
              placeholder={t('cvForm.objective')}
              value={userData.objective}
              onChange={handleInputChange}
            />
          </>
        )}
        {templateId === 'jobsticker-template' && (
          <textarea
            name="summary"
            placeholder={t('cvForm.summary')}
            value={userData.summary}
            onChange={handleInputChange}
          />
        )}
      </div>

      <div className="form-section">
        <h2>{t('cvForm.experiences')}</h2>
        {userData.experiences.map((exp, index) => (
          <div key={index} className="experience-form">
            <input
              type="text"
              placeholder={t('cvForm.jobTitle')}
              value={exp.title}
              onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
            />
            <input
              type="text"
              placeholder={t('cvForm.company')}
              value={exp.company}
              onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
            />
            <div className="date-inputs">
              <input
                type="text"
                placeholder={t('cvForm.startDate')}
                value={exp.startDate}
                onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
              />
              <input
                type="text"
                placeholder={t('cvForm.endDate')}
                value={exp.endDate}
                onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
              />
            </div>
            <textarea
              placeholder={t('cvForm.description')}
              value={exp.description}
              onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
            />
            {userData.experiences.length > 1 && (
              <button 
                type="button" 
                className="remove-btn"
                onClick={() => removeItem('experiences', index)}
              >
                {t('cvForm.removeExperience')}
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addItem('experiences')} className="add-btn">
          {t('cvForm.addExperience')}
        </button>
      </div>

      <div className="form-section">
        <h2>{t('cvForm.education')}</h2>
        {userData.education.map((edu, index) => (
          <div key={index} className="education-form">
            <input
              type="text"
              placeholder={t('cvForm.degree')}
              value={edu.degree}
              onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
            />
            <input
              type="text"
              placeholder={t('cvForm.school')}
              value={edu.school}
              onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
            />
            <div className="location-year">
              <input
                type="text"
                placeholder={t('cvForm.year')}
                value={edu.year}
                onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
              />
              <input
                type="text"
                placeholder={t('cvForm.location')}
                value={edu.location}
                onChange={(e) => handleEducationChange(index, 'location', e.target.value)}
              />
            </div>
            <textarea
              placeholder={t('cvForm.description')}
              value={edu.description}
              onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
            />
            {userData.education.length > 1 && (
              <button 
                type="button" 
                className="remove-btn"
                onClick={() => removeItem('education', index)}
              >
                {t('cvForm.removeEducation')}
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addItem('education')} className="add-btn">
          {t('cvForm.addEducation')}
        </button>
      </div>

      <div className="form-section">
        <h2>{t('cvForm.skills')}</h2>
        {userData.skills.map((skill, index) => (
          <div key={index} className="skill-form">
            <input
              type="text"
              placeholder={t('cvForm.skillName')}
              value={skill.name}
              onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={skill.level}
              onChange={(e) => handleSkillChange(index, 'level', parseInt(e.target.value))}
            />
            {userData.skills.length > 1 && (
              <button 
                type="button" 
                className="remove-btn"
                onClick={() => removeItem('skills', index)}
              >
                {t('cvForm.removeSkill')}
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addItem('skills')} className="add-btn">
          {t('cvForm.addSkill')}
        </button>
      </div>

      <div className="form-section">
        <h2>{t('cvForm.languages')}</h2>
        {userData.languages.map((lang, index) => (
          <div key={index} className="language-form">
            <input
              type="text"
              placeholder={t('cvForm.languageName')}
              value={lang.name}
              onChange={(e) => handleLanguageChange(index, 'name', e.target.value)}
            />
            <input
              type="text"
              placeholder={t('cvForm.languageLevel')}
              value={lang.level}
              onChange={(e) => handleLanguageChange(index, 'level', e.target.value)}
            />
            <select
              value={lang.proficiency}
              onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)}
            >
              <option value="Basic">{t('cvForm.basic')}</option>
              <option value="Intermediate">{t('cvForm.intermediate')}</option>
              <option value="Advanced">{t('cvForm.advanced')}</option>
              <option value="Fluent">{t('cvForm.fluent')}</option>
              <option value="Native">{t('cvForm.native')}</option>
            </select>
            {userData.languages.length > 1 && (
              <button 
                type="button" 
                className="remove-btn"
                onClick={() => removeItem('languages', index)}
              >
                {t('cvForm.removeLanguage')}
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addItem('languages')} className="add-btn">
          {t('cvForm.addLanguage')}
        </button>
      </div>

      {(templateId === 'student-template' || templateId === 'campusfrance-template') && (
        <>
          <div className="form-section">
            <h2>{t('cvForm.certificates')}</h2>
            {userData.certificates.map((cert, index) => (
              <div key={index} className="certificate-form">
                <input
                  type="text"
                  placeholder={t('cvForm.certificateName')}
                  value={cert.name}
                  onChange={(e) => handleCertificateChange(index, 'name', e.target.value)}
                />
                <input
                  type="text"
                  placeholder={t('cvForm.issuer')}
                  value={cert.issuer}
                  onChange={(e) => handleCertificateChange(index, 'issuer', e.target.value)}
                />
                <input
                  type="text"
                  placeholder={t('cvForm.date')}
                  value={cert.date}
                  onChange={(e) => handleCertificateChange(index, 'date', e.target.value)}
                />
                <input
                  type="url"
                  placeholder={t('cvForm.certificateUrl')}
                  value={cert.url}
                  onChange={(e) => handleCertificateChange(index, 'url', e.target.value)}
                />
                {userData.certificates.length > 1 && (
                  <button 
                    type="button" 
                    className="remove-btn"
                    onClick={() => removeItem('certificates', index)}
                  >
                    {t('cvForm.removeCertificate')}
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addItem('certificates')} className="add-btn">
              {t('cvForm.addCertificate')}
            </button>
          </div>

          <div className="form-section">
            <h2>{t('cvForm.projects')}</h2>
            {userData.projects.map((project, index) => (
              <div key={index} className="project-form">
                <input
                  type="text"
                  placeholder={t('cvForm.projectName')}
                  value={project.name}
                  onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                />
                <textarea
                  placeholder={t('cvForm.projectDescription')}
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                />
                <input
                  type="text"
                  placeholder={t('cvForm.technologies')}
                  value={project.technologies.join(', ')}
                  onChange={(e) => handleProjectChange(index, 'technologies', e.target.value.split(',').map(tech => tech.trim()))}
                />
                {userData.projects.length > 1 && (
                  <button 
                    type="button" 
                    className="remove-btn"
                    onClick={() => removeItem('projects', index)}
                  >
                    {t('cvForm.removeProject')}
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addItem('projects')} className="add-btn">
              {t('cvForm.addProject')}
            </button>
          </div>
        </>
      )}

      <div className="form-actions">
        <Link to="/templates" className="btn btn-back">
          {t('common.back')}
        </Link>
        <button type="button" onClick={() => setPreviewMode(true)} className="preview-btn">
          {t('cvForm.preview')}
        </button>
      </div>
    </form>
  );

  const renderTemplate = () => {
    switch(templateId) {
      case 'student-template':
        return <StudentTemplate userData={userData} />;
      case 'jobsticker-template':
        return <JobStickerTemplate userData={userData} />;
      case 'campusfrance-template':
        return <CampusFranceTemplate userData={userData} />;
      case 'cv-template':
      default:
        return <ClassicTemplate userData={userData} />;
    }
  };

  return (
    <div className="cv-form-container">
      {previewMode ? (
        <div className="preview-container">
          {renderTemplate()}
          <div className="preview-actions">
            <button onClick={() => setPreviewMode(false)} className="edit-btn">
              {t('cvForm.backToEdit')}
            </button>
            <button className="save-btn">
              {t('cvForm.saveAndDownload')}
            </button>
          </div>
        </div>
      ) : (
        renderForm()
      )}
    </div>
  );
};

export default CVForm;