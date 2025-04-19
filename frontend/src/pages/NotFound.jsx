import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="App">
      <h1>404 - Page non trouvée</h1>
      <p>La page que vous recherchez n'existe pas.</p>
      <Link to="/">
        <button>Retour à l'accueil</button>
      </Link>
    </div>
  );
}

export default NotFound; 