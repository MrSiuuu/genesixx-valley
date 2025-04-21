import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
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
    <div className="auth-page">
      <div className="auth-return-link">
        <Link to="/" className="return-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          {t('common.home')}
        </Link>
      </div>
      <div>
        <LanguageSwitcher />
      </div>
      
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-logo">
            <Link to="/">
              <span className="logo-text"><span className="logo-gradient">Genesixx</span> Valley</span>
            </Link>
          </div>
          
          <h1>{t('login.title')}</h1>
          <p className="auth-description">{t('login.subtitle')}</p>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">{t('common.email')}</label>
              <input
                type="email"
                id="email"
                className="form-control"
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
                className="form-control"
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
              {loading ? t('common.loading') : t('login.submit')}
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
            {t('login.googleLogin')}
          </button>
          
          <div className="auth-links">
            <Link to="/register" className="auth-link">
              {t('login.noAccount')} <span>{t('login.register')}</span>
            </Link>
            <Link to="/forgot-password" className="auth-link">
              {t('auth.forgotPassword')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;