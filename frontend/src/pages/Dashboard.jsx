import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import '../styles/dashboard.css';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'react-toastify';
import { supabase } from '../services/supabase';
import ConfirmModal from '../components/ConfirmModal';
import ProfileNotification from '../components/ProfileNotification';

function Dashboard() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [resumes, setResumes] = useState([]);
  const [coverLetters, setCoverLetters] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('cvs'); // 'cvs' ou 'letters'
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(null); // 'cv' ou 'letter'
  const [isProfileComplete, setIsProfileComplete] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoadingResumes(true);

      try {
        const [cvRes, clRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/cv/user/${user.id}`),
          fetch(`${import.meta.env.VITE_API_URL}/api/cover-letter/user/${user.id}`)
        ]);

        if (cvRes.ok) setResumes(await cvRes.json());
        if (clRes.ok) setCoverLetters(await clRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingResumes(false);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    // Vérifier si le profil est complet
    const checkProfileCompletion = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('name, country, birth_date, gender, city, user_type, profile_completed')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        // Vérifier si tous les champs requis sont remplis ou si profile_completed est true
        const isComplete = data.profile_completed || 
          (data.name && data.country && data.birth_date && data.gender && data.city && data.user_type);
          
        setIsProfileComplete(isComplete);
      } catch (err) {
        console.error('Erreur lors de la vérification du profil:', err);
      }
    };
    
    checkProfileCompletion();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      toast.error('Erreur de déconnexion');
    }
  };

  const handleDeleteClick = (type, id) => {
    setDeleteType(type);
    setItemToDelete(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (!user) {
        toast.error('Vous devez être connecté pour effectuer cette action');
        return;
      }
      
      const table = deleteType === 'cv' ? 'resumes' : 'cover_letters';
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', itemToDelete);
      
      if (error) {
        console.error('Erreur Supabase:', error);
        toast.error(`Erreur lors de la suppression ${deleteType === 'cv' ? 'du CV' : 'de la lettre'}`);
      } else {
        // Mettre à jour l'interface utilisateur
        if (deleteType === 'cv') {
          setResumes(prevResumes => prevResumes.filter(cv => cv.id !== itemToDelete));
          toast.success('CV supprimé avec succès');
        } else {
          setCoverLetters(prevLetters => prevLetters.filter(letter => letter.id !== itemToDelete));
          toast.success('Lettre supprimée avec succès');
        }
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur de connexion');
    } finally {
      setShowConfirmModal(false);
      setItemToDelete(null);
      setDeleteType(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setItemToDelete(null);
    setDeleteType(null);
  };

  const filteredResumes = resumes.filter(r => (r.data?.name || '').toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredLetters = coverLetters.filter(l => (l.job_title || '').toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Material Dashboard</h2>
        </div>
        <ul className="nav-list">
          <li className="nav-item active"><Link to="/dashboard" className="nav-link">📊 Accueil</Link></li>
          <li className="nav-item"><Link to="/dashboard" className="nav-link">📄 Mes CVs</Link></li>
          <li className="nav-item"><Link to="/dashboard" className="nav-link">✉️ Lettres</Link></li>
          <li className="nav-item"><Link to="/profile/edit" className="nav-link">👤 Mon compte</Link></li>
          <li className="nav-item"><Link to="/contact" className="nav-link">📞 Contact</Link></li>
        </ul>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">🚪 Déconnexion</button>
        </div>
      </aside>

      <main className="main-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="dashboard-actions">
            <input 
              type="text" 
              placeholder="Rechercher..." 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
              className="search-input" 
            />
            <div className="language-switcher-container">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        <ProfileNotification isProfileComplete={isProfileComplete} />

        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-header">📄 CVs</div>
            <div className="stat-value">{resumes.length}</div>
            <div className="stat-trend positive">+11%</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">✉️ Lettres</div>
            <div className="stat-value">{coverLetters.length}</div>
            <div className="stat-trend positive">+4%</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">📅 Dernière activité</div>
            <div className="stat-value">21</div>
            <div className="stat-trend positive">+9%</div>
          </div>
        </div>

        {/* Section combinée pour CV et lettres */}
        <div className="content-section combined-section">
          <div className="section-header">
            <div className="tabs-container">
              <button 
                className={`tab-btn ${activeTab === 'cvs' ? 'active' : ''}`} 
                onClick={() => setActiveTab('cvs')}
              >
                Mes CVs
              </button>
              <button 
                className={`tab-btn ${activeTab === 'letters' ? 'active' : ''}`} 
                onClick={() => setActiveTab('letters')}
              >
                Mes Lettres
              </button>
            </div>
            <Link to={activeTab === 'cvs' ? "/templates" : "/cover-letter/create"} className="create-new-btn">
              + Créer
            </Link>
          </div>

          <div className="tab-content">
            {activeTab === 'cvs' && (
              <div className="items-list">
                {filteredResumes.length > 0 ? (
                  filteredResumes.map(cv => (
                    <div key={cv.id} className="list-item">
                      <div className="item-info">
                        <div className="item-name">{cv.data?.name || 'CV sans nom'}</div>
                        <div className="item-date">{format(new Date(cv.updated_at), 'dd MMM yyyy', { locale: fr })}</div>
                      </div>
                      <div className="item-actions">
                        <button className="action-btn edit-btn" onClick={() => navigate(`/cv/edit/${cv.id}`)}>✏️</button>
                        <button className="action-btn download-btn" onClick={() => window.open(`${import.meta.env.VITE_API_URL}/api/cv/download/${cv.id}`)}>⬇️</button>
                        <button className="action-btn delete-btn" onClick={() => handleDeleteClick('cv', cv.id)}>🗑️</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <p>Vous n'avez pas encore de CV</p>
                    <Link to="/templates" className="create-btn">Créer mon premier CV</Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'letters' && (
              <div className="items-list">
                {filteredLetters.length > 0 ? (
                  filteredLetters.map(letter => (
                    <div key={letter.id} className="list-item">
                      <div className="item-info">
                        <div className="item-name">{letter.job_title || 'Lettre'} {letter.company && `- ${letter.company}`}</div>
                        <div className="item-date">{format(new Date(letter.updated_at), 'dd MMM yyyy', { locale: fr })}</div>
                      </div>
                      <div className="item-actions">
                        <button className="action-btn edit-btn" onClick={() => navigate(`/cover-letter/edit/${letter.id}`)}>✏️</button>
                        <button className="action-btn download-btn" onClick={() => window.open(`${import.meta.env.VITE_API_URL}/api/cover-letter/download/${letter.id}`)}>⬇️</button>
                        <button className="action-btn delete-btn" onClick={() => handleDeleteClick('letter', letter.id)}>🗑️</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <p>Vous n'avez pas encore de lettre de motivation</p>
                    <Link to="/cover-letter/create" className="create-btn">Créer ma première lettre</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <ConfirmModal 
        isOpen={showConfirmModal}
        message={deleteType === 'cv' 
          ? "Êtes-vous sûr de vouloir supprimer ce CV ?" 
          : "Êtes-vous sûr de vouloir supprimer cette lettre de motivation ?"}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default Dashboard;
