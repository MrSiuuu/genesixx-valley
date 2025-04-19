import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export function useAdmin() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Vérifier si l'utilisateur est connecté
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsAdmin(false);
          return;
        }
        
        // Vérifier si l'utilisateur a un profil
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        // Si le profil n'existe pas, le créer
        if (profileError && profileError.code === 'PGRST116') {
          // Profil non trouvé, créer un nouveau profil
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: session.user.id,
              name: session.user.user_metadata?.name || session.user.email,
              email: session.user.email,
              created_at: new Date(),
              email_confirmed: false,
              is_admin: false // Par défaut, les nouveaux utilisateurs ne sont pas admin
            });
          
          if (insertError) throw insertError;
          
          // Récupérer le profil nouvellement créé
          const { data: newProfile, error: newProfileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (newProfileError) throw newProfileError;
          
          const adminStatus = newProfile?.is_admin || false;
          setIsAdmin(adminStatus);
          
          if (adminStatus) {
            setAdminData({
              id: session.user.id,
              email: session.user.email,
              name: newProfile.name || session.user.email,
            });
          }
        } else if (profileError) {
          // Autre erreur
          throw profileError;
        } else {
          // Profil trouvé
          const adminStatus = profileData?.is_admin || false;
          setIsAdmin(adminStatus);
          
          if (adminStatus) {
            setAdminData({
              id: session.user.id,
              email: session.user.email,
              name: profileData.name || session.user.email,
            });
          }
        }
      } catch (err) {
        console.error('Erreur lors de la vérification du statut admin:', err);
        setError(err.message);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAdminStatus();
    
    // Écouter les changements d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === 'SIGNED_IN') {
          checkAdminStatus();
        } else if (event === 'SIGNED_OUT') {
          setIsAdmin(false);
          setAdminData(null);
        }
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Fonction pour récupérer les statistiques
  const getStats = async () => {
    try {
      setLoading(true);
      
      // Récupérer les utilisateurs
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*');
      
      if (usersError) throw usersError;
      
      // Récupérer les CVs (à adapter selon votre structure de données)
      const { data: cvsData, error: cvsError } = await supabase
        .from('cvs')
        .select('*');
      
      if (cvsError && cvsError.code !== 'PGRST116') throw cvsError;
      
      // Calculer les statistiques
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const newUsersCount = usersData.filter(user => {
        const createdAt = new Date(user.created_at);
        return createdAt >= oneWeekAgo;
      }).length;
      
      return {
        totalUsers: usersData.length,
        newUsers: newUsersCount,
        totalCVs: cvsData ? cvsData.length : 0,
        users: usersData
      };
    } catch (err) {
      console.error('Erreur lors de la récupération des statistiques:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour confirmer l'email d'un utilisateur
  const confirmUserEmail = async (userId) => {
    try {
      if (!isAdmin) throw new Error('Accès non autorisé');
      
      const { error } = await supabase
        .from('profiles')
        .update({ email_confirmed: true })
        .eq('id', userId);
      
      if (error) throw error;
      
      return true;
    } catch (err) {
      console.error('Erreur lors de la confirmation de l\'email:', err);
      setError(err.message);
      throw err;
    }
  };

  return {
    isAdmin,
    adminData,
    loading,
    error,
    getStats,
    confirmUserEmail
  };
} 