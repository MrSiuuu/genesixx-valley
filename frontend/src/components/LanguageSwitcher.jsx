import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState } from 'react';
import '../styles/language-switcher.css';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isChanging, setIsChanging] = useState(false);
  
  const changeLanguage = (lng) => {
    if (i18n.language === lng || isChanging) return;
    
    setIsChanging(true);
    i18n.changeLanguage(lng);
    
    // Prevent rapid language switching
    setTimeout(() => setIsChanging(false), 300);
  };

  return (
    <motion.div 
      className="language-switcher"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Language selector"
      role="region"
    >
      <motion.button 
        className={`language-btn ${i18n.language === 'fr' ? 'active' : ''}`}
        onClick={() => changeLanguage('fr')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isChanging}
        aria-pressed={i18n.language === 'fr'}
        title="Changer en français"
      >
        <span className="lang-text">FR</span>
      </motion.button>
      <motion.button 
        className={`language-btn ${i18n.language === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isChanging}
        aria-pressed={i18n.language === 'en'}
        title="Switch to English"
      >
        <span className="lang-text">EN</span>
      </motion.button>
    </motion.div>
  );
}

export default LanguageSwitcher;