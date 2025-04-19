import { useState } from 'react';
import { supabase } from '../services/supabase';
import '../styles/auth.css';

function SetupAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    
    try {
      // 1. Vérifier si l'utilisateur existe déjà
      const { data: existingUsers, error: searchError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email);
      
      if (searchError) throw searchError;
      
      if (existingUsers && existingUsers.length > 0) {
        // L'utilisateur existe déjà, le définir comme admin
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ is_admin: true })
          .eq('email', email);
        
        if (updateError) throw updateError;
        
        setMessage(`L'utilisateur ${email} a été défini comme administrateur.`);
      } else {
        // Créer un nouvel utilisateur
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name }
          }
        });
        
        if (signUpError) throw signUpError;
        
        // Attendre un peu pour que le trigger ait le temps de s'exécuter
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Définir l'utilisateur comme administrateur
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            is_admin: true,
            email_confirmed: true,
            name: name || email
          })
          .eq('id', data.user.id);
        
        if (updateError) throw updateError;
        
        setMessage(`Administrateur créé avec succès: ${email}`);
      }
    } catch (err) {
      console.error('Erreur lors de la création de l\'administrateur:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Configuration de l'administrateur</h1>
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          ⚠️ Cette page est temporaire et ne doit être utilisée que pour la configuration initiale.
        </p>
        
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              className="form-control"
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
              minLength={6}
              className="form-control"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Création en cours...' : 'Créer administrateur'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetupAdmin; 