const express = require('express');
const { generateCoverLetterController } = require('../controllers/coverLetter.controller');
const router = express.Router();

// Route pour générer une lettre de motivation
router.post('/generate', generateCoverLetterController);

// Sauvegarder une lettre de motivation
router.post('/save', async (req, res) => {
  try {
    const { content, userId, resumeId } = req.body;
    
    if (!content || !userId) {
      return res.status(400).json({ error: 'Données incomplètes' });
    }
    
    // Insérer dans Supabase
    const { data, error } = await req.supabase
      .from('cover_letters')
      .insert({
        user_id: userId,
        resume_id: resumeId || null,
        content,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    
    if (error) throw error;
    
    res.status(201).json({ 
      message: 'Lettre de motivation sauvegardée avec succès',
      coverLetterId: data[0].id
    });
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la lettre de motivation:', error);
    res.status(500).json({ error: 'Erreur lors de la sauvegarde de la lettre de motivation' });
  }
});

// Récupérer les lettres de motivation d'un utilisateur
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const { data, error } = await req.supabase
      .from('cover_letters')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des lettres de motivation:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des lettres de motivation' });
  }
});

// Télécharger une lettre de motivation en PDF
router.get('/download/:coverLetterId', async (req, res) => {
  try {
    const { coverLetterId } = req.params;
    
    // Récupérer les données de la lettre
    const { data: letterData, error: letterError } = await req.supabase
      .from('cover_letters')
      .select('*')
      .eq('id', coverLetterId)
      .single();
    
    if (letterError) throw letterError;
    
    if (!letterData) {
      return res.status(404).json({ error: 'Lettre de motivation non trouvée' });
    }
    
    // Générer le PDF
    const pdfBuffer = await generateCoverLetterPDF(letterData.content);
    
    // Envoyer le PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="lettre-${letterData.id}.pdf"`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Erreur lors du téléchargement de la lettre:', error);
    res.status(500).json({ error: 'Erreur lors du téléchargement de la lettre' });
  }
});

module.exports = router; 