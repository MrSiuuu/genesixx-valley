import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TemplateSearch from '../components/TemplateSearch';
import '../styles/templates-page.css';

// Import preview images
const classicTemplatePreview = `${import.meta.env.VITE_API_URL}/previews/cv-template-preview.png`;
const studentTemplatePreview = `${import.meta.env.VITE_API_URL}/previews/student-template-preview.png`;
const jobstickerTemplatePreview = `${import.meta.env.VITE_API_URL}/previews/jobsticker-template-preview.png`;
const campusfranceTemplatePreview = `${import.meta.env.VITE_API_URL}/previews/campusfrance-template-preview.png`;

const Templates = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [selectedPreview, setSelectedPreview] = useState(null);
    const [filteredTemplates, setFilteredTemplates] = useState([]);
    const [isFiltering, setIsFiltering] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [expandedSubcategories, setExpandedSubcategories] = useState({});

    const templates = [
        // Templates professionnels existants
        {
            id: 'cv-template',
            name: 'Classic Template',
            preview: classicTemplatePreview,
            description: t('templates.classicDescription', 'Un modèle élégant et professionnel adapté à tous les secteurs'),
            category: 'professional',
            subcategory: 'classic',
            keywords: ['professionnel', 'classique', 'traditionnel', 'sobre']
        },
        {
            id: 'jobsticker-template',
            name: 'Job Sticker',
            preview: jobstickerTemplatePreview,
            description: t('templates.jobstickerDescription', 'Moderne et dynamique, idéal pour les professionnels créatifs'),
            category: 'professional',
            subcategory: 'creative',
            keywords: ['travail', 'emploi', 'travailleur']
        },
        
        // Templates professionnels supplémentaires
        {
            id: 'executive-template',
            name: 'Executive Pro',
            preview: classicTemplatePreview, // Utiliser la même image pour le test
            description: 'Template premium pour cadres supérieurs et dirigeants',
            category: 'professional',
            subcategory: 'executive',
            keywords: ['cadre', 'dirigeant', 'management', 'leadership']
        },
        {
            id: 'tech-template',
            name: 'Tech Innovator',
            preview: jobstickerTemplatePreview, // Utiliser la même image pour le test
            description: 'Design moderne pour les professionnels de la tech',
            category: 'professional',
            subcategory: 'tech',
            keywords: ['technologie', 'développeur', 'ingénieur', 'IT']
        },
        {
            id: 'finance-template',
            name: 'Finance Expert',
            preview: classicTemplatePreview, // Utiliser la même image pour le test
            description: 'Template sobre et élégant pour les professionnels de la finance',
            category: 'professional',
            subcategory: 'finance',
            keywords: ['finance', 'banque', 'comptabilité', 'investissement']
        },
        {
            id: 'marketing-template',
            name: 'Marketing Guru',
            preview: jobstickerTemplatePreview, // Utiliser la même image pour le test
            description: 'CV créatif pour les spécialistes du marketing et de la communication',
            category: 'professional',
            subcategory: 'marketing',
            keywords: ['marketing', 'communication', 'digital', 'créatif']
        },
        {
            id: 'legal-template',
            name: 'Legal Professional',
            preview: classicTemplatePreview, // Utiliser la même image pour le test
            description: 'Template formel pour les professionnels du droit',
            category: 'professional',
            subcategory: 'legal',
            keywords: ['juridique', 'avocat', 'droit', 'légal']
        },
        
        // Templates académiques existants
        {
            id: 'student-template',
            name: 'Student Template',
            preview: studentTemplatePreview,
            description: t('templates.studentDescription', 'Parfait pour les étudiants et jeunes diplômés'),
            category: 'academic',
            subcategory: 'student',
            keywords: ['étudiant', 'école', 'études']
        },
        {
            id: 'campusfrance-template',
            name: 'Campus France',
            preview: campusfranceTemplatePreview,
            description: t('templates.campusfranceDescription', 'Spécialement conçu pour les candidatures Campus France'),
            category: 'academic',
            subcategory: 'campus-france',
            keywords: ['campus', 'université', 'études']
        },
        
        // Templates académiques supplémentaires
        {
            id: 'research-template',
            name: 'Research Scholar',
            preview: studentTemplatePreview, // Utiliser la même image pour le test
            description: 'Idéal pour les chercheurs et universitaires',
            category: 'academic',
            subcategory: 'research',
            keywords: ['recherche', 'doctorat', 'publication', 'académique']
        },
        {
            id: 'teaching-template',
            name: 'Teaching Professional',
            preview: campusfranceTemplatePreview, // Utiliser la même image pour le test
            description: 'Parfait pour les enseignants et formateurs',
            category: 'academic',
            subcategory: 'teaching',
            keywords: ['enseignement', 'professeur', 'formation', 'éducation']
        },
        {
            id: 'phd-template',
            name: 'PhD Candidate',
            preview: studentTemplatePreview, // Utiliser la même image pour le test
            description: 'Spécialement conçu pour les doctorants',
            category: 'academic',
            subcategory: 'phd',
            keywords: ['doctorat', 'thèse', 'recherche', 'université']
        },
        {
            id: 'scholarship-template',
            name: 'Scholarship Application',
            preview: campusfranceTemplatePreview, // Utiliser la même image pour le test
            description: 'Optimisé pour les demandes de bourses d\'études',
            category: 'academic',
            subcategory: 'scholarship',
            keywords: ['bourse', 'financement', 'études', 'international']
        },
        {
            id: 'internship-template',
            name: 'Internship Seeker',
            preview: studentTemplatePreview, // Utiliser la même image pour le test
            description: 'Parfait pour les recherches de stages',
            category: 'academic',
            subcategory: 'internship',
            keywords: ['stage', 'alternance', 'étudiant', 'expérience']
        },
        
        // Ajout d'une nouvelle catégorie : Creative
        {
            id: 'designer-template',
            name: 'Designer Portfolio',
            preview: jobstickerTemplatePreview, // Utiliser la même image pour le test
            description: 'CV créatif pour les designers et artistes',
            category: 'creative',
            subcategory: 'design',
            keywords: ['design', 'graphisme', 'portfolio', 'créatif']
        },
        {
            id: 'artist-template',
            name: 'Artist Showcase',
            preview: jobstickerTemplatePreview, // Utiliser la même image pour le test
            description: 'Mettez en valeur vos créations artistiques',
            category: 'creative',
            subcategory: 'art',
            keywords: ['art', 'artiste', 'portfolio', 'créatif']
        },
        {
            id: 'photographer-template',
            name: 'Photographer CV',
            preview: jobstickerTemplatePreview, // Utiliser la même image pour le test
            description: 'Template visuel pour les photographes',
            category: 'creative',
            subcategory: 'photography',
            keywords: ['photographie', 'portfolio', 'visuel', 'créatif']
        },
        {
            id: 'writer-template',
            name: 'Writer\'s Resume',
            preview: classicTemplatePreview, // Utiliser la même image pour le test
            description: 'Élégant et minimaliste pour les écrivains et rédacteurs',
            category: 'creative',
            subcategory: 'writing',
            keywords: ['écriture', 'rédaction', 'auteur', 'contenu']
        },
        {
            id: 'multimedia-template',
            name: 'Multimedia Producer',
            preview: jobstickerTemplatePreview, // Utiliser la même image pour le test
            description: 'Pour les professionnels de l\'audiovisuel et du multimédia',
            category: 'creative',
            subcategory: 'multimedia',
            keywords: ['vidéo', 'audio', 'production', 'multimédia']
        }
    ];

    // Fonction pour filtrer les templates
    const handleSearch = (searchTerm, category) => {
        if (!searchTerm && category === 'all') {
            setIsFiltering(false);
            return;
        }

        setIsFiltering(true);
        
        const filtered = templates.filter(template => {
            const matchesSearch = searchTerm === '' || 
                template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
            
            const matchesCategory = category === 'all' || template.category === category;
            
            return matchesSearch && matchesCategory;
        });
        
        setFilteredTemplates(filtered);
    };

    // Obtenir les templates à afficher
    const displayTemplates = isFiltering ? filteredTemplates : templates;
    
    // Obtenir les catégories uniques des templates à afficher
    const categories = [...new Set(displayTemplates.map(template => template.category))];

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

    // Fonction pour basculer l'expansion d'une catégorie
    const toggleCategory = (category) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    // Fonction pour basculer l'expansion d'une sous-catégorie
    const toggleSubcategory = (category, subcategory) => {
        const key = `${category}-${subcategory}`;
        setExpandedSubcategories(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    // Obtenir les sous-catégories uniques pour une catégorie
    const getSubcategories = (category) => {
        return [...new Set(
            displayTemplates
                .filter(t => t.category === category)
                .map(t => t.subcategory)
        )];
    };

    // Obtenir les templates pour une sous-catégorie
    const getTemplatesBySubcategory = (category, subcategory) => {
        return displayTemplates.filter(t => 
            t.category === category && t.subcategory === subcategory
        );
    };

    return (
        <div className="templates-container">
            <header className="templates-header">
                <Link to="/dashboard" className="btn btn-back">
                    {t('common.back')}
                </Link>
                <h1>{t('templates.title')}</h1>
            </header>

            <TemplateSearch onSearch={handleSearch} />

            <div className="templates-content">
                {categories.length > 0 ? (
                    <>
                        <div className="categories-actions">
                            <button 
                                className="view-all-categories-btn"
                                onClick={() => {
                                    // Basculer l'état d'expansion de toutes les catégories
                                    const allExpanded = Object.values(expandedCategories).every(v => v);
                                    const newState = {};
                                    categories.forEach(cat => {
                                        newState[cat] = !allExpanded;
                                    });
                                    setExpandedCategories(newState);
                                }}
                            >
                                {Object.values(expandedCategories).every(v => v) 
                                    ? t('templates.collapseAll', 'Réduire toutes les catégories') 
                                    : t('templates.expandAll', 'Voir toutes les catégories')
                                }
                            </button>
                        </div>
                        
                        {categories.map(category => {
                            const templatesInCategory = displayTemplates.filter(t => t.category === category);
                            const isExpanded = expandedCategories[category];
                            const displayCount = isExpanded ? templatesInCategory.length : Math.min(2, templatesInCategory.length);
                            
                            return (
                                <div key={category} className="template-category">
                                    <div className="category-header">
                                        <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                                        <button 
                                            className="toggle-btn"
                                            onClick={() => toggleCategory(category)}
                                        >
                                            {isExpanded 
                                                ? t('templates.collapse', 'Réduire') 
                                                : t('templates.viewAll', 'Voir tous') + ` (${templatesInCategory.length})`
                                            }
                                        </button>
                                    </div>
                                    
            <div className="templates-grid">
                                        {templatesInCategory
                                            .slice(0, displayCount)
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
                                                                <Link 
                                                                    to={`/cv/create/${template.id}`} 
                                                                    className="btn btn-use"
                                                                >
                                                                    {t('templates.use')}
                                                                </Link>
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
                            );
                        })}
                    </>
                ) : (
                    <div className="no-results">
                        <p>{t('search.noResults', 'Aucun résultat trouvé')}</p>
                    </div>
                )}
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
};

export default Templates;