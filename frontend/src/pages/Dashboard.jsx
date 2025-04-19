import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import '../styles/dashboard.css';

function Dashboard() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
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
    return null; // La redirection sera gérée par useEffect
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Tableau de bord</h1>
        <button onClick={handleLogout} className="btn btn-logout">
          Se déconnecter
        </button>
      </header>
      
      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Bienvenue, {user.name || user.email}</h2>
          <p>Commencez à créer votre CV professionnel dès maintenant.</p>
        </div>
        
        <div className="action-section">
          <button className="btn btn-primary">Créer un nouveau CV</button>
        </div>
        
        <div className="cv-list-section">
          <h3>Mes CV</h3>
          <div className="cv-empty-state">
            <p>Vous n'avez pas encore créé de CV.</p>
            <p>Créez votre premier CV pour le voir apparaître ici.</p>
          </div>
        </div>
      </div>
      
      <footer className="dashboard-footer">
        <Link to="/" className="home-link">Retour à l'accueil</Link>
      </footer>
    </div>
  );
}

export default Dashboard; 