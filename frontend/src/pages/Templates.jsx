import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/templates.css';

// Import preview image
const classicTemplatePreview = `${import.meta.env.VITE_API_URL}/previews/cv-template-preview.png`;

function Templates() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const templates = [
        {
            id: 'cv-template',
            name: 'Classic Template',
            preview: classicTemplatePreview,
            description: t('templates.classicDescription')
        }
    ];

    const handleSelectTemplate = (templateId) => {
        navigate(`/cv/create?template=${templateId}`);
    };

    return (
        <div className="templates-container">
            <header className="templates-header">
                <Link to="/dashboard" className="btn btn-back">
                    {t('common.back')}
                </Link>
                <h1>{t('templates.title')}</h1>
            </header>
            
            <div className="templates-grid">
                {templates.map(template => (
                    <div key={template.id} className="template-card">
                        <h3>{template.name}</h3>
                        <div className="template-preview-container">
                            <img 
                                src={template.preview}
                                alt={`${template.name} preview`}
                                className="template-preview"
                            />
                        </div>
                        <p className="template-description">{template.description}</p>
                        <button 
                            className="btn btn-select"
                            onClick={() => handleSelectTemplate(template.id)}
                        >
                            {t('templates.select')}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Templates;