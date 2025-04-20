import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ClassicTemplate from '../components/templates/classic/ClassicTemplate';
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
    experiences: [
      {
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
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

  const addExperience = () => {
    setUserData(prev => ({
      ...prev,
      experiences: [...prev.experiences, {
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    }));
  };

  const removeExperience = (index) => {
    setUserData(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index)
    }));
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
                onClick={() => removeExperience(index)}
              >
                {t('cvForm.removeExperience')}
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addExperience} className="add-btn">
          {t('cvForm.addExperience')}
        </button>
      </div>

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