const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }
    
    // Vérifier si l'utilisateur existe dans notre base de données
    const { data: dbUser, error } = await req.supabase
      .from('users')
      .select('*')
      .eq('email', user.email)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = Not found
      throw error;
    }
    
    // Si l'utilisateur n'existe pas, le créer
    if (!dbUser) {
      const { data: newUser, error: insertError } = await req.supabase
        .from('users')
        .insert([
          {
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || null,
            created_at: new Date(),
            updated_at: new Date()
          }
        ])
        .select()
        .single();
      
      if (insertError) throw insertError;
      
      return res.json({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        isAdmin: newUser.email === 'admin@cvgen.com'
      });
    } else {
      return res.json({
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        isAdmin: dbUser.email === 'admin@cvgen.com'
      });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  getCurrentUser
}; 