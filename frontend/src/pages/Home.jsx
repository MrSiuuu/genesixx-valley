import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAdmin } from '../hooks/useAdmin';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import '../styles/home.css';

function Home() {
  const { user, loading } = useAuth();
  const { isAdmin } = useAdmin();
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const { t } = useTranslation();
  
  // State for counting animations
  const [counting, setCounting] = useState(false);
  
  // Add viewport meta tag for better responsive behavior
  useEffect(() => {
    // Check if the viewport meta tag exists
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    
    // If it doesn't exist, create it
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }
    
    // Set the content to ensure proper responsive behavior
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    
    // Cleanup function
    return () => {
      // Restore original viewport settings if needed
      if (viewportMeta) {
        viewportMeta.content = 'width=device-width, initial-scale=1.0';
      }
    };
  }, []);

  // Scroll to features section function
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Add intersection observer for stats section
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setCounting(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>{t('home.title')}</h1>
        <LanguageSwitcher />
      </header>
      
      <div className="home-page">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Genesixx Valley</h1>
            <p className="hero-subtitle">{t('home.subtitle')}</p>
            <p className="hero-description">
              {t('home.description')}
            </p>
            
            {loading ? (
              <div className="loading-spinner">{t('common.loading')}</div>
            ) : user ? (
              <div className="hero-actions">
                <p className="welcome-message">{t('dashboard.welcome', { name: user.name || user.email })}</p>
                <Link to="/dashboard" className="btn btn-primary">
                  {t('home.accessDashboard')}
                </Link>
                
                {isAdmin && (
                  <Link to="/admin/dashboard" className="btn btn-outline admin-link">
                    {t('home.accessAdmin')}
                  </Link>
                )}
              </div>
            ) : (
              <div className="hero-actions">
                <Link to="/login" className="btn btn-primary">
                  {t('common.login')}
                </Link>
                <Link to="/register" className="btn btn-secondary">
                  {t('common.register')}
                </Link>
                
                <Link to="/admin/login" className="link-admin">
                  {t('home.adminArea')}
                </Link>
              </div>
            )}
          </div>
          <div className="hero-image">
            <img src="/resume-preview.svg" alt={t('home.resumePreview')} className="preview-image" />
          </div>
          
          {/* Down Arrow Navigation */}
          <div className="scroll-arrow-container">
            <button 
              aria-label={t('home.discoverMore')} 
              className="scroll-down-arrow"
              onClick={scrollToFeatures}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div ref={featuresRef} className="features-section">
          <h2 className="section-title">{t('home.whyChooseUs')}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <p>{t('home.features.modernDesigns')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>{t('home.features.fastAndSimple')}</h3>
              <p>{t('home.features.createQuickly')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>{t('home.features.easyUpdate')}</h3>
              <p>{t('home.features.modifyAnytime')}</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="stats-section">
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">
                <CountUp end={30000} start={counting ? 0 : 30000} />
              </div>
              <div className="stat-label">{t('home.stats.users')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                <CountUp end={1000} start={counting ? 0 : 1000} />
              </div>
              <div className="stat-label">{t('home.stats.templates')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                <CountUp end={27000} start={counting ? 0 : 27000} />
              </div>
              <div className="stat-label">{t('home.stats.satisfied')}</div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="partners-section">
          <div className="partners-content">
            <h2 className="partners-title">{t('home.partners.title')}</h2>
            <p className="partners-description">
              {t('home.partners.description')}
            </p>
            <div className="partners-logos">
              <div className="partner-logo">
                <img src="/logos/google.svg" alt="Google" />
              </div>
              <div className="partner-logo">
                <img src="/logos/amazon.svg" alt="Amazon" />
              </div>
              <div className="partner-logo">
                <img src="/logos/microsoft.svg" alt="Microsoft" />
              </div>
              <div className="partner-logo">
                <img src="/logos/apple.svg" alt="Apple" />
              </div>
              <div className="partner-logo">
                <img src="/logos/tesla.svg" alt="Tesla" />
              </div>
              <div className="partner-logo">
                <img src="/logos/meta.svg" alt="Meta" />
              </div>
            </div>
          </div>
        </div>

        <footer className="site-footer">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Genesixx Valley</h3>
              <p>{t('home.footer.tagline')}</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>{t('home.footer.product')}</h4>
                <ul>
                  <li><Link to="/features">{t('home.footer.features')}</Link></li>
                  <li><Link to="/templates">{t('home.footer.templates')}</Link></li>
                  <li><Link to="/pricing">{t('home.footer.pricing')}</Link></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>{t('home.footer.resources')}</h4>
                <ul>
                  <li><Link to="/blog">{t('home.footer.blog')}</Link></li>
                  <li><Link to="/guides">{t('home.footer.guides')}</Link></li>
                  <li><Link to="/faq">{t('home.footer.faq')}</Link></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>{t('home.footer.company')}</h4>
                <ul>
                  <li><Link to="/about">{t('home.footer.about')}</Link></li>
                  <li><Link to="/contact">{t('home.footer.contact')}</Link></li>
                  <li><Link to="/legal">{t('home.footer.legal')}</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Genesixx Valley. {t('home.footer.rights')}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

// CountUp component for animated number counting
function CountUp({ start = 0, end = 0 }) {
  const [count, setCount] = useState(start);
  const duration = 2000; // 2 seconds
  const frames = 60;
  const increment = (end - start) / frames;
  
  useEffect(() => {
    let currentCount = start;
    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(currentCount));
      }
    }, duration / frames);
    
    return () => clearInterval(timer);
  }, [start, end, increment]);
  
  // Format the number with commas
  return new Intl.NumberFormat('fr-FR').format(count);
}

export default Home;