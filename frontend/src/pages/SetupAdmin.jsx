import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import '../styles/auth.css';

function SetupAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSetupAdmin = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Créer un compte administrateur
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: 'Administrateur'
          }
        }
      });
      
      if (signUpError) throw signUpError;
      
      if (data?.user) {
        // Définir l'utilisateur comme administrateur dans la table profiles
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            email: data.user.email,
            name: 'Administrateur',
            is_admin: true,
            email_confirmed: true,
            created_at: new Date().toISOString()
          });
        
        if (profileError) throw profileError;
        
        setSuccess(true);
        setTimeout(() => {
          navigate('/admin/login');
        }, 3000);
      }
    } catch (error) {
      console.error('Erreur lors de la configuration de l\'administrateur:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Configuration de l'administrateur</h1>
        
        {error && <div className="auth-error">{error}</div>}
        {success && (
          <div className="auth-success">
            Compte administrateur créé avec succès. Redirection vers la page de connexion...
          </div>
        )}
        
        {!success && (
          <form onSubmit={handleSetupAdmin} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email administrateur</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="btn-auth"
              disabled={loading}
            >
              {loading ? 'Configuration...' : 'Configurer l\'administrateur'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default SetupAdmin; 