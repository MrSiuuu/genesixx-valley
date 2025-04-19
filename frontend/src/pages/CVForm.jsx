import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import '../styles/cv-form.css';

function CVForm() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const templateId = queryParams.get('template');
  
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: '',
      title: ''
    },
    education: [{ institution: '', degree: '', date: '', description: '' }],
    experience: [{ company: '', position: '', date: '', description: '' }],
    skills: ['']
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (section, index, field, value) => {
    if (section === 'personalInfo') {
      setFormData({
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          [field]: value
        }
      });
    } else {
      const newData = {...formData};
      newData[section][index][field] = value;
      setFormData(newData);
    }
  };
  
  const handleSkillChange = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData({
      ...formData,
      skills: newSkills
    });
  };
  
  const addItem = (section) => {
    if (section === 'education') {
      setFormData({
        ...formData,
        education: [...formData.education, { institution: '', degree: '', date: '', description: '' }]
      });
    } else if (section === 'experience') {
      setFormData({
        ...formData,
        experience: [...formData.experience, { company: '', position: '', date: '', description: '' }]
      });
    } else if (section === 'skills') {
      setFormData({
        ...formData,
        skills: [...formData.skills, '']
      });
    }
  };
  
  const removeItem = (section, index) => {
    const newData = {...formData};
    newData[section].splice(index, 1);
    setFormData(newData);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cv/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          templateId,
          cvData: formData
        })
      });
      
      if (!response.ok) {
        throw new Error(`Erreur: ${response.status}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cv-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
      navigate('/dashboard', { state: { success: true } });
    } catch (error) {
      console.error('Erreur lors de la génération du CV:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="cv-form-container">
      <h1>{t('cv.createTitle')}</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="cv-form">
        <section>
          <h2>{t('cv.personalInfo')}</h2>
          <div className="form-group">
            <label>{t('cv.fullName')}</label>
            <input 
              type="text" 
              value={formData.personalInfo.fullName}
              onChange={(e) => handleChange('personalInfo', null, 'fullName', e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>{t('cv.email')}</label>
            <input 
              type="email" 
              value={formData.personalInfo.email}
              onChange={(e) => handleChange('personalInfo', null, 'email', e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>{t('cv.phone')}</label>
            <input 
              type="tel" 
              value={formData.personalInfo.phone}
              onChange={(e) => handleChange('personalInfo', null, 'phone', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>{t('cv.address')}</label>
            <input 
              type="text" 
              value={formData.personalInfo.address}
              onChange={(e) => handleChange('personalInfo', null, 'address', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>{t('cv.title')}</label>
            <input 
              type="text" 
              value={formData.personalInfo.title}
              onChange={(e) => handleChange('personalInfo', null, 'title', e.target.value)}
              placeholder={t('cv.titlePlaceholder')}
            />
          </div>
        </section>
        
        <section>
          <h2>{t('cv.education')}</h2>
          {formData.education.map((edu, index) => (
            <div key={index} className="form-section-item">
              <div className="form-group">
                <label>{t('cv.institution')}</label>
                <input 
                  type="text" 
                  value={edu.institution}
                  onChange={(e) => handleChange('education', index, 'institution', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>{t('cv.degree')}</label>
                <input 
                  type="text" 
                  value={edu.degree}
                  onChange={(e) => handleChange('education', index, 'degree', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>{t('cv.date')}</label>
                <input 
                  type="text" 
                  value={edu.date}
                  onChange={(e) => handleChange('education', index, 'date', e.target.value)}
                  placeholder="2018 - 2022"
                />
              </div>
              
              <div className="form-group">
                <label>{t('cv.description')}</label>
                <textarea 
                  value={edu.description}
                  onChange={(e) => handleChange('education', index, 'description', e.target.value)}
                />
              </div>
              
              {formData.education.length > 1 && (
                <button 
                  type="button" 
                  className="btn-remove"
                  onClick={() => removeItem('education', index)}
                >
                  {t('common.remove')}
                </button>
              )}
            </div>
          ))}
          
          <button 
            type="button" 
            className="btn-add"
            onClick={() => addItem('education')}
          >
            {t('cv.addEducation')}
          </button>
        </section>
        
        <section>
          <h2>{t('cv.experience')}</h2>
          {formData.experience.map((exp, index) => (
            <div key={index} className="form-section-item">
              <div className="form-group">
                <label>{t('cv.company')}</label>
                <input 
                  type="text" 
                  value={exp.company}
                  onChange={(e) => handleChange('experience', index, 'company', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>{t('cv.position')}</label>
                <input 
                  type="text" 
                  value={exp.position}
                  onChange={(e) => handleChange('experience', index, 'position', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>{t('cv.date')}</label>
                <input 
                  type="text" 
                  value={exp.date}
                  onChange={(e) => handleChange('experience', index, 'date', e.target.value)}
                  placeholder="Jan 2020 - Present"
                />
              </div>
              
              <div className="form-group">
                <label>{t('cv.description')}</label>
                <textarea 
                  value={exp.description}
                  onChange={(e) => handleChange('experience', index, 'description', e.target.value)}
                />
              </div>
              
              {formData.experience.length > 1 && (
                <button 
                  type="button" 
                  className="btn-remove"
                  onClick={() => removeItem('experience', index)}
                >
                  {t('common.remove')}
                </button>
              )}
            </div>
          ))}
          
          <button 
            type="button" 
            className="btn-add"
            onClick={() => addItem('experience')}
          >
            {t('cv.addExperience')}
          </button>
        </section>
        
        <section>
          <h2>{t('cv.skills')}</h2>
          {formData.skills.map((skill, index) => (
            <div key={index} className="form-group">
              <input 
                type="text" 
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                placeholder={t('cv.skillPlaceholder')}
              />
              
              {formData.skills.length > 1 && (
                <button 
                  type="button" 
                  className="btn-remove-inline"
                  onClick={() => removeItem('skills', index)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
          
          <button 
            type="button" 
            className="btn-add"
            onClick={() => addItem('skills')}
          >
            {t('cv.addSkill')}
          </button>
        </section>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => navigate('/templates')}
          >
            {t('common.back')}
          </button>
          
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? t('common.loading') : t('cv.generate')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CVForm; 