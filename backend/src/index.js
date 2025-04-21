require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Créer le client Supabase
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Les variables SUPABASE_URL et SUPABASE_SERVICE_KEY doivent être définies.');
  process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Middleware
app.use(cors({
  origin: '*', // Ou spécifiez votre domaine frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Disposition'] // Important pour les téléchargements
}));
app.use(express.json());

// Middleware pour initialiser Supabase
app.use((req, res, next) => {
  req.supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
  next();
});

// Routes
app.use('/api', routes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'API CV Generator opérationnelle', version: '1.0.0' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Une erreur interne est survenue.' });
});

// Démarrage du serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});