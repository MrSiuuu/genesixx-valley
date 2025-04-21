// CV Controller
// This will handle CV-related operations like saving, updating, and retrieving CVs

const saveCV = async (req, res) => {
  try {
    const { user, supabase } = req;
    const cvData = req.body;

    // TODO: Implement CV saving logic with Supabase
    res.status(501).json({ message: 'Not implemented yet' });
  } catch (error) {
    console.error('Error saving CV:', error);
    res.status(500).json({ error: 'Failed to save CV' });
  }
};

const getUserCVs = async (req, res) => {
  try {
    const { user, supabase } = req;

    // TODO: Implement CV retrieval logic with Supabase
    res.status(501).json({ message: 'Not implemented yet' });
  } catch (error) {
    console.error('Error retrieving CVs:', error);
    res.status(500).json({ error: 'Failed to retrieve CVs' });
  }
};

const deleteCV = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Vérifier si le CV appartient à l'utilisateur et le supprimer avec Supabase
    const { data, error } = await req.supabase
      .from('resumes')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      console.error('Erreur Supabase:', error);
      return res.status(500).json({ message: 'Erreur lors de la suppression' });
    }

    res.status(200).json({ message: 'CV supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du CV:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  saveCV,
  getUserCVs,
  deleteCV
};