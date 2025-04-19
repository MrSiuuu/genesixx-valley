import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Vérification des variables d'environnement
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Les variables d\'environnement Supabase ne sont pas définies');
}

// Configuration de Supabase avec des options supplémentaires
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Vérifier la connexion à Supabase
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase auth event:', event);
});

// Service API pour communiquer avec notre backend
export const apiService = {
  // Récupérer l'utilisateur actuel
  getCurrentUser: async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) return null;
      
      // Utiliser directement les données de l'utilisateur de Supabase
      // au lieu d'appeler l'API backend
      return {
        id: sessionData.session.user.id,
        email: sessionData.session.user.email,
        name: sessionData.session.user.user_metadata?.name || sessionData.session.user.email
      };
    } catch (error) {
      console.error('Erreur API:', error);
      return null;
    }
  }
}; 