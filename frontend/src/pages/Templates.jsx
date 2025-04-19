import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/templates.css';

function Templates() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/templates`);
                
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                
                const data = await response.json();
                setTemplates(data);
            } catch (error) {
                console.error('Erreur lors du chargement des templates:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchTemplates();
    }, []);

    if (loading) {
        return <div className="loading-container">{t('common.loading')}</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>{t('errors.serverError')}</h2>
                <p>{error}</p>
                <Link to="/dashboard" className="btn btn-primary">
                    {t('common.back')}
                </Link>
            </div>
        );
    }

    return (
        <div className="templates-container">
            <header className="templates-header">
                <h1>{t('templates.title')}</h1>
                <Link to="/dashboard" className="btn btn-back">
                    {t('common.back')}
                </Link>
            </header>
            
            <div className="templates-grid">
                {templates.length > 0 ? (
                    templates.map(template => (
                        <div key={template.id} className="template-card">
                            <h3>{template.name}</h3>
                            {template.preview && (
                                <img 
                                    src={`${import.meta.env.VITE_API_URL}${template.preview}`} 
                                    alt={`Aperçu du template ${template.name}`}
                                    className="template-preview"
                                />
                            )}
                            <button className="btn btn-select">
                                {t('templates.select')}
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="no-templates">
                        <p>{t('templates.noTemplates')}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Templates;