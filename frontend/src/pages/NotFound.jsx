import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="not-found-container">
      <h1>{t('errors.notFound')}</h1>
      <p>{t('errors.notFoundMessage')}</p>
      <Link to="/" className="btn btn-primary">
        {t('common.home')}
      </Link>
    </div>
  );
}

export default NotFound; 