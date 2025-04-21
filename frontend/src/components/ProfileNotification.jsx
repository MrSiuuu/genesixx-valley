import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/profile-notification.css';

const ProfileNotification = ({ isProfileComplete }) => {
  const { t } = useTranslation();
  
  if (isProfileComplete) return null;
  
  return (
    <div className="profile-notification">
      <div className="notification-content">
        <div className="notification-icon">📝</div>
        <div className="notification-text">
          <h3>{t('profile.completeProfile')}</h3>
          <p>{t('profile.completeProfileDesc')}</p>
        </div>
      </div>
      <Link to="/profile/edit" className="notification-action">
        {t('profile.completeNow')}
      </Link>
    </div>
  );
};

export default ProfileNotification; 