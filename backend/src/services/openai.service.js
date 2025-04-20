const OpenAI = require('openai');

// Configuration de l'API OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Fonction pour formater les expériences professionnelles
const formatExperiences = (experiences) => {
  if (!experiences || !Array.isArray(experiences)) return '';
  
  return experiences.map(exp => 
    `${exp.title} chez ${exp.company} (${exp.startDate} - ${exp.endDate || 'Présent'}): ${exp.description}`
  ).join('\n');
};

// Fonction pour formater les formations
const formatEducation = (education) => {
  if (!education || !Array.isArray(education)) return '';
  
  return education.map(edu => 
    `${edu.degree} à ${edu.school} (${edu.year})`
  ).join('\n');
};

// Définition des prompts selon le ton choisi
const tonePrompts = {
  professional: "Rédigez une lettre de motivation professionnelle et formelle pour un poste correspondant à mon profil. La lettre doit être structurée avec une introduction, un développement et une conclusion.",
  student: "Rédigez une lettre de motivation adaptée à un étudiant ou jeune diplômé, mettant en avant ma formation et mon potentiel plutôt que mon expérience limitée.",
  expert: "Rédigez une lettre de motivation mettant en avant mon expertise approfondie dans mon domaine, avec un ton confiant et des références précises à mes compétences techniques.",
  creative: "Rédigez une lettre de motivation créative et originale qui se démarque, tout en restant professionnelle et pertinente pour le poste.",
  formal: "Rédigez une lettre de motivation très formelle et conventionnelle, respectant strictement les codes de la correspondance professionnelle.",
  dynamic: "Rédigez une lettre de motivation dynamique et énergique, montrant ma motivation et mon enthousiasme pour le poste et l'entreprise."
};

/**
 * Génère une lettre de motivation basée sur les données du CV et le ton choisi
 * @param {Object} userData - Les données du CV de l'utilisateur
 * @param {string} tone - Le ton choisi pour la lettre
 * @returns {Promise<string>} - La lettre de motivation générée
 */
const generateCoverLetter = async (userData, tone) => {
  // Construction du prompt pour l'API
  const prompt = `${tonePrompts[tone] || tonePrompts.professional}

Informations de mon CV:
- Nom: ${userData.name || ''}
- Email: ${userData.email || ''}
- Téléphone: ${userData.phone || ''}
${userData.title ? `- Titre professionnel: ${userData.title}` : ''}
${userData.summary ? `- Résumé professionnel: ${userData.summary}` : ''}
${userData.experiences ? `- Expériences:\n${formatExperiences(userData.experiences)}` : ''}
${userData.education ? `- Formation:\n${formatEducation(userData.education)}` : ''}
${userData.skills ? `- Compétences: ${Array.isArray(userData.skills) ? userData.skills.map(s => typeof s === 'object' ? s.name : s).join(', ') : userData.skills}` : ''}
${userData.languages ? `- Langues: ${Array.isArray(userData.languages) ? userData.languages.map(l => typeof l === 'object' ? `${l.name} (${l.level})` : l).join(', ') : userData.languages}` : ''}

Générez une lettre de motivation complète et bien structurée en français, sans mentionner d'entreprise ou de poste spécifique.`;

  try {
    // Appel à l'API OpenAI avec la nouvelle syntaxe
    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct", // Remplace text-davinci-003 qui est déprécié
      prompt,
      max_tokens: 800,
      temperature: 0.7,
    });

    return completion.choices[0].text.trim();
  } catch (error) {
    console.error('Erreur OpenAI:', error.response?.data || error.message);
    throw new Error('Erreur lors de la génération de la lettre de motivation');
  }
};

module.exports = {
  generateCoverLetter
}; 