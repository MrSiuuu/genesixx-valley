import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAdmin } from '../hooks/useAdmin';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { motion } from 'framer-motion';
import '../styles/home.css';

function Home() {
  const { user, loading } = useAuth();
  const { isAdmin } = useAdmin();
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const { t } = useTranslation();
  
  // State for counting animations
  const [counting, setCounting] = useState(false);
  
  // State for FAQ section
  const [activeIndex, setActiveIndex] = useState(null);
  
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
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
    const currentStatsRef = statsRef.current; // Store ref in a variable
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setCounting(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    if (currentStatsRef) {
      observer.observe(currentStatsRef);
    }
    
    return () => {
      if (currentStatsRef) {
        observer.unobserve(currentStatsRef);
      }
    };
  }, []);

  return (
    <div className="home-container">
      <LanguageSwitcher />
      
      <div className="home-page">
        <div className="hero-section">
          <div className="hero-content">
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="title-gradient">Genesixx</span> Valley
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {t('home.subtitle')}
            </motion.p>
            
            <motion.p 
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {t('home.description')}
            </motion.p>
            
            {loading ? (
              <div className="loading-spinner">{t('common.loading')}</div>
            ) : user ? (
              <motion.div 
                className="hero-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <p className="welcome-message">{t('dashboard.welcome', { name: user.name || user.email })}</p>
                <Link to="/dashboard" className="btn btn-primary">
                  {t('home.accessDashboard')}
                </Link>
                
                {isAdmin && (
                  <Link to="/admin/dashboard" className="btn btn-outline admin-link">
                    {t('home.accessAdmin')}
                  </Link>
                )}
              </motion.div>
            ) : (
              <motion.div 
                className="hero-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <Link to="/login" className="btn btn-primary">
                  {t('common.login')}
                </Link>
                <Link to="/register" className="btn btn-secondary">
                  {t('common.register')}
                </Link>
                
                <Link to="/admin/login" className="link-admin">
                  {t('home.adminArea')}
                </Link>
              </motion.div>
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
                <path d="M7 10L12 15L17 10" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
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

        {/* Testimonials Section */}
        <div className="testimonials-section">
          <div className="container">
            <h2 className="section-title">{t('home.testimonials.title', 'What Our Users Say')}</h2>
            <p className="section-subtitle">{t('home.testimonials.subtitle', 'Discover why thousands of professionals trust our platform')}</p>
            
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="testimonial-rating">★★★★★</div>
                <p className="testimonial-text">"{t('home.testimonials.quote1', 'Using this platform transformed my job search. The modern templates and intuitive editor helped me create a CV that stands out. Landed my dream job within 2 weeks!')}"</p>
                <div className="testimonial-author">
                  <img src="/avatars/testimonial1.jpg" alt="User avatar" className="testimonial-avatar" />
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">Sophie Martin</h4>
                    <p className="testimonial-position">Product Designer</p>
                  </div>
                </div>
              </div>
              
              <div className="testimonial-card">
                <div className="testimonial-rating">★★★★★</div>
                <p className="testimonial-text">"{t('home.testimonials.quote2', 'As someone who struggled with creating professional CVs, this tool was a game-changer. Simple, powerful, and the templates are truly impressive. Highly recommended!')}"</p>
                <div className="testimonial-author">
                  <img src="/avatars/testimonial2.jpg" alt="User avatar" className="testimonial-avatar" />
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">Thomas Lambert</h4>
                    <p className="testimonial-position">Software Engineer</p>
                  </div>
                </div>
              </div>
              
              <div className="testimonial-card">
                <div className="testimonial-rating">★★★★★</div>
                <p className="testimonial-text">"{t('home.testimonials.quote3', 'The ability to quickly update my CV for different applications has been invaluable. The designs are clean, modern, and helped me stand out from other candidates.')}"</p>
                <div className="testimonial-author">
                  <img src="/avatars/testimonial3.jpg" alt="User avatar" className="testimonial-avatar" />
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">Camille Dupont</h4>
                    <p className="testimonial-position">Marketing Specialist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="faq-section">
          <div className="container">
            <h2 className="section-title">{t('home.faq.title', 'Frequently Asked Questions')}</h2>
            <p className="section-subtitle">{t('home.faq.subtitle', 'Get answers to common questions about our platform')}</p>
            
            <div className="faq-container">
              {[...Array(6)].map((_, index) => (
                <div className="faq-item" key={index}>
                  <button 
                    className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={activeIndex === index}
                  >
                    {t(`home.faq.q${index + 1}`, getFAQQuestion(index))}
                    <span className="faq-icon">
                      {activeIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  <div 
                    className={`faq-answer ${activeIndex === index ? 'active' : ''}`}
                    aria-hidden={activeIndex !== index}
                  >
                    <p>{t(`home.faq.a${index + 1}`, getFAQAnswer(index))}</p>
                  </div>
                </div>
              ))}
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
                <img src="/logos/dv_logo.svg" alt="Diversis" />
              </div>
              <div className="partner-logo">
                <img src="/logos/genesixx.png" alt="Genesixx" />
              </div>
              <div className="partner-logo">
                <img src="/logos/axis_logo.svg" alt="Axis-Shop" />
              </div>
              <div className="partner-logo">
                <img src="/logos/logo-campus-france.png" alt="Campus-france" />
              </div>
              <div className="partner-logo">
                <img src="/logos/campus-canada.webp" alt="campus-canada" />
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

// Helper function to get default FAQ questions if translations aren't available
function getFAQQuestion(index) {
  const questions = [
    "How do I get started with creating my CV?",
    "Can I download my CV in different formats?",
    "Is my data secure on your platform?",
    "Can I create multiple versions of my CV?",
    "Are the templates free to use?",
    "How can I customize my CV design?"
  ];
  return questions[index] || "";
}

// Helper function to get default FAQ answers if translations aren't available
function getFAQAnswer(index) {
  const answers = [
    "Getting started is easy! Simply register for an account, choose a template that suits your style, and use our intuitive editor to add your information. Our step-by-step process will guide you through creating a professional CV in minutes.",
    "Yes, you can download your CV in multiple formats including PDF, DOCX, and TXT. This gives you flexibility when applying for jobs through different platforms or when sending your CV directly to recruiters.",
    "Absolutely. We take data security seriously. All your information is encrypted and stored securely. We never share your personal data with third parties without your explicit consent.",
    "Yes! You can create and save multiple versions of your CV tailored for different job applications or industries. This helps you customize your approach for each opportunity.",
    "We offer both free and premium templates. Our free templates provide everything you need to create a professional CV, while our premium options offer additional designs and features for those wanting more customization options.",
    "Our platform offers extensive customization options. You can change colors, fonts, section layouts, and more to match your personal style or industry standards while maintaining professional quality."
  ];
  return answers[index] || "";
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