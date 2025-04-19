import { useTranslation } from 'react-i18next';
import '../styles/language-switcher.css';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button 
        className={`language-btn ${i18n.language === 'fr' ? 'active' : ''}`}
        onClick={() => changeLanguage('fr')}
      >
        FR
      </button>
      <button 
        className={`language-btn ${i18n.language === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
    </div>
  );
}

export default LanguageSwitcher; 