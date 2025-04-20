const { generateCoverLetter } = require('../services/openai.service');

/**
 * Contrôleur pour générer une lettre de motivation
 */
const generateCoverLetterController = async (req, res) => {
  try {
    const { userData, tone } = req.body;
    
    // Validation des données
    if (!userData || !userData.name) {
      return res.status(400).json({ 
        error: 'Les données utilisateur sont incomplètes' 
      });
    }
    
    if (!tone) {
      return res.status(400).json({ 
        error: 'Le ton de la lettre est requis' 
      });
    }
    
    // Génération de la lettre
    const coverLetter = await generateCoverLetter(userData, tone);
    
    // Réponse
    res.json({ coverLetter });
  } catch (error) {
    console.error('Erreur lors de la génération de la lettre de motivation:', error);
    res.status(500).json({ 
      error: 'Une erreur est survenue lors de la génération de la lettre de motivation' 
    });
  }
};

module.exports = {
  generateCoverLetterController
}; 