import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAdmin } from '../hooks/useAdmin';
import '../styles/home.css';

function Home() {
  const { user, loading } = useAuth();
  const { isAdmin } = useAdmin();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Générateur de CV</h1>
        <p className="home-description">
          Créez facilement un CV professionnel en quelques minutes
        </p>
        
        {loading ? (
          <div className="loading-spinner">Chargement...</div>
        ) : user ? (
          <div className="home-actions">
            <p className="welcome-message">Bienvenue, {user.name || user.email}</p>
            <Link to="/dashboard" className="btn btn-primary">
              Accéder à mon tableau de bord
            </Link>
            
            {/* Lien vers l'administration pour les admins */}
            {isAdmin && (
              <Link to="/admin/dashboard" className="btn btn-secondary admin-link">
                Accéder à l'administration
              </Link>
            )}
          </div>
        ) : (
          <div className="home-actions">
            <Link to="/login" className="btn btn-primary">
              Connexion
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Inscription
            </Link>
            
            {/* Lien vers la page de connexion admin */}
            <Link to="/admin/login" className="admin-link">
              Administration
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home; 