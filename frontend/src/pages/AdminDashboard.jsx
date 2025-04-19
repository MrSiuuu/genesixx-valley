import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import '../styles/admin.css';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      
      // Récupérer la liste des utilisateurs
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (usersError) throw usersError;
      
      setUsers(usersData);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      setError(error.message);
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
      const { error } = await supabase
        .from('profiles')
        .update({ email_confirmed: true })
        .eq('id', userId);
      
      if (error) throw error;
      
      // Recharger les données après la mise à jour
      loadAdminData();
    } catch (error) {
      console.error('Erreur lors de la confirmation de l\'email:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="admin-loading">Chargement des données...</div>;
  }

  if (error) {
    return <div className="admin-error">Erreur: {error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-left">
          <h1>{t('admin.title')}</h1>
          <LanguageSwitcher />
        </div>
        <button onClick={handleLogout} className="btn-logout">
          {t('common.logout')}
        </button>
      </header>
      
      <div className="admin-content">
        <div className="users-section">
          <h2>{t('admin.usersCount', { count: users.length })}</h2>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t('admin.userName')}</th>
                  <th>{t('admin.userEmail')}</th>
                  <th>{t('admin.registrationDate')}</th>
                  <th>{t('admin.emailConfirmed')}</th>
                  <th>{t('admin.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name || '-'}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                    <td>{user.email_confirmed ? t('admin.yes') : t('admin.no')}</td>
                    <td>
                      {!user.email_confirmed && (
                        <button 
                          onClick={() => confirmUserEmail(user.id)}
                          className="btn-action"
                        >
                          {t('admin.confirmEmail')}
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