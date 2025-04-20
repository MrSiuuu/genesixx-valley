import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/templates.css';

// Import preview images
const classicTemplatePreview = `${import.meta.env.VITE_API_URL}/previews/cv-template-preview.png`;
const studentTemplatePreview = `${import.meta.env.VITE_API_URL}/previews/student-template-preview.png`;
const jobstickerTemplatePreview = `${import.meta.env.VITE_API_URL}/previews/jobsticker-template-preview.png`;
const campusfranceTemplatePreview = `${import.meta.env.VITE_API_URL}/previews/campusfrance-template-preview.png`;

function Templates() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const templates = [
        {
            id: 'cv-template',
            name: 'Classic Template',
            preview: classicTemplatePreview,
            description: t('templates.classicDescription'),
            category: 'Professional'
        },
        {
            id: 'student-template',
            name: 'Student Template',
            preview: studentTemplatePreview,
            description: t('templates.studentDescription'),
            category: 'Academic'
        },
        {
            id: 'jobsticker-template',
            name: 'Job Sticker',
            preview: jobstickerTemplatePreview,
            description: t('templates.jobstickerDescription'),
            category: 'Professional'
        },
        {
            id: 'campusfrance-template',
            name: 'Campus France',
            preview: campusfranceTemplatePreview,
            description: t('templates.campusfranceDescription'),
            category: 'Academic'
        }
    ];

    const categories = [...new Set(templates.map(template => template.category))];

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

            <div className="templates-content">
                {categories.map(category => (
                    <div key={category} className="template-category">
                        <h2>{category}</h2>
                        <div className="templates-grid">
                            {templates
                                .filter(template => template.category === category)
                                .map(template => (
                                    <div key={template.id} className="template-card">
                                        <div className="template-preview-container">
                                            <img
                                                src={template.preview}
                                                alt={`${template.name} preview`}
                                                className="template-preview"
                                            />
                                            <div className="template-overlay">
                                                <button
                                                    className="btn btn-select"
                                                    onClick={() => handleSelectTemplate(template.id)}
                                                >
                                                    {t('templates.select')}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="template-info">
                                            <h3>{template.name}</h3>
                                            <p className="template-description">{template.description}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Templates;