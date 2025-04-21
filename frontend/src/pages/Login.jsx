import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useTranslation } from 'react-i18next';
import '../styles/auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://localhost:5173/dashboard'
        }
      });
      
      if (error) throw error;
      
      // La redirection est gérée par Supabase, pas besoin d'appeler navigate ici
    } catch (error) {
      console.error('Erreur de connexion avec Google:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{t('auth.loginTitle')}</h1>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">{t('common.email')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">{t('common.password')}</label>
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
            {loading ? t('common.loading') : t('common.login')}
          </button>
        </form>
        
        <div className="auth-divider">
          <span>{t('auth.orContinueWith')}</span>
        </div>
        
        <button 
          onClick={handleGoogleLogin} 
          className="btn-google"
          disabled={loading}
        >
          <img src="/google-icon.svg" alt="Google" className="google-icon" />
          {t('auth.loginWithGoogle')}
        </button>
        
        <div className="auth-links">
          <Link to="/register" className="auth-link">
            {t('auth.dontHaveAccount')}
          </Link>
          <Link to="/forgot-password" className="auth-link">
            {t('auth.forgotPassword')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login; 