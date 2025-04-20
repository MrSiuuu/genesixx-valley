import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import '../styles/templates.css';

// Import preview images
const classicTemplatePreview = `${import.meta.env.VITE_API_URL}/previews/cv-template-preview.png`;
const studentTemplatePreview = `${import.meta.env.VITE_API_URL}/previews/student-template-preview.png`;
const jobstickerTemplatePreview = `${import.meta.env.VITE_API_URL}/previews/jobsticker-template-preview.png`;
const campusfranceTemplatePreview = `${import.meta.env.VITE_API_URL}/previews/campusfrance-template-preview.png`;

function Templates() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [selectedPreview, setSelectedPreview] = useState(null);

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

    const handleViewTemplate = (preview) => {
        setSelectedPreview(preview);
        setPreviewOpen(true);
    };

    const closePreview = () => {
        setPreviewOpen(false);
        setSelectedPreview(null);
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
                                                <div className="template-buttons">
                                                    <button
                                                        className="btn btn-view"
                                                        onClick={() => handleViewTemplate(template.preview)}
                                                    >
                                                        {t('templates.view')}
                                                    </button>
                                                    <button
                                                        className="btn btn-use"
                                                        onClick={() => handleSelectTemplate(template.id)}
                                                    >
                                                        {t('templates.use')}
                                                    </button>
                                                </div>
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

            {/* Preview Modal */}
            {previewOpen && (
                <div className="template-preview-modal">
                    <div className="modal-overlay" onClick={closePreview}></div>
                    <div className="modal-content">
                        <button className="modal-close" onClick={closePreview}>×</button>
                        <div className="modal-body">
                            <img 
                                src={selectedPreview} 
                                alt="Template preview" 
                                className="full-preview-image" 
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Templates;