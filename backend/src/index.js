const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');
const { generateCV, generateTemplatePreviews } = require('./controllers/cv.controller');
const routes = require('./routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Créer le client Supabase
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Les variables SUPABASE_URL et SUPABASE_SERVICE_KEY doivent être définies.');
  process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Middleware
app.use(cors());
app.use(express.json());

// Rendre le client Supabase disponible pour les routes
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

// Middleware pour servir les fichiers statiques (aperçus des templates)
app.use('/previews', express.static(path.join(__dirname, 'output/previews')));

// Routes
app.use('/api', routes);

// Route pour générer un CV
app.post('/api/generate-cv', async (req, res) => {
  try {
    const userData = req.body; // Les données utilisateur doivent être envoyées dans le corps de la requête
    console.log('Données utilisateur reçues pour le CV :', userData);

    const pdfPath = await generateCV(userData);
    res.json({ message: 'CV généré avec succès', pdfPath });
  } catch (error) {
    console.error('Erreur lors de la génération du CV :', error);
    res.status(500).json({ error: 'Erreur lors de la génération du CV' });
  }
});

// Route pour générer les aperçus des templates
app.post('/api/generate-previews', async (req, res) => {
  try {
    console.log('Début de la génération des aperçus...');
    await generateTemplatePreviews();
    res.json({ message: 'Aperçus générés avec succès' });
  } catch (error) {
    console.error('Erreur lors de la génération des aperçus :', error);
    res.status(500).json({ error: 'Erreur lors de la génération des aperçus' });
  }
});

// Route pour vérifier les fichiers générés
app.get('/api/files', (req, res) => {
  const outputDir = path.join(__dirname, 'output');
  const previewsDir = path.join(outputDir, 'previews');

  const files = {
    pdfs: fs.existsSync(outputDir) ? fs.readdirSync(outputDir).filter(file => file.endsWith('.pdf')) : [],
    previews: fs.existsSync(previewsDir) ? fs.readdirSync(previewsDir).filter(file => file.endsWith('.png')) : []
  };

  res.json(files);
});




// Route pour récupérer les templates disponibles
app.get('/api/templates', (req, res) => {
  try {
    const templatesDir = path.join(__dirname, 'templates/classic');
    const previewsDir = path.join(__dirname, 'output/previews');

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



// Health check
app.get('/', (req, res) => {
  res.json({ message: 'API CV Generator opérationnelle', version: '1.0.0' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Une erreur interne est survenue.' });
});


// Générer automatiquement les aperçus au démarrage
(async () => {
  try {
    console.log('Génération automatique des aperçus au démarrage...');
    await generateTemplatePreviews();
    console.log('Aperçus générés avec succès au démarrage.');
  } catch (error) {
    console.error('Erreur lors de la génération des aperçus au démarrage :', error);
  }
})();

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});