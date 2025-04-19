import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Token d\'authentification manquant' });
      return;
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ message: 'Token d\'authentification invalide' });
      return;
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    res.status(401).json({ message: 'Token d\'authentification invalide' });
  }
};

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.email !== 'admin@cvgen.com') {
    res.status(403).json({ message: 'Accès non autorisé. Réservé aux administrateurs.' });
    return;
  }
  
  next();
}; 