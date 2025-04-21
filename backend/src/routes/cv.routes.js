const express = require('express');
const { saveCV, getUserCVs } = require('../controllers/cv.controller');
const { protect } = require('../middlewares/auth.middleware');
const { generatePDF } = require('../services/pdf.service');
const path = require('path');
const fs = require('fs');
const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

// // Route to save a CV
// router.post('/', protect, saveCV);

// // Route to get user's CVs
// router.get('/', protect, getUserCVs);


// Route to save a CV
router.post('/', saveCV);

// Route to get user's CVs
router.get('/', getUserCVs);

// Sauvegarder un CV
router.post('/save', async (req, res) => {
  try {
    const { userData, templateId, userId } = req.body;
    
    if (!userData || !templateId || !userId) {
      return res.status(400).json({ error: 'Données incomplètes' });
    }
    
    // Insérer dans Supabase
    const { data, error } = await req.supabase
      .from('resumes')
      .insert({
        user_id: userId,
        template_id: templateId,
        data: userData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select();
    
    if (error) throw error;
    
    // Vérifiez si data existe et contient au moins un élément
    if (!data || data.length === 0) {
      return res.status(500).json({ 
        error: 'Erreur lors de la sauvegarde du CV: Aucune donnée retournée' 
      });
    }
    
    res.status(201).json({ 
      message: 'CV sauvegardé avec succès',
      resumeId: data[0].id
    });
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du CV:', error);
    res.status(500).json({ error: 'Erreur lors de la sauvegarde du CV' });
  }
});

// Récupérer les CV d'un utilisateur
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const { data, error } = await req.supabase
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des CV:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des CV' });
  }
});

// Télécharger un CV en PDF
router.get('/download/:resumeId', async (req, res) => {
  try {
    const { resumeId } = req.params;
    console.log(`Téléchargement du CV ${resumeId}`);
    
    // Récupérer les données du CV
    const { data: resumeData, error: resumeError } = await req.supabase
      .from('resumes')
      .select('*')
      .eq('id', resumeId)
      .single();
    
    if (resumeError) {
      console.error('Erreur Supabase détaillée:', JSON.stringify(resumeError));
      throw resumeError;
    }
    
    if (!resumeData) {
      console.error('CV non trouvé:', resumeId);
      return res.status(404).json({ error: 'CV non trouvé' });
    }
    
    console.log('Données du CV récupérées:', JSON.stringify({
      id: resumeData.id,
      template_id: resumeData.template_id,
      user_id: resumeData.user_id
    }));
    
    // Générer le PDF
    console.log('Génération du PDF avec template:', resumeData.template_id);
    const pdfBuffer = await generatePDF(resumeData.template_id, resumeData.data);
    console.log('PDF généré avec succès, taille:', pdfBuffer.length);
    
    // Envoyer le PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="cv-${resumeData.id}.pdf"`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Erreur détaillée lors du téléchargement du CV:', error);
    res.status(500).json({ error: 'Erreur lors du téléchargement du CV', details: error.message });
  }
});

// Middleware de débogage temporaire
const debugToken = (req, res, next) => {
  console.log('Headers de la requête:', req.headers);
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log('Token reçu:', token);
    // Afficher les 10 premiers caractères du token pour vérifier son format
    console.log('Début du token:', token.substring(0, 10) + '...');
  } else {
    console.log('Pas de header d\'autorisation');
  }
  next();
};

// Route pour supprimer un CV
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Supprimer le CV avec Supabase
    const { error } = await req.supabase
      .from('resumes')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Erreur Supabase:', error);
      return res.status(500).json({ message: 'Erreur lors de la suppression' });
    }
    
    res.status(200).json({ message: 'CV supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du CV:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;