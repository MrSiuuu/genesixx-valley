import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAdmin } from '../hooks/useAdmin';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import '../styles/home.css';

function Home() {
  const { user, loading } = useAuth();
  const { isAdmin } = useAdmin();
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>{t('home.title')}</h1>
        <LanguageSwitcher />
      </header>
      
      <div className="home-content">
        <h2>{t('home.subtitle')}</h2>
        
        <div className="home-actions">
          {!loading && !user ? (
            <>
              <Link to="/login" className="btn btn-primary">
                {t('common.login')}
              </Link>
              <Link to="/register" className="btn btn-secondary">
                {t('common.register')}
              </Link>
            </>
          ) : (
            <Link to="/dashboard" className="btn btn-primary">
              {t('dashboard.title')}
            </Link>
          )}
        </div>
        
        {isAdmin && (
          <div className="admin-link">
            <Link to="/admin/dashboard" className="btn btn-admin">
              {t('admin.title')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home; 