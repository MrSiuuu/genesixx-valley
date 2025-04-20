const express = require('express');
const path = require('path');
const fs = require('fs');
const Template = require('../models/template');

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

// Récupérer les templates par catégorie et sous-catégorie
router.get('/category/:category/subcategory/:subcategory', async (req, res) => {
  try {
    const { category, subcategory } = req.params;
    const { limit, offset } = req.query;
    
    const query = { 
      category, 
      subcategory 
    };
    
    const options = {};
    
    if (limit) {
      options.limit = parseInt(limit);
    }
    
    if (offset) {
      options.offset = parseInt(offset);
    }
    
    const templates = await Template.find(query, null, options);
    const total = await Template.countDocuments(query);
    
    res.json({
      templates,
      total,
      limit: limit ? parseInt(limit) : templates.length,
      offset: offset ? parseInt(offset) : 0
    });
  } catch (error) {
    console.error('Error fetching templates by subcategory:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Récupérer les catégories et sous-catégories disponibles
router.get('/categories', async (req, res) => {
  try {
    const categories = await Template.aggregate([
      {
        $group: {
          _id: {
            category: "$category",
            subcategory: "$subcategory"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.category",
          subcategories: {
            $push: {
              name: "$_id.subcategory",
              count: "$count"
            }
          },
          totalCount: { $sum: "$count" }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          subcategories: 1,
          totalCount: 1
        }
      }
    ]);
    
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;