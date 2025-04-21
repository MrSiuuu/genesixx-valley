const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token d\'authentification manquant' });
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Token d\'authentification invalide' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_for_development');
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    return res.status(401).json({ message: 'Token d\'authentification invalide' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user?.email !== 'admin@cvgen.com') {
    return res.status(403).json({ message: 'Accès non autorisé. Réservé aux administrateurs.' });
  }
  
  next();
};

module.exports = {
  authMiddleware,
  adminMiddleware
}; 