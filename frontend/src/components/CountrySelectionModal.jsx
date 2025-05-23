import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import '../styles/modal.css';

function CountrySelectionModal() {
  // Liste des pays codée en dur
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

  const [selectedCountry, setSelectedCountry] = useState(countries[0].code);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, updateUser } = useAuth();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedCountry) {
      setError('Veuillez sélectionner un pays');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Afficher le pays sélectionné pour déboguer
      console.log('Pays sélectionné:', selectedCountry);
      
      // Utiliser la fonction updateUser du contexte
      const success = await updateUser({ country: selectedCountry });
      
      if (!success) {
        throw new Error('Erreur lors de la mise à jour du pays');
      }
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour du pays:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{t('profile.selectCountry', 'Sélectionnez votre pays')}</h2>
        </div>
        
        <div className="modal-body">
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="country">{t('profile.country', 'Pays')}</label>
              <select 
                id="country"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                required
                className="form-control"
              >
                <option value="" disabled>{t('profile.selectCountryOption', 'Sélectionnez votre pays')}</option>
                {countries.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="modal-footer">
              <button 
                type="submit" 
                className="btn-primary"
                disabled={loading}
              >
                {loading ? t('common.loading', 'Chargement...') : t('common.save', 'Enregistrer')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CountrySelectionModal; 