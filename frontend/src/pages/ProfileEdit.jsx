import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabase';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import '../styles/profile-edit.css';

function ProfileEdit() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    birth_date: '',
    gender: '',
    city: '',
    user_type: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const countries = [
    { code: 'BEN', name: 'Bénin' },
    { code: 'BFA', name: 'Burkina Faso' },
    { code: 'CMR', name: 'Cameroun' },
    { code: 'CPV', name: 'Cap-Vert' },
    { code: 'TCD', name: 'Tchad' },
    { code: 'CIV', name: 'Côte d\'Ivoire' },
    { code: 'GAB', name: 'Gabon' },
    { code: 'GHA', name: 'Ghana' },
    { code: 'GIN', name: 'Guinée' },
    { code: 'GNB', name: 'Guinée-Bissau' },
    { code: 'MLI', name: 'Mali' },
    { code: 'MRT', name: 'Mauritanie' },
    { code: 'NER', name: 'Niger' },
    { code: 'NGA', name: 'Nigeria' },
    { code: 'SEN', name: 'Sénégal' },
    { code: 'TGO', name: 'Togo' }
  ];
  
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        navigate('/login');
        return;
      }
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        // Pré-remplir le formulaire avec les données existantes
        setFormData({
          name: data.name || '',
          country: data.country || '',
          birth_date: data.birth_date || '',
          gender: data.gender || '',
          city: data.city || '',
          user_type: data.user_type || ''
        });
      } catch (err) {
        console.error('Erreur lors du chargement du profil:', err);
        toast.error(t('profile.loadError'));
      } finally {
        setLoading(false);
      }
    };
    
    loadProfile();
  }, [user, navigate, t]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setSaving(true);
      
      console.log('Données du formulaire à envoyer:', formData);
      
      // 1. Mettre à jour la table profiles
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .update({
          ...formData,
          profile_completed: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select();
        
      console.log('Résultat de la mise à jour du profil:', { profileData, profileError });
      
      if (profileError) throw profileError;
      
      // 2. Mettre à jour les métadonnées de l'utilisateur avec le pays
      const { data: metadataData, error: metadataError } = await supabase.auth.updateUser({
        data: {
          country: formData.country
        }
      });
      
      console.log('Résultat de la mise à jour des métadonnées:', { metadataData, metadataError });
      
      if (metadataError) throw metadataError;
      
      // 3. Vérifier que les données ont bien été mises à jour
      const { data: checkData, error: checkError } = await supabase
        .from('profiles')
        .select('country')
        .eq('id', user.id)
        .single();
        
      console.log('Vérification après mise à jour:', { checkData, checkError });
      
      toast.success(t('profile.saveSuccess'));
      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur lors de la sauvegarde du profil:', err);
      toast.error(t('profile.saveError'));
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return <div className="loading-container">{t('common.loading')}</div>;
  }
  
  return (
    <div className="profile-edit-container">
      <div className="profile-edit-card">
        <h1>{t('profile.editTitle')}</h1>
        
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">{t('profile.name')}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="country">{t('profile.country')}</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="form-control"
            >
              <option value="" disabled>Sélectionnez votre pays</option>
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="city">{t('profile.city')}</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="birth_date">{t('profile.birthDate')}</label>
            <input
              type="date"
              id="birth_date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="gender">{t('profile.gender')}</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">{t('profile.selectGender')}</option>
              <option value="male">{t('profile.male')}</option>
              <option value="female">{t('profile.female')}</option>
              <option value="other">{t('profile.other')}</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="user_type">{t('profile.userType')}</label>
            <select
              id="user_type"
              name="user_type"
              value={formData.user_type}
              onChange={handleChange}
              required
            >
              <option value="">{t('profile.selectUserType')}</option>
              <option value="student">{t('profile.student')}</option>
              <option value="researcher">{t('profile.researcher')}</option>
              <option value="other">{t('profile.otherType')}</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel"
              onClick={() => navigate('/dashboard')}
              disabled={saving}
            >
              {t('common.cancel')}
            </button>
            <button 
              type="submit" 
              className="btn-save"
              disabled={saving}
            >
              {saving ? t('common.saving') : t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileEdit; 