import { useEffect, useState } from 'react';
import '../styles/templates.css';

function Templates() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Récupérer les templates depuis le backend
        const fetchTemplates = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/templates');
                const data = await response.json();
                setTemplates(data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des templates :', error);
                setLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    if (loading) {
        return <div>Chargement des templates...</div>;
    }

    return (
        <div className="templates-container">
            <h1>Choisissez un modèle de CV</h1>
            <div className="templates-grid">
                {templates.map((template) => (
                    <div key={template.id} className="template-card">
                        <img src={`http://localhost:3000${template.preview}`} alt={template.name} />
                        <h3>{template.name}</h3>
                        <button className="btn btn-primary">Utiliser ce modèle</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Templates;