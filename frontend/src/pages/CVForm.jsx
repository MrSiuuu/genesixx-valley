import React, { useState, useEffect } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ClassicTemplate from '../components/templates/classic/ClassicTemplate';
import JobStickerTemplate from '../components/templates/jobsticker/JobStickerTemplate';
import CampusFranceTemplate from '../components/templates/campusfrance/CampusFranceTemplate';
import CoverLetterGenerator from '../components/CoverLetterGenerator';
import '../styles/cv-form.css';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const CVForm = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { template } = useParams();
  const { user } = useAuth();
  
  const selectedTemplate = template || 
                          (location.search ? new URLSearchParams(location.search).get('template') : 'classic');

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
  const [step, setStep] = useState('form');
  const [coverLetter, setCoverLetter] = useState('');
  const [livePreview, setLivePreview] = useState(true);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [savedResumeId, setSavedResumeId] = useState(null);
  const [savedCoverLetterId, setSavedCoverLetterId] = useState(null);

  useEffect(() => {
    if (step === 'preview') {
      setPreviewMode(true);
    } else {
      setPreviewMode(false);
    }
  }, [step]);

  useEffect(() => {
    console.log('Template parameter:', template);
    console.log('Selected template:', selectedTemplate);
  }, [template, selectedTemplate]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('preview');
  };

  const handleCVComplete = () => {
    setStep('coverLetter');
  };

  const handleCoverLetterComplete = (letter) => {
    setCoverLetter(letter);
    setStep('download');
  };

  const handleSkipCoverLetter = () => {
    setStep('download');
  };

  const handleSaveCV = async () => {
    if (!user) {
      toast.error("Vous devez être connecté pour sauvegarder votre CV");
      return;
    }
    
    try {
      setSaving(true);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cv/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userData,
          templateId: selectedTemplate,
          userId: user.id
        })
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde du CV');
      }
      
      const data = await response.json();
      setSavedResumeId(data.resumeId);
      toast.success('CV sauvegardé avec succès');
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la sauvegarde du CV');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCoverLetter = async () => {
    if (!user) {
      toast.error("Vous devez être connecté pour sauvegarder votre lettre");
      return;
    }
    
    if (!coverLetter) {
      toast.error("Aucune lettre de motivation à sauvegarder");
      return;
    }
    
    try {
      setSaving(true);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cover-letter/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: coverLetter,
          userId: user.id,
          resumeId: savedResumeId
        })
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde de la lettre');
      }
      
      const data = await response.json();
      setSavedCoverLetterId(data.coverLetterId);
      toast.success('Lettre de motivation sauvegardée avec succès');
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la sauvegarde de la lettre');
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadCV = async () => {
    try {
      setDownloading(true);
      
      if (savedResumeId) {
        window.open(`${import.meta.env.VITE_API_URL}/api/cv/download/${savedResumeId}`, '_blank');
      } else {
        await handleSaveCV();
        if (savedResumeId) {
          window.open(`${import.meta.env.VITE_API_URL}/api/cv/download/${savedResumeId}`, '_blank');
        }
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du téléchargement du CV');
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadCoverLetter = async () => {
    if (!coverLetter) {
      toast.error("Aucune lettre de motivation à télécharger");
      return;
    }
    
    try {
      setDownloading(true);
      
      if (savedCoverLetterId) {
        window.open(`${import.meta.env.VITE_API_URL}/api/cover-letter/download/${savedCoverLetterId}`, '_blank');
      } else {
        await handleSaveCoverLetter();
        if (savedCoverLetterId) {
          window.open(`${import.meta.env.VITE_API_URL}/api/cover-letter/download/${savedCoverLetterId}`, '_blank');
        }
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du téléchargement de la lettre');
    } finally {
      setDownloading(false);
    }
  };

  const handleBackToEdit = () => {
    setStep('form');
  };

  const toggleLivePreview = () => {
    setLivePreview(!livePreview);
  };

  const renderForm = () => (
    <form className="cv-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h1>{t('cvForm.title')}</h1>
        <button 
          type="button" 
          className="toggle-preview-btn"
          onClick={toggleLivePreview}
        >
          {livePreview ? t('cvForm.hidePreview') : t('cvForm.showPreview')}
        </button>
      </div>

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
        <textarea
          name="summary"
          placeholder={t('cvForm.summary')}
          value={userData.summary}
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

      <div className="form-actions">
        <Link to="/templates" className="btn btn-back">
          {t('common.back')}
        </Link>
        <button type="submit" className="preview-btn">
          {t('cvForm.preview')}
        </button>
      </div>
    </form>
  );

  const renderTemplate = () => {
    console.log('Rendering template:', selectedTemplate);
    
    const templateId = selectedTemplate.includes('-template') 
      ? selectedTemplate 
      : `${selectedTemplate}-template`;
    
    console.log('Template ID for rendering:', templateId);
    
    switch(templateId) {
      case 'jobsticker-template':
        return <JobStickerTemplate userData={userData} previewMode={step === 'form'} />;
      case 'campusfrance-template':
        return <CampusFranceTemplate userData={userData} previewMode={step === 'form'} />;
      case 'cv-template':
      case 'classic-template':
      default:
        return <ClassicTemplate userData={userData} previewMode={step === 'form'} />;
    }
  };

  return (
    <div className={`cv-form-container ${livePreview ? 'split-view' : ''}`}>
      {step === 'form' && (
        <>
          <div className="form-section-container">
            {renderForm()}
          </div>
          {livePreview && (
            <div className="preview-section-container">
              <div className="preview-header">
                <h2>{t('cvForm.livePreview')}</h2>
                <div className="template-info">
                  Template: {selectedTemplate}
                </div>
              </div>
              <div className="preview-content">
                {renderTemplate()}
              </div>
            </div>
          )}
        </>
      )}
      
      {step === 'preview' && (
        <div className="cv-preview">
          {renderTemplate()}
          <div className="preview-actions">
            <button onClick={handleBackToEdit} className="edit-btn">
              {t('cvForm.backToEdit')}
            </button>
            <button onClick={handleCVComplete} className="continue-btn">
              {t('cvForm.continue')}
            </button>
          </div>
        </div>
      )}
      
      {step === 'coverLetter' && (
        <CoverLetterGenerator 
          userData={userData}
          onComplete={handleCoverLetterComplete}
          onSkip={handleSkipCoverLetter}
        />
      )}
      
      {step === 'download' && (
        <div className="download-section">
          <h2>{t('download.title') || 'Télécharger vos documents'}</h2>
          
          <div className="download-options">
            <div className="download-card">
              <h3>CV</h3>
              <p>{t('download.cvDescription') || 'Téléchargez votre CV au format PDF'}</p>
              <div className="download-actions">
                <button 
                  onClick={handleSaveCV} 
                  disabled={saving}
                  className="btn-save"
                >
                  {saving ? t('common.saving') : t('common.save')}
                </button>
                <button 
                  onClick={handleDownloadCV}
                  disabled={downloading}
                  className="btn-download"
                >
                  {downloading ? t('common.downloading') : t('download.downloadCV')}
                </button>
              </div>
            </div>
            
            {coverLetter && (
              <div className="download-card">
                <h3>{t('coverLetter.title') || 'Lettre de motivation'}</h3>
                <p>{t('download.letterDescription') || 'Téléchargez votre lettre de motivation au format PDF'}</p>
                <div className="download-actions">
                  <button 
                    onClick={handleSaveCoverLetter} 
                    disabled={saving}
                    className="btn-save"
                  >
                    {saving ? t('common.saving') : t('common.save')}
                  </button>
                  <button 
                    onClick={handleDownloadCoverLetter}
                    disabled={downloading}
                    className="btn-download"
                  >
                    {downloading ? t('common.downloading') : t('download.downloadLetter')}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <button onClick={() => setStep('form')} className="btn-new">
            {t('download.createNew') || 'Créer un nouveau CV'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CVForm;