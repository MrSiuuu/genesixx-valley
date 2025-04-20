import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import '../styles/dashboard.css';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

function Dashboard() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [resumes, setResumes] = useState([]);
  const [coverLetters, setCoverLetters] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        setLoadingResumes(true);
        
        // Récupérer les CV
        const resumesResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/cv/user/${user.id}`);
        if (resumesResponse.ok) {
          const resumesData = await resumesResponse.json();
          setResumes(resumesData);
        }
        
        // Récupérer les lettres
        const lettersResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/cover-letter/user/${user.id}`);
        if (lettersResponse.ok) {
          const lettersData = await lettersResponse.json();
          setCoverLetters(lettersData);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoadingResumes(false);
      }
    };
    
    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const handleDownloadResume = (resumeId) => {
    window.open(`${import.meta.env.VITE_API_URL}/api/cv/download/${resumeId}`, '_blank');
  };

  const handleDownloadLetter = (letterId) => {
    window.open(`${import.meta.env.VITE_API_URL}/api/cover-letter/download/${letterId}`, '_blank');
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
          <div className="dashboard-actions">
            <Link to="/templates" className="btn btn-primary create-cv-btn">
              {t('dashboard.createCV')}
            </Link>
          </div>
        </div>

        <div className="cv-list-section">
          <h3>{t('dashboard.myCVs')}</h3>
          
          {loadingResumes ? (
            <div className="loading-indicator">{t('common.loading')}</div>
          ) : resumes.length > 0 ? (
            <div className="cv-grid">
              {resumes.map(resume => (
                <div key={resume.id} className="cv-item">
                  <div className="cv-item-header">
                    <h4>{resume.data.name || 'CV sans nom'}</h4>
                    <span className="cv-date">
                      {format(new Date(resume.updated_at), 'dd MMMM yyyy', { locale: fr })}
                    </span>
                  </div>
                  <div className="cv-template-info">
                    Template: {resume.template_id}
                  </div>
                  <div className="cv-actions">
                    <Link to={`/cv/edit/${resume.id}`} className="btn-edit">
                      {t('common.edit')}
                    </Link>
                    <button 
                      onClick={() => handleDownloadResume(resume.id)} 
                      className="btn-download"
                    >
                      {t('common.download')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="cv-empty-state">
              <p>{t('dashboard.noCVs')}</p>
              <p>{t('dashboard.createFirstCV')}</p>
            </div>
          )}
        </div>

        {coverLetters.length > 0 && (
          <div className="letters-section">
            <h3>{t('dashboard.myLetters')}</h3>
            <div className="letters-grid">
              {coverLetters.map(letter => (
                <div key={letter.id} className="letter-item">
                  <div className="letter-item-header">
                    <h4>{t('coverLetter.title')}</h4>
                    <span className="letter-date">
                      {format(new Date(letter.updated_at), 'dd MMMM yyyy', { locale: fr })}
                    </span>
                  </div>
                  <div className="letter-preview">
                    {letter.content.substring(0, 100)}...
                  </div>
                  <div className="letter-actions">
                    <Link to={`/cover-letter/edit/${letter.id}`} className="btn-edit">
                      {t('common.edit')}
                    </Link>
                    <button 
                      onClick={() => handleDownloadLetter(letter.id)} 
                      className="btn-download"
                    >
                      {t('common.download')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="dashboard-footer">
        <Link to="/" className="home-link">{t('common.home')}</Link>
      </footer>
    </div>
  );
}

export default Dashboard;