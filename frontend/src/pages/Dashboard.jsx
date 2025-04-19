import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import '../styles/dashboard.css';

function Dashboard() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  if (loading) {
    return <div className="loading-container">Chargement...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>{t('dashboard.title')}</h1>
          <LanguageSwitcher />
        </div>
        <button onClick={handleLogout} className="btn btn-logout">
          {t('common.logout')}
        </button>
      </header>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>{t('dashboard.welcome', { name: user.name || user.email })}</h2>
          <p>{t('home.subtitle')}</p>
        </div>

        <div className="action-section">

        </div>

        <div className="cv-list-section">
          <h3>{t('dashboard.myCVs')}</h3>
          <div className="cv-empty-state">
            <p>{t('dashboard.noCVs')}</p>
            <p>{t('dashboard.createFirstCV')}</p>
          </div>
        </div>
      </div>

      <footer className="dashboard-footer">
        <Link to="/" className="home-link">{t('common.home')}</Link>
      </footer>
    </div>
  );
}

export default Dashboard;