import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import SetupAdmin from './pages/SetupAdmin';
import Templates from './pages/Templates';
import AuthCallback from './pages/AuthCallback';
import CVForm from './pages/CVForm';

// Styles
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/templates" element={<Templates />} />

          {/* Routes d'administration */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* Route temporaire pour la configuration de l'administrateur */}
          <Route path="/setup-admin" element={<SetupAdmin />} />

          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Route pour créer un CV avec un template spécifique */}
          <Route path="/cv/create/:template" element={<CVForm />} />
          
          {/* Route par défaut pour créer un CV */}
          <Route path="/cv/create" element={<CVForm />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;