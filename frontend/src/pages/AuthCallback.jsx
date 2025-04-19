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