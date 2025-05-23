import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import '../styles/auth.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Liste des pays codée en dur (même liste que dans CountrySelectionModal)
  const countries = [
    { code: 'BEN', name: 'Bénin' },
    { code: 'BFA', name: 'Burkina Faso' },
    { code: 'CMR', name: 'Cameroun' },
    { code: 'CPV', name: 'Cap-Vert' },
    { code: 'TCD', name: 'Tchad' },
    { code: 'CIV', name: 'Côte d\'Ivoire' },
    { code: 'GAB', name: 'Gabon' },
    { code: 'GHA', name: 'Ghana' },
    { code: 'GIN', name: 'Guinée' },
    { code: 'GNB', name: 'Guinée-Bissau' },
    { code: 'MLI', name: 'Mali' },
    { code: 'MRT', name: 'Mauritanie' },
    { code: 'NER', name: 'Niger' },
    { code: 'NGA', name: 'Nigeria' },
    { code: 'SEN', name: 'Sénégal' },
    { code: 'TGO', name: 'Togo' }
  ];

  // Initialiser selectedCountry avec le premier pays de la liste
  const [selectedCountry, setSelectedCountry] = useState(countries[0].code);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Vérifier que nous envoyons bien le pays
      console.log('Pays sélectionné:', selectedCountry);
      
      // 1. Créer l'utilisateur avec Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            country: selectedCountry
          }
        }
      });
      
      if (authError) throw authError;
      
      // 2. Créer également une entrée dans la table profiles
      if (authData && authData.user) {
        // Trouver le nom du pays correspondant au code
        const countryName = countries.find(c => c.code === selectedCountry)?.name || selectedCountry;
        
        console.log('Nom du pays à enregistrer:', countryName);
        
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              name: name,
              email: email,
              country: countryName, // Utiliser le nom complet du pays, pas le code
              created_at: new Date().toISOString()
            }
          ]);
        
        if (profileError) {
          console.error('Erreur lors de la création du profil:', profileError);
          console.error('Détails de l\'erreur:', profileError.details);
        }
      }
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Erreur lors de l\'authentification Google:', error);
      setError(error.message);
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
          
          <h1>{t('register.title')}</h1>
          <p className="auth-description">{t('register.subtitle')}</p>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">{t('register.name')}</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
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
            
            <div className="form-group">
              <label htmlFor="country">Pays</label>
              <select 
                id="country"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                required
                className="form-control"
              >
                <option value="" disabled>Sélectionnez votre pays</option>
                {countries.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button 
              type="submit" 
              className="btn-auth"
              disabled={loading}
            >
              {loading ? t('common.loading') : t('register.submit')}
            </button>
          </form>
          
          <div className="auth-divider">
            <span>{t('auth.orContinueWith')}</span>
          </div>
          
          <button 
            onClick={handleGoogleRegister} 
            className="btn-google"
            disabled={loading}
          >
            <img src="/google-icon.svg" alt="Google" className="google-icon" />
            {t('register.googleRegister')}
          </button>
          
          <div className="auth-links">
            <Link to="/login" className="auth-link">
              {t('register.hasAccount')} <span>{t('register.login')}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;