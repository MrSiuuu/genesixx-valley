import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/auth.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Veuillez entrer une adresse email valide');
      return;
    }
    
    // Validation du mot de passe
    if (password.length < 6) {
      setErrorMessage('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    
    try {
      const result = await register(email, password, name);
      
      // Si l'inscription a réussi mais que l'email n'est pas confirmé
      if (error && error.includes('confirmer')) {
        setSuccessMessage("Votre compte a été créé. Veuillez vérifier votre email pour confirmer votre inscription.");
        return;
      }
      
      // Si tout s'est bien passé, rediriger vers le tableau de bord
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      
      // Si l'erreur concerne la confirmation de l'email, c'est en fait un succès
      if (error.message && error.message.includes('confirmer')) {
        setSuccessMessage(error.message);
      } else {
        // Utiliser le message d'erreur du contexte d'authentification
        setErrorMessage(error.message || 'Erreur d\'inscription. Veuillez réessayer.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Inscription</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        
        {!successMessage ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="form-control"
                placeholder="exemple@domaine.com"
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
                disabled={loading}
                minLength={6}
                className="form-control"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Inscription en cours...' : 'S\'inscrire'}
            </button>
          </form>
        ) : (
          <div className="text-center mt-4">
            <button 
              onClick={() => navigate('/login')} 
              className="btn btn-primary"
            >
              Aller à la page de connexion
            </button>
          </div>
        )}
        
        <p className="auth-link">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}

export default Register; 