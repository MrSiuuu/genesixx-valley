import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/templates-page.css';

const TemplatesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="templates-container">
      <h1 className="templates-title">{t('templates.title')}</h1>
      
      <div className="templates-grid">
        <div className="template-card">
          <div className="template-preview">
            {/* Image de prévisualisation du template */}
            <img src="/templates/classic-preview.png" alt="Template Classique" />
          </div>
          <div className="template-info">
            <h3>Template Classique</h3>
            <p>{t('templates.classicDescription')}</p>
            <div className="template-actions">
              <Link to="/cv/create?template=cv-template" className="use-template-btn">
                {t('templates.use')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage; 