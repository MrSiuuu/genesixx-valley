const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Route pour récupérer les templates disponibles
router.get('/templates', (req, res) => {
    try {
        const templatesDir = path.join(__dirname, '../templates');
        const previewsDir = path.join(__dirname, '../output/previews');

        // Vérifier si le dossier des templates existe
        if (!fs.existsSync(templatesDir)) {
            console.error(`Le dossier des templates est introuvable : ${templatesDir}`);
            return res.status(404).json({ error: 'Le dossier des templates est introuvable.' });
        }

        // Vérifier si le dossier des aperçus existe
        if (!fs.existsSync(previewsDir)) {
            console.error(`Le dossier des aperçus est introuvable : ${previewsDir}`);
            return res.status(404).json({ error: 'Le dossier des aperçus est introuvable.' });
        }

        // Lister les templates disponibles
        const templates = fs.readdirSync(templatesDir)
            .filter(file => file.endsWith('.html'))
            .map(file => {
                const templateName = file.replace('.html', '');
                const previewPath = `/previews/${templateName}-preview.png`;

                return {
                    id: templateName, // Utiliser le nom du fichier comme ID
                    name: templateName, // Nom du template
                    preview: previewPath // Chemin de l'aperçu
                };
            });

        if (templates.length === 0) {
            console.log('Aucun template HTML trouvé dans le dossier des templates.');
            return res.status(404).json({ error: 'Aucun template disponible.' });
        }

        res.json(templates);
    } catch (error) {
        console.error('Erreur lors de la récupération des templates :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des templates.' });
    }
});

module.exports = router;