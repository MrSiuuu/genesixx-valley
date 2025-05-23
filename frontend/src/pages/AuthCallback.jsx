import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Vérifier si l'utilisateur est connecté
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Vérifier si un profil existe déjà
          const { data: existingProfile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          // Si aucun profil n'existe, en créer un
          if (!existingProfile && !profileError) {
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([
                {
                  id: session.user.id,
                  name: session.user.user_metadata?.name || session.user.email,
                  email: session.user.email,
                  country: session.user.user_metadata?.country || null,
                  created_at: new Date().toISOString()
                }
              ]);
            
            if (insertError) {
              console.error('Erreur lors de la création du profil:', insertError);
            }
          }

          // Rediriger vers le tableau de bord
          navigate('/dashboard');
        } else {
          // Si pas de session, rediriger vers la page de connexion
          navigate('/login');
        }
      } catch (error) {
        console.error('Erreur lors de la redirection après authentification:', error);
        navigate('/login');
      }
    };
    
    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="auth-callback-loading">
      <p>Chargement...</p>
    </div>
  );
}

export default AuthCallback; 