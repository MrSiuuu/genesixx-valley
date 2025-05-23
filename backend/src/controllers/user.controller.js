const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }
    
    // Afficher les métadonnées utilisateur pour déboguer
    console.log('Métadonnées utilisateur:', user.user_metadata);
    
    // Mapping des codes pays vers les noms complets
    const countries = {
      BEN: 'Bénin',
      BFA: 'Burkina Faso',
      CMR: 'Cameroun',
      CPV: 'Cap-Vert',
      TCD: 'Tchad',
      CIV: 'Côte d\'Ivoire',
      GAB: 'Gabon',
      GHA: 'Ghana',
      GIN: 'Guinée',
      GNB: 'Guinée-Bissau',
      MLI: 'Mali',
      MRT: 'Mauritanie',
      NER: 'Niger',
      NGA: 'Nigeria',
      SEN: 'Sénégal',
      TGO: 'Togo'
    };
    
    // Vérifier si l'utilisateur existe dans notre base de données
    const { data: dbUser, error } = await req.supabase
      .from('users')
      .select('*')
      .eq('email', user.email)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = Not found
      throw error;
    }
    
    // Récupérer le code pays et le convertir en nom complet
    const codeCountry = user.user_metadata?.country || dbUser?.country || null;
    const countryName = countries[codeCountry] || codeCountry;  // fallback sur le code si non trouvé
    
    // Si l'utilisateur n'existe pas, le créer
    if (!dbUser) {
      const { data: newUser, error: insertError } = await req.supabase
        .from('users')
        .insert([
          {
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || null,
            country: countryName, // Utiliser le nom complet du pays
            created_at: new Date(),
            updated_at: new Date()
          }
        ])
        .select()
        .single();
      
      if (insertError) throw insertError;
      
      // Synchroniser également avec la table profiles
      const { error: profileError } = await req.supabase
        .from('profiles')
        .upsert([
          {
            id: user.id,
            name: user.user_metadata?.name || null,
            email: user.email,
            country: countryName, // Utiliser le nom complet du pays
            updated_at: new Date()
          }
        ]);
      
      if (profileError) console.error('Erreur lors de la synchronisation du profil:', profileError);
      
      return res.json({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        country: countryName, // Retourner le nom complet du pays
        isAdmin: newUser.email === 'admin@cvgen.com'
      });
    } else {
      // Synchroniser les données entre les métadonnées et la table profiles
      const { error: profileError } = await req.supabase
        .from('profiles')
        .upsert([
          {
            id: user.id,
            name: user.user_metadata?.name || dbUser.name,
            email: user.email,
            country: countryName, // Utiliser le nom complet du pays
            updated_at: new Date()
          }
        ]);
      
      if (profileError) console.error('Erreur lors de la synchronisation du profil:', profileError);
      
      return res.json({
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        country: countryName, // Retourner le nom complet du pays
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