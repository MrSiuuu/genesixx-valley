import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useTranslation } from 'react-i18next';

function AuthCallback() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        setError(error.message);
      }
    };
    
    handleAuthCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="auth-callback-error">
        <h2>{t('auth.authError')}</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/login')} className="btn-primary">
          {t('auth.backToLogin')}
        </button>
      </div>
    );
  }

  return (
    <div className="auth-callback-loading">
      <p>{t('common.loading')}</p>
    </div>
  );
}

export default AuthCallback; 