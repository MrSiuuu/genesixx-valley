import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import '../styles/contact.css';

function Contact() {
  const { t } = useTranslation();
  const form = useRef();
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    
    // Remplacez ces valeurs par vos propres identifiants EmailJS
    emailjs.sendForm(
      'service_a3kg8n1',     // Votre Service ID
      'template_b37te1w',    // Votre Template ID
      form.current,
      'pE99Z9s9FVc3qf7Og'    // Votre clé publique
    )
    .then((result) => {
      toast.success('Message envoyé avec succès !');
      form.current.reset();
    })
    .catch((error) => {
      toast.error('Erreur lors de l\'envoi du message');
      console.error(error);
    })
    .finally(() => {
      setSending(false);
    });
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Material Dashboard</h2>
        </div>
        <ul className="nav-list">
          <li className="nav-item"><Link to="/dashboard" className="nav-link">📊 Accueil</Link></li>
          <li className="nav-item"><Link to="/dashboard" className="nav-link">📄 Mes CVs</Link></li>
          <li className="nav-item"><Link to="/dashboard" className="nav-link">✉️ Lettres</Link></li>
          <li className="nav-item"><Link to="/profile/edit" className="nav-link">👤 Mon compte</Link></li>
          <li className="nav-item active"><Link to="/contact" className="nav-link">📞 Contact</Link></li>
        </ul>
        <div className="sidebar-footer">
          <button onClick={() => {}} className="logout-btn">🚪 Déconnexion</button>
        </div>
      </aside>

      <main className="main-content">
        <div className="dashboard-header">
          <h1>Contactez-nous</h1>
        </div>

        <div className="contact-container">
          <div className="contact-intro">
            <p>Besoin d'aide ou d'informations supplémentaires ? Notre équipe est à votre disposition dans plusieurs pays.</p>
          </div>

          <div className="contact-cards">
            <div className="contact-card">
              <div className="country-flag">🇨🇲</div>
              <h2>Cameroun</h2>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <span className="contact-text">+237 655 123 456</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <span className="contact-text">contact.cameroun@genesixx.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span className="contact-text">123 Avenue de l'Indépendance, Yaoundé</span>
                </div>
              </div>
            </div>

            <div className="contact-card">
              <div className="country-flag">🇬🇳</div>
              <h2>Guinée</h2>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <span className="contact-text">+224 621 987 654</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <span className="contact-text">contact.guinee@genesixx.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span className="contact-text">45 Rue du Commerce, Conakry</span>
                </div>
              </div>
            </div>

            <div className="contact-card">
              <div className="country-flag">🇹🇬</div>
              <h2>Togo</h2>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <span className="contact-text">+228 90 456 789</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <span className="contact-text">contact.togo@genesixx.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span className="contact-text">78 Boulevard de la Paix, Lomé</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <h2>Envoyez-nous un message</h2>
            <form ref={form} className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nom complet</label>
                <input type="text" id="name" name="user_name" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="user_email" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Sujet</label>
                <input type="text" id="subject" name="subject" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              
              <button type="submit" className="submit-btn" disabled={sending}>
                {sending ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Contact; 