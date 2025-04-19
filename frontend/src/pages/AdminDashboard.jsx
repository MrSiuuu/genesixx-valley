import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import '../styles/admin.css';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsers: 0,
    totalCVs: 0
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté et est admin
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/admin/login');
        return;
      }
      
      const { data: userData } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();
      
      if (!userData || !userData.is_admin) {
        navigate('/login');
      } else {
        loadAdminData();
      }
    };
    
    checkAdmin();
  }, [navigate]);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      
      // Récupérer les statistiques
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*');
      
      if (usersError) throw usersError;
      
      // Récupérer les CVs (à adapter selon votre structure de données)
      const { data: cvsData, error: cvsError } = await supabase
        .from('cvs')
        .select('*');
      
      if (cvsError) throw cvsError;
      
      // Calculer les statistiques
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const newUsersCount = usersData.filter(user => {
        const createdAt = new Date(user.created_at);
        return createdAt >= oneWeekAgo;
      }).length;
      
      setStats({
        totalUsers: usersData.length,
        newUsers: newUsersCount,
        totalCVs: cvsData ? cvsData.length : 0
      });
      
      setUsers(usersData);
    } catch (err) {
      console.error('Erreur lors du chargement des données admin:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const confirmUserEmail = async (userId) => {
    try {
      // Cette opération nécessite normalement des droits d'admin côté serveur
      // Ici, nous mettons à jour un champ dans la table profiles
      const { error } = await supabase
        .from('profiles')
        .update({ email_confirmed: true })
        .eq('id', userId);
      
      if (error) throw error;
      
      // Mettre à jour la liste des utilisateurs
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, email_confirmed: true } 
          : user
      ));
    } catch (err) {
      console.error('Erreur lors de la confirmation de l\'email:', err);
      setError(err.message);
    }
  };

  if (loading) return <div className="admin-loading">Chargement du tableau de bord...</div>;
  if (error) return <div className="admin-error">Erreur: {error}</div>;

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Tableau de bord d'administration</h1>
        <button onClick={handleLogout} className="btn-logout">Déconnexion</button>
      </header>
      
      <div className="admin-content">
        <div className="stats-container">
          <div className="stat-card">
            <h3>Utilisateurs totaux</h3>
            <p className="stat-value">{stats.totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Nouveaux utilisateurs (7 jours)</h3>
            <p className="stat-value">{stats.newUsers}</p>
          </div>
          <div className="stat-card">
            <h3>CVs créés</h3>
            <p className="stat-value">{stats.totalCVs}</p>
          </div>
        </div>
        
        <div className="users-section">
          <h2>Liste des utilisateurs</h2>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Date d'inscription</th>
                  <th>Email confirmé</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name || '-'}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                    <td>{user.email_confirmed ? 'Oui' : 'Non'}</td>
                    <td>
                      {!user.email_confirmed && (
                        <button 
                          onClick={() => confirmUserEmail(user.id)}
                          className="btn-action"
                        >
                          Confirmer l'email
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 